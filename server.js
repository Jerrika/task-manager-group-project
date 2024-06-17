const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS middleware setup
app.use(cors());

// Configure Sequelize to connect to PostgreSQL database
const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'your_database', // Replace with your actual database name
  username: 'your_username', // Replace with your actual database username
  password: 'your_password', // Replace with your actual database password
  host: 'localhost',
  port: 5432,
});

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password_hash',
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'profile_picture',
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'last_name',
  },
  linkedinProfile: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'linkedin_profile',
  },
  aboutMe: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'about_me',
  },
});

// Location of static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Handlebars setup
const hbs = create({
  extname: '.handlebars',
  defaultLayout: false,
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// API Routes using Sequelize for user management
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, passwordHash });
    res.status(201).json({ userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isValid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isValid) {
      return res.status(400).json({ error: 'Incorrect old password' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await user.update({ passwordHash: newPasswordHash });
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save Profile Picture
app.post('/save-profile-picture', async (req, res) => {
  const { profilePicture, email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await user.update({ profilePicture });
    res.status(200).json({ message: 'Profile picture saved successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save Personal Information
app.post('/save-personal-info', async (req, res) => {
  const { firstName, lastName, linkedinProfile, email, aboutMe } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await user.update({ firstName, lastName, linkedinProfile, aboutMe });
    res.status(200).json({ message: 'Personal information saved successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connect to the database and start the server
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(port, () => {
      

const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const sequelize = require('./config/connection');
const { User, Task } = require('./models');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Location of static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Handlebars setup
const hbs = create({
  extname: '.handlebars',
  defaultLayout: false,
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Routes
app.get('/login', (req, res) => {
  res.render('landing-page', { title: 'Login', description: 'The first page where users are able to login to their account' });
});

app.get('/home', (req, res) => {
  res.render('home-page', { title: 'Home', description: 'The following page where users can utilize the website' });
});

app.get('/profile', (req, res) => {
  res.render('profile-page', { title: 'Profile' });
});

app.get('/', (req, res) => {
  res.send('Procrastination Nation');
});

// API Routes for user management
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
      [username, email, passwordHash]
    );
    res.status(201).json({ userId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const result = await pool.query('SELECT password_hash FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isValid) {
      return res.status(400).json({ error: 'Incorrect old password' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password_hash = $1 WHERE email = $2', [newPasswordHash, email]);
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

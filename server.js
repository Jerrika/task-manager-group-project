const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

const sequelize = require('./config/connection');
//Import models to sync tables with database
const { User, Task }  = require('./models');


// Location of static files
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
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


//Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  });
});

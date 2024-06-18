const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sequelize = require('./config/connection');
const routes = require('./controllers/api');
const session = require('express-session');


const app = express();
const port = 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

// Location of static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.use('/api/', routes);

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

// Serve the landing page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/landing.html'))
);

// Connect to the database and start the server
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync(); // Sync all defined models to the database
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });






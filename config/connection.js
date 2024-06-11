//Sets up and exports a Sequelize instance for connecting to a PostgreSQL database
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  //Database name
  process.env.DB_NAME,
  //User
  process.env.DB_USER,
  //Password
  process.env.DB_PASSWORD,
  {
    // Database location
    host: 'localhost',
    dialect: 'postgres',
    dialectModule: require('pg')
  }
);
  
module.exports = sequelize;
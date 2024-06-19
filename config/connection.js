//Sets up and exports a Sequelize instance for connecting to a PostgreSQL database
const Sequelize = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(
//   //Database name
//   process.env.DB_NAME,
//   //User
//   process.env.DB_USER,
//   //Password
//   process.env.DB_PASSWORD,
//   //URL
//   process.env.DB_URL,
//   {
//     // Database location
//     host: 'localhost',
//     dialect: 'postgres',
//     dialectModule: require('pg')
//   }
// );

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );
}
  
module.exports = sequelize;
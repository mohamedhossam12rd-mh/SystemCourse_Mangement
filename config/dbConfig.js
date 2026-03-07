// Configurations
require("dotenv").config();
// Req Module
const { Sequelize } = require("sequelize");

// Create Database Connection with Options
const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,

  database: process.env.DATABASE_NAME,
  dialect: process.env.DATABASE_DRIVER,

  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

module.exports = { sequelize };

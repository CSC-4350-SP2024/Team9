<<<<<<< HEAD
const Sequelize = require("sequelize");
=======
//connecting to database
const { Sequelize } = require("sequelize");
require("dotenv").config();
>>>>>>> 6bb5781b216a982160b76ffeb0a6fab63cbfc3aa

const sequelize = new Sequelize("studybuddy_db", "root", "$Vale072801", {
  host: "localhost",
  dialect: "mysql",
});

//test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("successful connection");
  } catch (error) {
    console.error("unable to connect to the database", error);
  }
}

module.exports = sequelize;

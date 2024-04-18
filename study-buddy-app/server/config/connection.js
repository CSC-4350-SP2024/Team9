//connecting to database
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("studybuddy_db", "root", "password", {
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

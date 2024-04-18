//connecting to database
const { Sequelize } = require("sequelize");
require("dotenv").config();
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: "localhost", // you may need to change this to localhost for it to work.
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;

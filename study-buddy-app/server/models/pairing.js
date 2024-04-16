const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Pairing extends Model {}

Pairing.init(
  {
    pairing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "pairing",
  }
);

sequelize
  .query("ALTER TABLE `pairing` DROP FOREIGN KEY `userpairing_ibfk_2`")
  .then(() => {
    return Pairing.sync({ force: true }); // Drops the table
  })
  .then(() => {
    console.log("Pairing table dropped successfully");
  })
  .catch((error) => {
    console.error("Error dropping Pairing table:", error);
  });

module.exports = Pairing;

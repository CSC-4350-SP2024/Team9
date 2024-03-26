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

module.exports = Pairing;

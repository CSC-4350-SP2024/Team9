const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserClass extends Model {}

UserClass.init(
  {
    user_class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_class",
  }
);

module.exports = UserClass;

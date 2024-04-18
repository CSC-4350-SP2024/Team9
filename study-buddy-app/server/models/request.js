const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Request extends Model {}

Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // Assuming the sender is associated with the User model
        key: "id",
      },
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // Assuming the receiver is associated with the User model
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "request",
    indexes: [
      {
        unique: true, // Enforce uniqueness
        fields: ["sender_id", "receiver_id"], // Combine sender and receiver IDs
      },
    ],
  }
);

module.exports = Request;

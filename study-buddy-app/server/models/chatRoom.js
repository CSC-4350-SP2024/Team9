const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ChatRoom extends Model {}

ChatRoom.init(
  {
    id: {
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
    modelName: "chat_room",
  }
);

module.exports = ChatRoom;

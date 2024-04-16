const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ChatRoom extends Model {}

ChatRoom.init(
  {
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "class",
        key: "class_id",
      },
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

const User = require("./User");
const Class = require("./class");
const Pairing = require("./pairing");
const ChatRoom = require("./chatRoom");
const Message = require("./message");

// Define associations
User.belongsToMany(Class, { through: "UserClass" });
Class.belongsToMany(User, { through: "UserClass" });

Pairing.belongsTo(User, { foreignKey: "user1_id" });
Pairing.belongsTo(User, { foreignKey: "user2_id" });

Message.belongsTo(User, { foreignKey: "user_id" });
Message.belongsTo(ChatRoom, { foreignKey: "room_id" });

ChatRoom.belongsTo(Class, { foreignKey: "class_id" });

User.hasMany(Pairing, { foreignKey: "user1_id" });
User.hasMany(Pairing, { foreignKey: "user2_id" });

ChatRoom.hasMany(Message, { foreignKey: "room_id" });
Class.hasOne(ChatRoom, { foreignKey: "class_id" });

module.exports = { User, Class, Pairing, ChatRoom, Message };

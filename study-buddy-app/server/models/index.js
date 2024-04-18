const User = require("./User");
const Class = require("./class");
const Pairing = require("./pairing");
const ChatRoom = require("./chatRoom");
const Message = require("./message");
const Request = require("./request");
const Friendship = require("./friendship");

// Define associations
User.belongsToMany(Class, { through: "UserClass" });
Class.belongsToMany(User, { through: "UserClass" });

Friendship.belongsTo(User, { as: 'user', foreignKey: "user_id" });
Friendship.belongsTo(User, { as: 'friend', foreignKey: "friend_id" });

Message.belongsTo(User, { foreignKey: "user_id" });
Message.belongsTo(ChatRoom, { foreignKey: "room_id" });

ChatRoom.belongsTo(Class, { foreignKey: "class_id" });

User.hasMany(Friendship, { as: 'user', foreignKey: "user_id" });
User.hasMany(Friendship, { as: 'friend', foreignKey: "friend_id" });

ChatRoom.hasMany(Message, { foreignKey: "room_id" });
Class.hasOne(ChatRoom, { foreignKey: "class_id" });

User.hasMany(Request, { foreignKey: "sender_id", as: "sentRequests" });
User.hasMany(Request, { foreignKey: "receiver_id", as: "receivedRequests" });
Request.belongsTo(User, { foreignKey: "sender_id" });
Request.belongsTo(User, { foreignKey: "receiver_id" });

User.belongsToMany(User, { through: Friendship, as: "friends" });

module.exports = {
  User,
  Class,
  Pairing,
  ChatRoom,
  Message,
  Request,
  Friendship,
};

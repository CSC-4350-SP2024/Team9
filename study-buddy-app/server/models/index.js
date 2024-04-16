const User = require("./User");
const Class = require("./class");
const Pairing = require("./pairing");
const ChatRoom = require("./chatRoom");
const Message = require("./message");

User.belongsToMany(Class, { through: "UserClass" });
Class.belongsToMany(User, { through: "UserClass" });

User.belongsToMany(Pairing, { through: "UserPairing" });
Pairing.belongsToMany(User, { through: "UserPairing" });

Pairing.belongsTo(Class);
Pairing.hasOne(ChatRoom);
ChatRoom.belongsTo(Pairing);

ChatRoom.hasMany(Message);
Message.belongsTo(ChatRoom);

module.exports = { User, Class, Pairing, ChatRoom, Message };

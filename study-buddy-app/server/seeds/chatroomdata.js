const { ChatRoom } = require("../models");
const chatRoomData = [{ pairing_id: 1 }, { pairing_id: 2 }];

const chatRoomSeeds = () => ChatRoom.bulkCreate(chatRoomData);

module.exports = chatRoomSeeds;

const { ChatRoom } = require("../models");
const chatRoomData = [
{ id: 1, class_id: 1 }, 
{ id: 2, class_id: 2 }, 
{ id: 3, class_id: 3 }, 
{ id: 4, class_id: 4 }, 
{ id: 5, class_id: 5 }, 
{ id: 6, class_id: 6 }, 
{ id: 7, class_id: 7 } ];

const chatRoomSeeds = () => ChatRoom.bulkCreate(chatRoomData);

module.exports = chatRoomSeeds;

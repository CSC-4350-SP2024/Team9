const { ChatRoom } = require("../models");
const chatRoomData = [
  { room_name: "CS101 Chat Room", class_id: 1 },
  { room_name: "CS102 Chat Room", class_id: 2 },
  { room_name: "CS103 Chat Room", class_id: 3 },
  { room_name: "CS104 Chat Room", class_id: 4 },
  { room_name: "CS105 Chat Room", class_id: 5 },
  { room_name: "CS106 Chat Room", class_id: 6 },
  { room_name: "CS107 Chat Room", class_id: 7 },
];

const chatRoomSeeds = () => ChatRoom.bulkCreate(chatRoomData);

module.exports = chatRoomSeeds;

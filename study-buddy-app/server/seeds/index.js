const sequelize = require("../config/connection");

const userSeeds = require("./userdata");
const classSeeds = require("./classdata");
const chatRoomSeeds = require("./chatroomdata");
const pairingSeeds = require("./pairingdata");

const seed = async () => {
  await sequelize.sync({ force: true });

  await userSeeds();

  await classSeeds();

  await pairingSeeds();

  await chatRoomSeeds();

  process.exit(0);
};

seed();

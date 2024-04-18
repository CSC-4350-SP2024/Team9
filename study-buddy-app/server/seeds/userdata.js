const { User } = require("../models");

const userData = [
  {
    username: "user1",
    email: "user1@gmail.com",
    password: "password",
    phone_number: "1234567890",
    discord_name: "user1",
  },
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;

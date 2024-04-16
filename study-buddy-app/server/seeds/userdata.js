const { User } = require("../models");

const userData = [
  {
    username: "user1",
    email: "user1@example.com",
    password: "password1",
    is_individual: true,
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "password2",
    is_individual: true,
  },
  {
    username: "user3",
    email: "user3@example.com",
    password: "password3",
    is_individual: true,
  },
  {
    username: "user4",
    email: "user4@example.com",
    password: "password4",
    is_individual: true,
  },
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;

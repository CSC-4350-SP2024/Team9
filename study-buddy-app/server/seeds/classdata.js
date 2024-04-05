const { Class } = require("../models");

const classData = [
  { name: "CS101" },
  { name: "CS102" },
  { name: "CS103" },
  { name: "CS104" },
  { name: "CS105" },
  { name: "CS106" },
  { name: "CS107" },
];

const classSeeds = () => Class.bulkCreate(classData);

module.exports = classSeeds;

const { Class } = require("../models");

const classData = [
  { class_name: "CS101" },
  { class_name: "CS102" },
  { class_name: "CS103" },
  { class_name: "CS104" },
  { class_name: "CS105" },
  { class_name: "CS106" },
  { class_name: "CS107" },
];

const classSeeds = () => Class.bulkCreate(classData);

module.exports = classSeeds;

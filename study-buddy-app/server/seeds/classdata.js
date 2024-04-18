const { Class } = require("../models");

const classData = [
  { class_name: "CSC 4350" },
  { class_name: "CSC 2720" },
  { class_name: "CSC 3210" },
  { class_name: "CSC 3320" },
  { class_name: "CSC 4320" },
  { class_name: "CSC 4330" },
  { class_name: "CSC 4520" },
  { class_name: "CSC 3350" },
  { class_name: "CSC 4222" },
  { class_name: "CSC 4360" },
  { class_name: "CSC4370 " },
];

const classSeeds = () => Class.bulkCreate(classData);

module.exports = classSeeds;

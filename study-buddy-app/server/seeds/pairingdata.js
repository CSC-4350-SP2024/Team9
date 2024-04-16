const { Pairing } = require("../models");

const pairingData = [
  { userId1: 1, userId2: 2, confirmed: true, classId: 1 },
  { userId1: 3, userId2: 4, confirmed: false, classId: 1 },
];

const seedPairing = () => Pairing.bulkCreate(pairingData);

module.exports = seedPairing;

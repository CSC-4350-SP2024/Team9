const express = require("express");
const userRoutes = require("./userRoutes");
const messageRoutes = require("./messageRoutes");

const router = express.Router();

// Mount user routes
router.use("/api", userRoutes);
router.use("/api", messageRoutes);

module.exports = router;

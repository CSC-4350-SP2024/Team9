const express = require("express");
const userRoutes = require("./userRoutes");
const messageRoutes = require("./messageRoutes");
const classRoutes = require("./classRoutes");

const router = express.Router();

// Mount user routes
router.use("/api", userRoutes);
router.use("/api", messageRoutes);
router.use("/api", classRoutes);

module.exports = router;

const express = require("express");
const userRoutes = require("./userRoutes");

const router = express.Router();

// Mount user routes
router.use("/api", userRoutes);

module.exports = router;

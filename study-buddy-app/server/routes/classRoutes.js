const express = require("express");
const router = express.Router();
const { Class } = require("../models");


router.get("/getClasses", async (req, res) => {
  try {
    const classes = await Class.findAll({ //need to add selecting messages based on chat id
      // where: { id: req.user.id }, // Assuming you have authentication middleware that adds the user object to the request (req.user)
      // attributes: ["id", "username", "email"], // Select specific attributes to include in the response
      // include: [{ model: Class, attributes: ["className"] }], // Assuming you have a separate model for enrolled classes
    });

    // Send the user data in the response
    res.json(classes);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getCourseName/:chatID", async (req, res) => {
  try {
    const CourseName = await Class.findOne({ 
      where: {id: req.params.chatID}
    });

    // Send the user data in the response
    res.json(CourseName);
  } catch (error) {
    console.error("Error fetching vlass:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;

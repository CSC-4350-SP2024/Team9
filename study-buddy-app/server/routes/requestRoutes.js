const express = require("express");
const router = express.Router();
const { User, Request, Friendship, Class } = require("../models");

//get user potential matches
router.get("/classmates", async (req, res) => {
  try {
    const userId = req.session.userID;

    const user = await User.findByPk(userId, { include: Class });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const classmates = await User.findAll({
      include: Class,
    });

    const loggedInUserClasses = user.classes.map(
      (classInstance) => classInstance.class_id
    );
    const loggedInUserClassmates = classmates.filter((classmate) =>
      classmate.classes.some((classInstance) =>
        loggedInUserClasses.includes(classInstance.class_id)
      )
    );

    res.status(200).json({ classmates: loggedInUserClassmates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

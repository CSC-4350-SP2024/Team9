const express = require("express");
const router = express.Router();
const { Class, User } = require("../models");

router.get("/getCourseName/:chatID", async (req, res) => {
  try {
    const CourseName = await Class.findOne({
      where: { class_id: req.params.chatID },
    });

    res.json(CourseName);
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUserClasses", async (req, res) => {
  const userId = req.session.userID;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userClasses = await user.getClasses();
    res.json(userClasses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch the list of all class names available
router.get("/getClassList", async (req, res) => {
  try {
    const classList = await Class.findAll({ attributes: ["class_name"] });

    const classNames = classList.map(
      (classInstance) => classInstance.class_name
    );
    res.json(classNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addClass", async (req, res) => {
  if (!req.session || !req.session.userID) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { class_name } = req.body;
  const userId = req.session.userID;

  try {
    const classExists = await Class.findOne({
      where: { class_name: class_name },
    });
    if (!classExists) {
      return res.status(400).json({ error: "Selected class does not exist" });
    }

    const user = await User.findByPk(userId);
    const userClasses = await user.getClasses();
    const alreadyEnrolled = userClasses.some(
      (classInstance) => classInstance.class_name === class_name
    );
    if (alreadyEnrolled) {
      return res
        .status(400)
        .json({ error: "User is already enrolled in this class" });
    }

    await user.addClass(classExists);

    res.status(201).json({ message: "Class added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/removeClass", async (req, res) => {
  const userId = req.session.userID;
  const classId = req.body.classId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.removeClass(classId);

    res.status(200).json({ message: "Class removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

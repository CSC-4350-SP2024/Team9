const express = require("express");
const router = express.Router();
const { Class, User } = require("../models");

router.get("/getCourseName/:chatID", async (req, res) => {  //gets the current course's name to display on top bar
  try {
    const CourseName = await Class.findOne({
      where: { id: req.params.chatID },
    });

    // Send the user data in the response
    res.json(CourseName);
  } catch (error) {
    console.error("Error fetching class:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUserClasses", async (req, res) => {
  const userId = req.session.userID; // Assuming you have user authentication and req.user contains user information

  try {
    const user = await User.findByPk(userId); // Find the user first
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch all classes associated with the user
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
    // Fetch all classes from the database
    const classList = await Class.findAll({ attributes: ["class_name"] });
    // Extract class names from the returned instances
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
  // Check if user is authenticated
  if (!req.session || !req.session.userID) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { class_name } = req.body;
  const userId = req.session.userID; // Retrieve userID from session

  try {
    // Check if the class exists
    const classExists = await Class.findOne({
      where: { class_name: class_name },
    });
    if (!classExists) {
      return res.status(400).json({ error: "Selected class does not exist" });
    }

    // Check if the user is already associated with the class
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

    // Add the class for the current user
    await user.addClass(classExists);

    res.status(201).json({ message: "Class added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Backend route to delete a class from the user's dashboard
router.delete("/removeClass", async (req, res) => {
  const userId = req.session.userID; // Assuming you have user authentication and req.session.userID contains user information
  const classId = req.body.classId; // Assuming you pass the classId to delete

  try {
    // Find the user by ID and remove the association with the class
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the association with the class
    await user.removeClass(classId);

    res.status(200).json({ message: "Class removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

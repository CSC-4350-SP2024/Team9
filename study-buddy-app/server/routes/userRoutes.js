const express = require("express");
const router = express.Router();
const { User, Class } = require("../models");

//sign up route
router.post("/signup", async (req, res) => {
  try {
    const createUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.currentuser = req.body.username;
    req.session.loggedIn = true;
    req.session.save(() => {
      res.status(200).json(createUser);
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json(err);
  }
});

//log in route
router.post("/login", async (req, res) => {
  try {
    const getUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!getUser) {
      res
        .status(404)
        .json({ message: "Invalid Credentials , Please try agian. " });
      return;
    }

    const verifyPass = await getUser.verifyPassword(req.body.password);

    if (!verifyPass) {
      res
        .status(404)
        .json({ message: "Invalid Credentials , Please try agian. " });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.currentuser = getUser.userName();
      res.status(200).json({ message: " you are logged in! " });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// destroy session or logout

router.delete("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/api/user", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }, // Assuming you have authentication middleware that adds the user object to the request (req.user)
      attributes: ["id", "username", "email"], // Select specific attributes to include in the response
      include: [{ model: Class, attributes: ["className"] }], // Assuming you have a separate model for enrolled classes
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data in the response
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

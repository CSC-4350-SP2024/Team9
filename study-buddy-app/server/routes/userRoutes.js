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

    const getUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    req.session.currentuser = req.body.username;
    req.session.loggedIn = true;
    req.session.userID = getUser.userID();
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
      req.session.userID = getUser.userID();
      res.status(200).json({ message: " you are logged in! " });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// destroy session or logout

router.delete("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    await saveUserData(req.session.userID);
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//get logged in user
router.get("/user", async (req, res) => {
  try {
    console.log("Session Data:", req.session);
    console.log("User ID:", req.session.userID);
    if (!req.session.userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.userID;
    const user = await User.findByPk(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

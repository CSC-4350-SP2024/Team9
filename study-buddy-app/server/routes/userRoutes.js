const express = require("express");
const router = express.Router();
const User = require("../models/User");

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

module.exports = router;

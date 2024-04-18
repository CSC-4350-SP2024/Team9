// routes/api.js

const express = require("express");
const router = express.Router();
const { User, Request, Friendship, Class } = require("../models");

// Get user potential matches
router.get("/classmates", async (req, res) => {
  try {
    const userId = req.session.userID;

    // Fetch the logged-in user
    const user = await User.findByPk(userId, { include: Class });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch classmates who share at least one class with the logged-in user
    const classmates = await User.findAll({
      include: {
        model: Class,
        where: {
          class_id: user.classes.map((classInstance) => classInstance.class_id),
        }, // Filter by classes in common
      },
    });

    // Exclude the logged-in user from the list of classmates
    const loggedInUserClassmates = classmates.filter(
      (classmate) => classmate.id !== userId
    );

    res.status(200).json({ classmates: loggedInUserClassmates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new request
// Create a new request
// Create a new request
router.post("/createRequest", async (req, res) => {
  try {
    const createRequest = await Request.create({
      status: "pending",
      message: req.body.message_request,
      sender_id: req.session.userID,
      receiver_id: req.body.receiver_id,
    });

    // Associate the request with the receiver user
    const receiverUser = await User.findByPk(req.body.receiver_id);
    if (receiverUser) {
      await receiverUser.addReceivedRequest(createRequest);
    } else {
      console.log("Receiver user not found");
    }

    res.status(200).json(createRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get pending requests for the logged-in user
router.get("/getPendingRequests", async (req, res) => {
  const userId = req.session.userID;

  try {
    // Find the user including pending requests
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Request,
          as: "sentRequests", // Assuming this is the correct alias for received requests
          where: { status: "pending" }, // Include sender's data
        },
      ],
    });

    // Extract the pending requests
    const pendingRequests = user ? user.sentRequests : [];

    res.json(pendingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

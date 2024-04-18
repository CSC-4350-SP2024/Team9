const express = require("express");
const router = express.Router();
const { User, Request, Friendship, Class } = require("../models");

// Get user potential matches
router.get("/classmates", async (req, res) => {
  try {
    const userId = req.session.userID;

    const user = await User.findByPk(userId, { include: Class });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const classmates = await User.findAll({
      include: {
        model: Class,
        where: {
          class_id: user.classes.map((classInstance) => classInstance.class_id),
        },
      },
    });

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
router.post("/createRequest", async (req, res) => {
  try {
    const createRequest = await Request.create({
      status: "pending",
      message: req.body.message_request,
      sender_id: req.session.userID,
      receiver_id: req.body.receiver_id,
    });

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
          as: "sentRequests",
          where: { status: "pending" },
        },
      ],
    });

    const pendingRequests = user ? user.sentRequests : [];
    console.log(pendingRequests);
    res.json(pendingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/friends", async (req, res) => {
  const userId = req.session.userID;

  try {
    // Find the user's friends'
    const getFriends = await Friendship.findAll({
      where: { user_id: userId },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'friend',
          attributes: ['username', 'phone_number', 'discord_name', 'id'],
        },
      ],
    });
    console.log(getFriends)
    res.status(200).json(getFriends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/removeFriend", async (req, res) => {
  const userId = req.session.userID;
  const friendId = req.body.friendId;

  try {
    const deleteFriend = await Friendship.destroy({
      where: {user_id: userId,
      friend_id: friendId},
    })

    res.status(200).json(deleteFriend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Accept friend request
router.post("/acceptFriendRequest", async (req, res) => {
  try {
    const { requestId } = req.body;

    // Find the friend request by ID
    const request = await Request.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Update the status of the friend request to "accepted"
    request.status = "accepted";
    await request.save();

    const senderUser = await request.getSender();
    const receiverUser = await request.getReceiver();
    await senderUser.addFriend(receiverUser);
    await receiverUser.addFriend(senderUser);

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Reject friend request
router.post("/rejectFriendRequest", async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Request.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({ message: "Friend request rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

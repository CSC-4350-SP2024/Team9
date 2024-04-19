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
    const getPending = await Request.findAll({
      where: { 
         receiver_id: userId
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['username', 'id'],
        },
      ],
    });
    console.log(getPending)
    res.status(200).json(getPending);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get pending requests for the logged-in user
router.post("/requestExists", async (req, res) => {
  const senderId = req.session.userID;
  const receiverId = req.body.receiverId;

  try {
    // Find the request exists
    const requestExist = await Request.count({
      where: { 
         sender_id: senderId,
         receiver_id: receiverId,
      },
    });
    console.log('hello');
    console.log(requestExist);
    // if(requestExist > 0){
    //   res.status(200).json(true);
    // }
    // else{
    //   res.status(200).json(false);
    // }
    res.status(200).json(requestExist);
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
    const senderId  = req.body.senderId;
    const receiverId = req.session.userID;
    const requestId = req.body.requestId;

    // Delete the pending request
    const deleteRequest = await Request.destroy({
      where: {id: requestId},
    });

    //add to the friendship table
    const addFriend = await Friendship.create({
      friend_id: senderId,
      user_id: receiverId,

    })



    json(deleteRequest);
    res.status(200).json(addFriend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Reject friend request
router.delete("/rejectFriendRequest", async (req, res) => {
  try {
    const requestId = req.body.requestId;

    const requestReject = await Request.destroy({
      where: {id: requestId}
    });


    res.status(200).json(requestReject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

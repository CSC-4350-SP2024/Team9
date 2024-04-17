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

router.post("/createRequest", async (req, res) => {
  try {
    const createRequest = await Request.create({
      status: 'pending',
      message: req.body.message_request,
      sender_id: req.session.userID,
      receiver_id: req.body.receiver_id
    });

    req.session.save(() => {
      res.status(200).json(createRequest);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  
  }
});

router.get("/getPendingRequests", async (req, res) => {
  const userId = req.session.userID; // Assuming you have user authentication and req.user contains user information

  try {
     const pendingRequests = await Request.findAll({
       where: { receiver_id: userId },
       attributes: ['sender_id'],
     });
    
    const senderUsernames = await User.findAll({
      where: { id: pendingRequests },
      attributes: { exclude: ['email', 'password'] },
    })
     
     res.json(senderUsernames);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

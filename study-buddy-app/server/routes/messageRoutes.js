const express = require("express");
const router = express.Router();
const { Message, User, ChatRoom } = require("../models");

//sign up route
router.post("/chatPage", async (req, res) => {
  try {
    // const getCurrentUser = await User.findOrCreate({
    //   where: {
    //     id: req.user.id,
    //   },
    // });

    const createMessage = await Message.create({
      message_content: req.body.message_content,
      sender_username: req.session.currentuser
      // user_id: req.body.message_coi
    });
    
    


    // req.session.currentuser = req.body.username;
    // req.session.loggedIn = true;
    req.session.save(() => {
      res.status(200).json(createMessage);
      // res.status(200).json(getCurrentUser);
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json(err);
  }
});

router.get("/getMessages", async (req, res) => {
  try {
    const message = await Message.findAll({ //need to add selecting messages based on chat id
      // where: { id: req.user.id }, // Assuming you have authentication middleware that adds the user object to the request (req.user)
      // attributes: ["id", "username", "email"], // Select specific attributes to include in the response
      // include: [{ model: Class, attributes: ["className"] }], // Assuming you have a separate model for enrolled classes
    });

    // Send the user data in the response
    res.json(message);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;

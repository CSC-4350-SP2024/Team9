const express = require("express");
const router = express.Router();
const { Message, User, ChatRoom } = require("../models");

//sign up route
router.post("/createMessage", async (req, res) => {
  try {

    const createMessage = await Message.create({
      message_content: req.body.message_content,
      sender_username: req.session.currentuser,
      chat_room_id: req.body.chat_room_id
    });
    
    

    req.session.save(() => {
      res.status(200).json(createMessage);
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json(err);
  }
});

router.get("/getMessages/:chatID", async (req, res) => {
  try {
    const message = await Message.findAll({
      where: { chat_room_id: req.params.chatID}
    });

    // Send the user data in the response
    res.json(message);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;

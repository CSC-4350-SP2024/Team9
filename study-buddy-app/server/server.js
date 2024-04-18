const routes = require("./routes");
const express = require("express");
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cors = require("cors");
const { User, Class, Pairing, ChatRoom, Message } = require("./models");

const app = express();
const PORT = process.env.PORT || 4000;

const sess = {
  secret: "the biggest secret",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(cors());

app.use(express.json());

app.use(routes);

// Sync Database and Start Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

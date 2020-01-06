require("dotenv").config();
const express = require("express");
const session = require("express-session");

const passport = require("passport");
require("../passport/index");

const helmet = require("helmet");
const cors = require("cors");

const apiRouter = require("../api/apiRouter");

const server = express();

server.use(express.json());

server.use(
  session({
    name: "_rp2",
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1 * 3 * 60 * 60 * 1000,
      secure: false,
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(helmet());

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

server.use(cors(corsOptions));

server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API running!" });
});

//Route 404 fallback
server.use((req, res) => {
  res.status(404).json({ message: "Invalid route" });
});

module.exports = server;

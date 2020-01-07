require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const apiRouter = require("../api/apiRouter");

const server = express();

server.use(express.json());

server.use(helmet());
const whitelist = process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : [];
const corsOptions = {
  origin: function(origin, callback) {
    //Check for whitelisted origin or self origin.
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

server.use(cors(corsOptions));

server.use("/api", apiRouter);

server.use(function finalErrorCatchHandler(err, req, res, next) {
  console.log("Uncaught exception:", err);
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "API running!" });
});

//Route 404 fallback
server.use((req, res) => {
  res.status(404).json({ message: "Invalid route" });
});

module.exports = server;

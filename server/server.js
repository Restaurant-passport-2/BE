require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const apiRouter = require("../api/apiRouter");

const server = express();

server.use(express.json());

server.use(helmet());

server.use(cors());

server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API running!" });
});

//Route 404 fallback
server.use((req, res) => {
  res.status(404).json({ message: "Invalid route" });
});

module.exports = server;

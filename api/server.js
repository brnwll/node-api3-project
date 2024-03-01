const express = require("express");
const cors = require("cors");
const usersRouter = require("./users/users-router.js");
const { logger } = require("./middleware/middleware");

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

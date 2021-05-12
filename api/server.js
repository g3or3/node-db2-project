const express = require("express");

const server = express();

server.use(express.json());
server.use("/api/cars", require("./cars/cars-router"));

module.exports = server;

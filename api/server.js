const express = require("express");
const swaggerSpec = require("../swagger");
const swaggerUi = require("swagger-ui-express");

const server = express();

server.use(express.json());

server.use("/api/cars", require("./cars/cars-router"));

server.use((err, req, res, next) => {  //eslint-disable-line	
	res.status(err.status || 500).json({
		message: err.message,
		note: "Something went wrong in the router",
	});
});

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = server;

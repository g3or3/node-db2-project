const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
	openapi: "3.0.3",
	info: {
		title: "Express API ",
		version: "1.0.0",
		description: "Node Database Project 2 -Lambda",
	},
};

const options = {
	swaggerDefinition,
	apis: ["./api/cars/cars-router.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

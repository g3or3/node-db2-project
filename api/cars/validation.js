const Joi = require("joi");

const carSchema = Joi.object({
	vin: Joi.string().trim().required().messages({
		"any.required": "vin is missing",
	}),
	make: Joi.string().required().messages({
		"any.required": "make is missing",
	}),
	model: Joi.string().required().messages({
		"any.required": "model is missing",
	}),
	mileage: Joi.number().required().messages({
		"any.required": "mileage is missing",
	}),
	title: Joi.string(),
	transmission: Joi.string(),
});

module.exports = carSchema;

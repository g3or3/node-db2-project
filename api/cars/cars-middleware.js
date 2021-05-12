const carSchema = require("./validation");
const vinValidator = require("vin-validator");
const Cars = require("./cars-model");

const checkCarId = async (req, res, next) => {
	try {
		const car = await Cars.getById(req.params.id);
		if (car) {
			req.car = car;
			next();
		} else {
			next({ status: 404, message: `car with id ${req.params.id} is not found` });
		}
	} catch (err) {
		next(err);
	}
};

const checkCarPayload = async (req, res, next) => {
	try {
		req.validatedBody = await carSchema.validateAsync(req.body, {
			stripUnknown: true,
		});
		next();
	} catch (err) {
		next({ status: 400, message: err.details[0].message });
	}
};

const checkVinNumberValid = (req, res, next) => {
	if (vinValidator.validate(req.validatedBody.vin)) {
		next();
	} else {
		next({ status: 400, message: `vin ${req.validatedBody.vin} is invalid` });
	}
};

const checkVinNumberUnique = async (req, res, next) => {
	if (await Cars.getByVin(req.validatedBody.vin)) {
		next({ status: 400, message: `vin ${req.validatedBody.vin} already exists` });
	} else {
		next();
	}
};

module.exports = {
	checkCarId,
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
};

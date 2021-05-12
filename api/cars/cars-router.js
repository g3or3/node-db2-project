const {
	checkCarId,
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
} = require("./cars-middleware");

const Cars = require("./cars-model");
const router = require("express").Router();

router.get("/", async (req, res) => {
	res.json(await Cars.getAll());
});

router.get("/:id", checkCarId, async (req, res) => {
	res.json(req.car);
});

router.post(
	"/",
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
	async (req, res) => {
		res.json(await Cars.create(req.validatedBody));
	}
);

router.use((err, req, res, next) => { //eslint-disable-line
	res.status(err.status || 500).json({
		message: err.message,
		note: "Something went wrong in the router",
	});
});

module.exports = router;

const {
	checkCarId,
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
} = require("./cars-middleware");

const Cars = require("./cars-model");
const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - vin
 *         - make
 *         - model
 *         - mileage
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the car
 *         vin:
 *           type: string
 *           description: The vin of the car
 *         make:
 *           type: string
 *           description: The make of the car
 *         model:
 *           type: string
 *           description: The model of the car
 *         mileage:
 *           type: integer
 *           description: The mileage of the car
 *         title:
 *           type: string
 *           description: The title status of the car
 *         transmission:
 *           type: string
 *           description: The transmission type of the car
 *       example:
 *         id: 1
 *         vin: 11111111111111111
 *         make: Nissan
 *         model: Sentra
 *         mileage: 24500
 *         title: Clean
 *         transmission: Manual
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve a list of cars
 *     tags: [Cars]
 *     responses:
 *       "200":
 *         description: The list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The auto-generated id of the car
 *                   vin:
 *                     type: string
 *                     description: The vin of the car
 *                   make:
 *                     type: string
 *                     description: The make of the car
 *                   model:
 *                     type: string
 *                     description: The model of the car
 *                   mileage:
 *                     type: integer
 *                     description: The mileage of the car
 *                   title:
 *                     type: string
 *                     description: The title status of the car
 *                   transmission:
 *                     type: string
 *                     description: The transmission type of the car
 *               example:
 *                 - id: 1
 *                   vin: 1FMZU67E93UB27645
 *                   make: Honda
 *                   model: Accord
 *                   mileage: 20000
 *                   title: Clean
 *                   transmission: Manual
 *                 - id: 2
 *                   vin: 4GTJ7F1315F723726
 *                   make: Nissan
 *                   model: Altima
 *                   mileage: 80000
 *                   title: Rebuilt
 *                   transmission: Automatic
 */

router.get("/", async (req, res) => {
	res.json(await Cars.getAll());
});

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Retrieve a car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The car id
 *     responses:
 *       "200":
 *         description: The car
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 */

router.get("/:id", checkCarId, async (req, res) => {
	res.json(req.car);
});

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Creates a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The auto-generated id of the car
 *                 vin:
 *                   type: string
 *                   description: The vin of the car
 *                 make:
 *                   type: string
 *                   description: The make of the car
 *                 model:
 *                   type: string
 *                   description: The model of the car
 *                 mileage:
 *                   type: integer
 *                   description: The mileage of the car
 *                 title:
 *                   type: string
 *                   description: The title status of the car
 *                 transmission:
 *                   type: string
 *                   description: The transmission type of the car
 *               example:
 *                 vin: "1G1PG5SB6E7269391"
 *                 make: Honda
 *                 model: Accord
 *                 mileage: 20000
 *                 title: Clean (Optional)
 *                 transmission: Manual (Optional)
 *     responses:
 *       "201":
 *         description: The created account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 */

router.post(
	"/",
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
	async (req, res) => {
		res.json(await Cars.create(req.validatedBody));
	}
);

module.exports = router;

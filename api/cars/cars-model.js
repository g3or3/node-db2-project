const db = require("../../data/db-config");

const getAll = () => {
	return db("cars");
};

const getById = (id) => {
	return db("cars").where({ id }).first();
};

const getByVin = (vin) => {
	return db("cars").where({ vin }).first();
};

const create = async (car) => {
	return getById((await db("cars").insert(car))[0]);
};

module.exports = { getAll, getById, getByVin, create };

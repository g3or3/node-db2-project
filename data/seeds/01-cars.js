exports.seed = async function (knex) {
	await knex("cars").truncate();

	await knex("cars").insert([
		{
			vin: "11111111111111111",
			make: "Honda",
			model: "Civic",
			mileage: "27000",
			title: "clean",
			transmission: "manual",
		},
		{
			vin: "22222222222222222",
			make: "Mercedes",
			model: "C300",
			mileage: "90000",
			transmission: "automatic",
		},
		{
			vin: "33333333333333333",
			make: "Honda",
			model: "Accord",
			mileage: "10000",
			transmission: "automatic",
		},
		{
			vin: "44444444444444444",
			make: "Nissan",
			model: "Sentra",
			mileage: "32000",
			title: "rebuilt",
		},
		{
			vin: "55555555555555555",
			make: "Toyota",
			model: "Camry",
			mileage: "55000",
			title: "clean",
			transmission: "manual",
		},
	]);
};

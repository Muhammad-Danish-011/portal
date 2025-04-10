const Car = require('../Models/carModel');

// Fetch all cars from the database
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json({ cars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch cars' });
    }
};
exports.createCar = async (req, res) => {
    console.log("Request body:", req.body); // Log the request body for debugging

    const { modelName, userId, transmission, fuelType, color, ...otherFields } = req.body;

    if (!modelName || !userId || !transmission || !fuelType || !color) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newCar = new Car(req.body); // Create a new car instance with the provided data
        await newCar.save();
        res.status(201).json({
            message: 'Car created successfully',
            car: newCar,
        });
    } catch (error) {
        console.error("Error saving car:", error);
        res.status(500).json({ message: 'Failed to create car' });
    }
};

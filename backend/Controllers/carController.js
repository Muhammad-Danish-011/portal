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

// Create a new car
exports.createCar = async (req, res) => {
    const { stockId, modelName, mileage, trim, additionalInfoEn, additionalInfoAr, saudiSwitch, price, description, make, year, exportOption, registrationCity, vinNumber, numberOfDoors, engineSize, imageUrl, userId, transmission, fuelType, color } = req.body;

    // Check if required fields are missing
    if (!modelName || !userId || !transmission || !fuelType || !color) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newCar = new Car({
            stockId,
            modelName,
            mileage,
            trim,
            additionalInfoEn,
            additionalInfoAr,
            saudiSwitch,
            price,
            description,
            make,
            year,
            exportOption,
            registrationCity,
            vinNumber,
            numberOfDoors,
            engineSize,
            imageUrl,
            userId,
            transmission,
            fuelType,
            color
        });

        await newCar.save();
        res.status(201).json({
            message: 'Car created successfully',
            car: newCar
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create car' });
    }
};

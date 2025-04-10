const express = require('express');
const { getCars } = require('../Controllers/carController');
const carController = require('../Controllers/carController');
const router = express.Router();

// Route to get all cars
router.get('/cars', getCars);


// Route to create a new car
router.post('/cars', carController.createCar);

module.exports = router;

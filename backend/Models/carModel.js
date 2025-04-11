const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    modelName: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User', 
    },    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    color: { type: String, required: true },
    // Optional fields
    make: { type: String },
    year: { type: String },
    exportOption: { type: String },
    registrationCity: { type: String },
    vinNumber: { type: String },
    numberOfDoors: { type: String },
    engineSize: { type: String },
    imageUrl: { type: String },
    description: { type: String },
    price: { type: String },
    
} ,{ timestamps: true });

const Car = mongoose.model("Car", carSchema);


module.exports = Car;

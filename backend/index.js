const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const carRoutes = require('./Routes/carRoutes');  // Import carRoutes

require('dotenv').config();
require('./Models/db');  // Connect to the database

const PORT = process.env.PORT || 8080;

// Ping route to check if the server is running
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Register the routes
app.use('/auth', AuthRouter);
app.use('/api', carRoutes);  // Register car routes under '/api'
app.use('/api/cars', carRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

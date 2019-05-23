const express = require('express');
const CarController = require('../controllers/car');

const api = express.Router();

api.get('/get-cars', CarController.getCars);
api.get('/get-owners-cars/:user_id', CarController.getOwnerCars);
api.post('/create-car', CarController.createCar);
api.delete('/delete-car/:id', CarController.deleteCar);

module.exports = api;
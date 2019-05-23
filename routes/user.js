const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();

api.get('/get-users', UserController.getUsers);
api.get('/get-a-user/:id', UserController.getAuser);
api.post('/new-user', UserController.createUser);
api.put('/sell-car', UserController.sellCar);

module.exports = api;
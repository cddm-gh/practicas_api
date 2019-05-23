const User = require('../models/user');
const Car = require('../models/car');

let getUsers = async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.send(`Error ${e} `);
    }
}

let getAuser = async(req, res) => {
    let user_id = req.params.id;

    try {
        const user = await User.findById(user_id);
        if (user == null)
            res.send('No Existe un usuario con ese id');
        else
            res.send(user);
    } catch (e) {
        res.send(`Error ${e}`);
    }
}

let createUser = async(req, res) => {
    try {
        let new_user = new User(req.body);
        let user = await new_user.save();

        res.send(user);
    } catch (e) {
        res.send(`Error ${e}`);
    }
}

let sellCar = async(req, res) => {
    try {
        let buyer_id = req.body.buyer_id;
        let car_id = req.body.car_id;

        const comprador = await User.findById(buyer_id);
        if (comprador == null) {
            return res.status(404).send(`No existe un comprador con ese id`);
        } else {
            const venta = await Car.findOneAndUpdate({ _id: car_id }, { owner: buyer_id }, { new: true });
            if (venta == null) {
                res.status(404).send(`No hay un carro con ese id`);
            } else {
                res.send(venta);
            }
        }
    } catch (error) {
        res.status(500).send(`Error al vender carro ${error}`);
    }
}

module.exports = {
    getUsers,
    getAuser,
    createUser,
    sellCar
}
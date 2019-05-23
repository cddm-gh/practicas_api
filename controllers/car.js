const Car = require('../models/car');
const User = require('../models/user');


let getCars = async(req, res) => {
    try {
        const cars = await Car.find({});
        if (!Object.keys(cars).length) {
            res.status(404).send(`No hay carros`);
        } else {
            res.send(cars);
        }
    } catch (e) {
        res.send(`Error ${e}`);
    }
}
let getOwnerCars = async(req, res) => {
    let user_id = req.params.user_id;

    try {
        const user_owner = await User.findById(user_id);
        if (user_owner == null) {
            return res.status(404).send('No existe un usuario con ese ID');
        } else {
            const cars = await Car.find({ owner: user_owner }, { '_id': 0, 'make': 1, 'model': 1, 'year': 1, 'kilometraje': 1 });
            if (!Object.keys(cars).length) {
                res.status(404).send(`El usuario ${user_owner.name} no posee ningún carro`);
            } else {
                res.send(cars);
            }
        }

    } catch (e) {
        res.send(`Error ${e}`);
    }

}

let createCar = async(req, res) => {

    try {
        let newCar = new Car(req.body);
        let car = await newCar.save();

        if (car == null) {
            res.status(500).send(`No se pudo crear el carro`);
        } else {
            res.send(car);
        }
    } catch (error) {
        res.send(500).send(`Error al crear el carro ${error}`);
    }
}

let deleteCar = async(req, res) => {
    try {
        let car_id = req.params.id;
        let car_deleted = await Car.findByIdAndDelete(car_id);

        if (car_deleted == null) {
            res.status(404).send(`No existe carro con ese id`);
        } else {
            res.send({ msg: 'Carro eliminado', car_deleted });
        }
    } catch (error) {
        res.status(500).send(`Error al borrar el carro ${error}`);
    }
}

module.exports = {
    getCars,
    getOwnerCars,
    createCar,
    deleteCar
}
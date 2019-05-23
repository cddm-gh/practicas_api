const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Cabeceras http Cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'token, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH,OPTIONS');
    res.header('Allow', 'PUT,POST,GET,DELETE,PATCH,OPTIONS');

    // allow preflight
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
//Cargar rutas
const user_routes = require('./routes/user');
const car_routes = require('./routes/car');
//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Rutas
app.use('/api', user_routes);
app.use('/api', car_routes);

//Exportar
module.exports = app;
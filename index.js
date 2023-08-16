const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');



// Crear el servidor de express
const app = express();

//Configurar CORS
app.use( cors() );


// Base de Datos
dbConnection();


// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo',
    });

});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

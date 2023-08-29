require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./database/config');



// Crear el servidor de express
const app = express();

//Configurar CORS
app.use( cors() );

// Carpeta Publica
app.use( express.static('public'));

// Lectura y Parseo del Body
app.use( express.json() );

// Base de Datos
dbConnection();


// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/uploads', require('./routes/uploads') );


// Lo ultimo
app.get('*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) )
});


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

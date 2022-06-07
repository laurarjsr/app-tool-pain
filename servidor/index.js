const express = require('express');
const conectarDB = require('./config/db');

//Creamos el servidor
const app = express();

//Conectamos a la BD
conectarDB();

app.use(express.json());

app.use('/api/sesiones', require('./routes/sesion'));

app.listen(4000, () => {
    console.log('Servidor funcionando');
})
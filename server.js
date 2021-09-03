const express = require('express');
const morgan = require('morgan');
const routerProductos = require('./routes/routerProductos');
const routerCarrito = require ('./routes/routerCarrito');
require('dotenv').config();

const app = express();

//Necesitamos agregar estas dos líneas para que me lea los JSON que vienen desde POSTMAN. Caso contrario no los puede leer.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Morgan nos informa en forma breve de cada uso que se la da a nuestra app
app.use(morgan('dev'));

//Atajamos todos los posibles errores del server
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Oops! something went wrong...');
});

// Usamos los archivos de la carpeta public
app.use(express.static('public'));

//Definimos 2 routers
app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);

const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`servidor escuchando en http://localhost:${process.env.PORT}`);
});

server.on('error', ()=>{
    console.log('Oops an error ocurred.');
})
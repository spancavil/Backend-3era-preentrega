const express = require ('express');
const routerAccount = express.Router();
require('dotenv').config();
//Manejo de archivos con multer
const multer = require('multer');
const uploadPhoto = multer({ dest: './public/userPhotos'});
const passport = require('../passport/passport')

//Modelos de usuario
const Users = require('../models/Users');

//Carrito y productos
const Carrito = require('../api/Carrito');
const Producto = require('../api/Producto');
const producto = new Producto;
const carrito = new Carrito;

//Loggers
const { loggerWarn } = require('../libs/loggerWinston');

//Funciones para envío de mail y sms modularizadas
const {sendMailGmailSignup} = require('../libs/nodeMailer')

// Usamos los archivos de la carpeta public
routerAccount.use(express.static('public'));

//SIGNUP
routerAccount.get('/signup', (req, res) => {
    res.render('signup');
})

//Usamos multer como middleware para subir la foto a public (uploadPhoto)
routerAccount.post('/signup', uploadPhoto.single('foto'),
    passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/successsignup' })
)

routerAccount.get('/failsignup', (req, res) => {
    res.send('<h1> Error al registrar al usuario! </h1>');
})

routerAccount.get('/successsignup', async (req, res) => {

    //Encontramos el último usuario agregado, ordenado por id de manera descendente
    let lastUserAdded = await Users.find({}).sort({_id: -1}).limit(1)
    //console.log("Ultimo usuario:", lastUserAdded);
    const mailOptions = {
        from: 'The backend burger',
        to: process.env.ADMINEMAIL,
        subject: `Nuevo usuario registrado al sitio!`,
        html: `<h4 style="color: blue;">Sign up con username: ${lastUserAdded[0].username}, email: ${lastUserAdded[0].email}. Fecha: ${new Date().toLocaleString()}</h4>`
    }
    sendMailGmailSignup(mailOptions);
    loggerWarn.warn("warn", `Sign up con username: ${lastUserAdded[0].username}, email: ${lastUserAdded[0].email}. Fecha: ${new Date().toLocaleString()}`)
    res.render(`successsignup`);
})

//HOME - LOGIN
routerAccount.get('/', (req, res) => {
    res.render('login');
})

//Endpoint para chequear el login.
routerAccount.post('/login',
    passport.authenticate('login', { failureRedirect: '/failsignin', successRedirect: '/datos' })
);

routerAccount.get('/failsignin', (req, res) => {
    res.render('failsignin');
})

routerAccount.get('/datos', checkAuth, async (req, res) => {
    loggerWarn.log('warn', `El usuario ${req.user.username} con id: ${req.user.id} ingresó a /datos`)
    const productosDB = await producto.listar();
    //Productos correspondientes al usuario en cuestión
    const productosEnCarrito = await carrito.listar();
    const productosEnCarritoFiltrados = productosEnCarrito.filter(producto => producto.buyer === req.user.username);
    res.render('datos', {
        username: req.user.username,
        photo: req.user.foto,
        hayProductos: true,
        productos: productosDB,
        productosEnCarritoFiltrados: productosEnCarritoFiltrados.length
    });
})

//Middleware para chequear que esté loggeado como el username correcto. En caso de no, se envía un 401.
//Además por cada nueva petición se regenera el tiempo de vida de la session.
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        loggerWarn.log("warn", "Se intento ingresar a /datos sin autenticación");
        res.redirect('/');
    }
}

routerAccount.get('/logout', (req, res) => {
    req.logout();
    res.render('logout');
})

module.exports = routerAccount;
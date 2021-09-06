const express = require('express');
const morgan = require('morgan');
const routerProductos = require('./routes/routerProductos');
const routerCarrito = require('./routes/routerCarrito');
require('dotenv').config();

//Loggers
const { loggerConsole, loggerError, loggerWarn } = require('./libs/loggerWinston');

//Nos conectamos con Mongo Atlas
require('./databases/mongoAtlas')

//Manejo de archivos con multer
const multer = require('multer');

const app = express();

// Usamos los archivos de la carpeta public
app.use(express.static('public'));

const uploadPhoto = multer({ dest: './public/userPhotos' });
const passport = require('./passport/passport');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//Funciones para envío de mail y sms modularizadas
const { sendMailEthereal, sendMailGmailSignup } = require('./libs/nodeMailer')
const sendTwilioSignUp = require ('./libs/twilio')

//Modelos de usuario
const Users = require('./models/Users');

//Carrito y productos
const Carrito = require('./api/Carrito');
const Producto = require('./api/Producto');
const producto = new Producto;
const carrito = new Carrito;

//Necesitamos agregar estas dos líneas para que me lea los JSON que vienen desde POSTMAN. Caso contrario no los puede leer.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Morgan nos informa en forma breve de cada uso que se la da a nuestra app
app.use(morgan('dev'));

//Atajamos todos los posibles errores del server
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Oops! something went wrong...');
});

//Motor de plantillas EJS
app.set('views', './views');
app.set('view engine', 'ejs');


app.use(session({
    store: MongoStore.create({
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: process.env.MONGOCONN,
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    ttl: 60 * 60
}))

//Por algún motivo QUE DESCONOZCO deben estar juntas initialize con session
app.use(passport.initialize());
//Con cada uso de la app usamos la session en caso de existir una
app.use(passport.session());

//SIGNUP
app.get('/signup', (req, res) => {
    res.render('signup');
})

//Usamos multer como middleware para subir la foto a public (uploadPhoto)
app.post('/signup', uploadPhoto.single('foto'),
    passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/successsignup' })
)

app.get('/failsignup', (req, res) => {
    res.send('<h1> Error al registrar al usuario! </h1>');
})

app.get('/successsignup', async (req, res) => {

    //Encontramos el último usuario agregado, ordenado por id de manera descendente
    let lastUserAdded = await Users.find({}).sort({_id: -1}).limit(1)
    //console.log("Ultimo usuario:", lastUserAdded);
    const mailOptions = {
        from: 'Servidor Node.js',
        to: process.env.ADMINEMAIL,
        subject: `Nuevo usuario registrado al sitio!`,
        html: `<h1 style="color: blue;">Sign up con username: ${lastUserAdded[0].username}, email: ${lastUserAdded[0].email}. Fecha: ${new Date().toLocaleString()}</h1>`
    }
    sendMailGmailSignup(mailOptions);
    loggerWarn.warn("warn", `Sign up con username: ${lastUserAdded[0].username}, email: ${lastUserAdded[0].email}. Fecha: ${new Date().toLocaleString()}`)
    // let data = {body: "New user registered!"}
    // sendTwilioSignUp(data)
    res.render(`successsignup`);
})

//HOME - LOGIN
app.get('/', (req, res) => {
    res.render('login');
})

//Endpoint para chequear el login.
app.post('/login',
    passport.authenticate('login', { failureRedirect: '/failsignin', successRedirect: '/datos' })
);

app.get('/failsignin', (req, res) => {
    res.render('failsignin');
})

app.get('/datos', checkAuth, async (req, res) => {
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

app.get('/logout', (req, res) => {
    req.logout();
    res.render('logout');
})


//Definimos 2 routers
app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    loggerConsole.log('debug', `Server listening at http://localhost:${PORT}`);
});

server.on('error', () => {
    loggerError.log('An error ocurred while setting up server.');
})

module.exports = checkAuth;
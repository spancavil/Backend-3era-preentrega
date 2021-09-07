const express = require ('express');
const routerCarrito = express.Router();

const Carrito = require ('../api/Carrito');
const { sendGmailOrder } = require('../libs/nodeMailer');
const { sendTwilioConfirmation, sendTwilioOrderToAdmin } = require('../libs/twilio');

const carrito = new Carrito();

// Usamos los archivos de la carpeta public
routerCarrito.use(express.static('public'));

/****************ALL USERS ********************/

// GET /carrito/listar me devuelve todos los productos
routerCarrito.get('/listar', async (req, res)=>{
    const respuesta = await carrito.listar();
    res.json(respuesta);
})

//GET /carrito/listar/:id Devuelvo sólo el producto del carrito que coincida con el id pasado a través de params. O listar todos los productos del carrito
routerCarrito.get('/listar/:id', async (req,res)=>{
    const response = await carrito.listarId(req.params.id);
    res.json(response);
})

//POST /carrito/agregar/:id Guardar a través de POST un producto en el carrito a través de su id.
routerCarrito.post('/agregar/:id', async (req, res)=>{
    //Agregado del username que le corresponde al carrito del usuario en cuestión
    const response = await carrito.guardar(req.params.id, req.user.username);
    res.json(response);
})

//DELETE /carrito/borrar/:id quitamos del carrito un producto por su id.
routerCarrito.delete('/borrar/:id', async (req, res) => {
    const response = await carrito.borrar(req.params.id);
    console.log("entro a borrar")
    res.json(response);
})

//GET /carrito/cart vista del carrito.
routerCarrito.get('/cart', checkAuth, async (req,res)=> {
    const user = req.user.username;
    const foto = req.user.foto;
    const telefono = req.user.telefono
    const productsInCart = await carrito.listar();
    const filteredProducts = productsInCart.filter(producto => producto.buyer === user);

    res.render('./cartView', {
        productos: filteredProducts,
        cantidad: filteredProducts.length,
        photo: foto,
        username: user,
        phone: telefono
    })
})

//POST /carrito/checkout Borra los elementos del carrito que corresponden al buyer loggeado, además envía las notificaciones correspondientes
routerCarrito.post('/checkout', checkAuth, async (req,res)=>{
    const {buyer, textoCompra, phone} = req.body;
    const email = req.user.email; 
    const response = await carrito.borrarCarrito(buyer);
    if (response.n > 0) {
        //Pedido en proceso enviado al usuario
        sendTwilioConfirmation(buyer, textoCompra, phone);

        //Pedidos enviados al Admin por mail y teléfono
        sendTwilioOrderToAdmin(textoCompra, phone, email, buyer, process.env.DESTINATARIOADMINWTP)
        sendGmailOrder(buyer, textoCompra, phone, email)
    } 
    res.send(response)
})

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        loggerWarn.log("warn", "Se intento ingresar a /datos sin autenticación");
        res.redirect('/');
    }
}

module.exports = routerCarrito;
const express = require ('express');
const routerCarrito = express.Router();

const Carrito = require ('../api/Carrito');

const carrito = new Carrito();

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

routerCarrito.get('/cart', checkAuth, async (req,res)=> {
    const user = req.user.username 
    const productsInCart = await carrito.listar();
    const filteredProducts = productsInCart.filter(producto => producto.buyer === user);
    /* res.render('/cartView', {
        productos: filteredProducts
    }) */
    res.render('./cartView', {
        productos: filteredProducts,
        cantidad: filteredProducts.length,
        photo: req.user.foto
    })
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
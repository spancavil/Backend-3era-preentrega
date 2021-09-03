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
    const response = await carrito.guardar(req.params.id);
    res.json(response);
})

//DELETE /carrito/borrar/:id quitamos del carrito un producto por su id.
routerCarrito.delete('/borrar/:id', async (req, res) => {
    const response = await carrito.borrar(req.params.id);
    res.json(response);
})

module.exports = routerCarrito;
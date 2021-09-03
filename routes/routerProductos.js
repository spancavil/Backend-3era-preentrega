const express = require ('express');
const routerProductos = express.Router();

const Producto = require ('../api/Producto')

const productos = new Producto();

/****************** ALL USERS ******************/

// GET /productos/listar me devuelve todos los productos
routerProductos.get('/listar', async (req, res)=>{
    const respuesta = await productos.listar();
    res.json(respuesta);
})

// GET /productos/listar/:id Devuelvo sólo el producto que coincida con el id pasado a través de params.
routerProductos.get('/listar/:id', async (req,res)=>{
    const response = await productos.listarId(req.params.id);
    res.json(response)
})

/****************** ONLY ADMINS ******************/

//POST /productos/guardar (admin:true) guarda un determinado producto
routerProductos.post('/guardar', async (req, res)=>{
    const productoAgregar = req.body;
    const respuesta = await productos.agregar(productoAgregar);
    res.json(respuesta);
})

//DELETE /productos/:id (admin:true) borra un producto por su id
routerProductos.delete('/borrar/:id', async (req, res) => {
    const response = await productos.borrar(req.params.id, req.body);
    res.json(response);
})

//PUT /productos/:id (admin:true) actualiza un producto por su id
routerProductos.put('/actualizar/:id', async (req, res)=> {
    const response = await productos.update(req.params.id, req.body);
    res.json(response);
})

module.exports = routerProductos;
const mongoose = require ('mongoose');

const schema = mongoose.Schema({
    producto: {
        nombre: {type: String, required: true, max: 300},
        precio: {type: Number, required: true},
        descripcion: {type: String, required: true, max: 400},
        stock: {type: Number, required: true},
        codigo: {type: String, required: true, max: 300},
        imagen: {type:String, required: true, max: 400}
    },
    timestamp: {type: String, required: true, max: 300},
    buyer: {type: String, required: true, max: 300}
})

const carritoMongo = mongoose.model('productoEnCarrito', schema);

module.exports = carritoMongo;
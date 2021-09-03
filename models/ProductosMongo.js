const mongoose = require ('mongoose');

const schema = mongoose.Schema({
    nombre: {type: String, required: true, max: 300},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true, max: 400},
    stock: {type: Number, required: true},
    codigo: {type: String, required: true, max: 300},
    imagen: {type:String, required: true, max: 400}
})

const productosMongo = mongoose.model('productos', schema);

module.exports = productosMongo;
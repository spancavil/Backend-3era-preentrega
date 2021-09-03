const PersistenciaFactoryProductos = require("../../models/PersistenciaFactory");
const ProductosMongo = require("../../models/ProductosMongo");
const Persistencia = require("../persistenciaProductosInterface");

//Mongo local o Atlas
const {alojamientoMongo} = require ('../../cfg/persistenceTypes');
require(`../../databases/mongo${alojamientoMongo}`);

class MongoLocal extends Persistencia {
    constructor(){
        super();
    }

    async listarId(productoId){
        try {
            console.log(productoId);
            const producto = await ProductosMongo.findById(productoId);
            console.log(producto);
            if (producto){
                return producto;
            }
            else {
                return {message: "No hay producto cargado con ese id"};
            }
        } catch (e) {
            ("Error al listar por id en Mongo: ", e);
        }

    }

    async listar(){
        try {
            const lista = await ProductosMongo.find({});
            if (lista){
                return lista;
            }
            else {
                return {message: "No hay productos cargados"}
            }
        } catch (e) {
            console.log("Error al leer los mensajes: ", e);
        }
    }

    async guardar(producto){
        try {
            const response = await ProductosMongo.create(producto);
            return response;
        } catch (e) {
            console.log('Error al guardar en Mongo: ', e)
        }
    }

    async actualizar(productoId, producto){
        try {
            const response = await ProductosMongo.findByIdAndUpdate(productoId, producto);
            return response;
        } catch (error) {
            console.log("Error al actualizar un producto en Mongo: ", e)
        }
    }

    async borrar(productoId){
        try {
            const response = ProductosMongo.findByIdAndDelete(productoId);
            return response;
        } catch (e) {
            console.log("Error al borrar un producto en Mongo: ", e)
        }
    }

}

module.exports = MongoLocal;
const CarritoMongo = require ('../../models/CarritoMongo');
const Persistencia = require ('../../persistencias/persistenciaCarritoInterface')
const ProductoMongo = require ('../../models/ProductosMongo');

//Connection mongo Atlas (implementable local)
const {alojamientoMongo} = require ('../../cfg/persistenceTypes');
const { loggerError, loggerConsole } = require('../../libs/loggerWinston');
require(`../../databases/mongo${alojamientoMongo}`);


class Mongo extends Persistencia{
    constructor(){
        super();
    }

    async listar(){
        try {
            const lista = await CarritoMongo.find({});
            if (lista){
                return lista;
            }
            else {
                return {message: "No hay productos cargados"}
            }
        } catch (e) {
            loggerError.log('error',"Error al leer los mensajes: ", e);
        }
    }

    async listarId(productoId){
        try {
            const producto = await CarritoMongo.find({productoId: productoId});
            if (producto){
                return producto;
            }
            else {
                return {message: "No hay producto en el carrito con ese id"};
            }
        } catch (e) {
            loggerError.log('error',"Error al listar por Id en Mongo: ", e);
        }
    }

    async guardar(productoId, username){
        try {
            const producto = await ProductoMongo.findById(productoId);
            if (producto){
                const response = await CarritoMongo.create({
                    producto: producto,
                    timestamp: (new Date()).toLocaleString(),
                    buyer: username
                })
                return response;
            }
        } catch (e) {
            loggerError.log('error',"Error al guardar un producto en carrito en mongo: ", e);
        }
    }

    async borrar(productoId){
        try {
            const response = CarritoMongo.findById(productoId).deleteOne();
            return response;
        } catch (e) {
            loggerError.log('error',"Error al borrar un producto en Mongo: ", e)
        }
    }

    async borrarCarrito(buyer){
        try {
            const response = await CarritoMongo.find({"buyer": buyer}).deleteMany();
            return (response);
        } catch (error) {
            loggerConsole ('debug', "Error al borrar el carrito: ", error)
            loggerError.log('error',"Error al borrar un carrito en Mongo: ", e)
        }
    }
}

module.exports = Mongo;
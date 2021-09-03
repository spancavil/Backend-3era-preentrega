const CarritoMongo = require ('../../models/CarritoMongo');
const Persistencia = require ('../../persistencias/persistenciaCarritoInterface')
const ProductoMongo = require ('../../models/ProductosMongo');

//Connection mongo Atlas (implementable local)
const {alojamientoMongo} = require ('../../cfg/persistenceTypes');
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
            console.log("Error al leer los mensajes: ", e);
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
            console.log("Error al listar por Id en Mongo: ", e);
        }
    }

    async guardar(productoId){
        try {
            const producto = await ProductoMongo.findById(productoId);
            if (producto){
                const response = await CarritoMongo.create({
                    producto: producto,
                    productoId: productoId,
                    timestamp: (new Date()).toLocaleString()
                })
            }
        } catch (e) {
            console.log("Error al guardar un producto en carrito en mongo: ", e);
        }
    }

    async borrar(productoId){
        try {
            const response = CarritoMongo.find({productoId: productoId}).deleteOne();
            return response;
        } catch (e) {
            console.log("Error al borrar un producto en Mongo: ", e)
        }
    }
}

module.exports = Mongo;
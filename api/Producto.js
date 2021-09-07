const { loggerError } = require('../libs/loggerWinston');
const Persistencia = require('../models/PersistenciaFactory');
const persistencia = new Persistencia();
const instance = persistencia.getPersist("Producto");

class Producto {
    constructor (){
    }

    async listar(){
        try{
            const response = await instance.listar();
            return response;
        }
        catch(e) {
            loggerError.log('error', "Error al listar en productos: ", e);
        }
    }

    async listarId(productoId){
        try {
            const response = await instance.listarId(productoId);
            return response
        } catch (e) {
            loggerError.log('error', "Error al listar por Id en producto: ", e);
        }
    }
    
    async agregar(producto){
        if (producto.admin !== true){
            return {error: -1, descripcion: "Ruta 'productos' método 'agregar' no autorizado"}
        }
        try {
            if (producto.nombre && producto.descripcion && producto.codigo && producto.imagen && producto.precio && producto.stock){
                const response = await instance.guardar(producto);
                return response
            } else{
                return {error: "Producto inválido al guardar."}
            }

        } catch (e) {
            loggerError.log('error', "Error al guardar en producto: ", e);
        }

    }

    async update(productoId, producto){
        if (producto.admin !== true){
            return {error: -1, descripcion: "Ruta 'productos' método 'actualizar' no autorizado"};
        }
        try {
            const response = await instance.actualizar(productoId, producto);
            return response;
        } catch (e) {
            loggerError.log('error', "Error en actualizar un producto: ", e);
        }
    }

    async borrar(productoId, body){
        if (body.admin !== true){
            return {error: -1, descripcion: "Ruta 'productos' método 'borrar' no autorizado"}
        }
        try {
            const response = await instance.borrar(productoId);
            return response;
        } catch (e) {
            loggerError.log('error', "Error en borrar un producto: ", e);
        }
    }
}

module.exports = Producto;
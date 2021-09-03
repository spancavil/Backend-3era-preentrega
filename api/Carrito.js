const Persistencia = require ('../models/PersistenciaFactory');
const persistencia = new Persistencia();
const instance = persistencia.getPersist("Carrito");

class Carrito {
    constructor (){
    }

    async listar(){
        try {
            console.log (instance);
            const response = await instance.listar();
            if (response){
                return response;
            }
            else {
                return {message: "No hay productos cargados en el carrito"}
            }
        } catch (error) {
            console.log("Error al listar el carrito: ", e);
        }
    }

    
    async listarId(productoId){
        try {
            const response = await instance.listarId(productoId);
            if (response){
                return response;
            }
            else {
                return {message: "No hay productos cargados en el carrito con ese id"}
            }
        } catch (error) {
            console.log("Error al listar el carrito: ", e);
        }
    }

    async guardar(productoId){
        try {
            const response = await instance.guardar(productoId);
            return response;
        } catch (e) {
            console.log("Error al guardar un producto en el carrito: ", e)
        }
    }

    async borrar(productoId){
        try{
            const response = await instance.borrar(productoId);
            return response;
        } catch (e) {
            console.log("Error al borrar un producto en el carrito: ", e)
        }
    }

}

module.exports = Carrito;
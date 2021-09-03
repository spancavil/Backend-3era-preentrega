// Se importa el tipo de persistencia desde este archivo.
const {type} = require('../cfg/persistenceTypes.js')

class PersistenciaFactoryProductos {

    getPersist (COP){
        try {
            let modulo = require(`../persistencias/${COP}/${type}`);
            return new modulo();
        } catch (e) {
            console.log("No se encontró el tipo de persistencia: ", e);
        }
    }
}

module.exports = PersistenciaFactoryProductos;
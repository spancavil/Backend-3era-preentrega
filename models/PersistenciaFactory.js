// Se importa el tipo de persistencia desde este archivo.
const {type} = require('../cfg/persistenceTypes.js');
const { loggerError } = require('../libs/loggerWinston.js');

class PersistenciaFactoryProductos {

    getPersist (COP){
        try {
            let modulo = require(`../persistencias/${COP}/${type}`);
            return new modulo();
        } catch (e) {
            loggerError.log('error',"No se encontró el tipo de persistencia: ", e);
        }
    }
}

module.exports = PersistenciaFactoryProductos;
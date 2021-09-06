const winston = require('winston');

//Configuramos el logger de Winston

const loggerConsole = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({level: 'debug'}),
  ]
})

const loggerWarn = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.File({filename: 'warnings.log', level: 'warn'})
  ]
})

const loggerError = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.File({filename: "errors.log", level: 'error'})
  ]
})

module.exports = {loggerConsole, loggerError, loggerWarn}
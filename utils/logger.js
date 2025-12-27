
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    // En prod, tu peux ajouter un transport fichier :
    // new transports.File({ filename: 'app.log' })
  ]
});

module.exports = logger;

const logger = require('../utils/logger'); // où tu l’as créé

module.exports = (err, req, res, next) => {
  logger.error(err.stack); // Log dans Winston
  res.status(err.status || 500).json({ message: err.message || 'Erreur serveur' });
};

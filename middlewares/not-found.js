const logger = require('../utils/logger');
const notFound = (req, res) =>{
    logger.warn(`[404] Route inconnue : ${req.originalUrl}`);
    res.status(404).json({
        success:false,
        messasge:`Route [${req.originalUrl}] n'existe pas`
    })
}
module.exports = notFound;
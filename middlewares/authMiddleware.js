const jwtUtils = require('../utils/jwt');

const authMiddleware = {
  // Protéger les routes (authentification requise)
  protect: (req, res, next) => {
    try {
      const token = jwtUtils.extractToken(req.headers.authorization);

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Accès non autorisé. Token manquant.'
        });
      }

      const decoded = jwtUtils.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Accès non autorisé. Token invalide.'
      });
    }
  },

  // Restreindre l'accès à certains rôles
  restrictTo: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Vous n\'avez pas les permissions nécessaires.'
        });
      }
      next();
    };
  }
};

module.exports = authMiddleware;
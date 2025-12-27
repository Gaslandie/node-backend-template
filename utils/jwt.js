const jwt = require('jsonwebtoken');

const jwtUtils = {
  // Générer un token JWT
  generateToken: (userId, role = 'user') => {
    return jwt.sign(
      { userId, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  },

  // Vérifier un token JWT
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }
  },

  // Extraire le token du header Authorization
  extractToken: (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }
};

module.exports = jwtUtils;
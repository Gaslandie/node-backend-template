const bcrypt = require('bcrypt');

const hashUtils = {
  // Hasher un mot de passe
  hashPassword: async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },

  // Comparer un mot de passe avec son hash
  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
};

module.exports = hashUtils;
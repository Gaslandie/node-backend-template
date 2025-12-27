const { body } = require('express-validator');

const authValidator = {
  register: [
    body('email')
      .isEmail().withMessage('Email invalide')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)
      .withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 }).withMessage('Le nom doit faire entre 2 et 50 caractères')
  ],

  login: [
    body('email')
      .isEmail().withMessage('Email invalide')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Le mot de passe est requis')
  ],

  updateProfile: [
    body('email')
      .optional()
      .isEmail().withMessage('Email invalide')
      .normalizeEmail(),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 }).withMessage('Le nom doit faire entre 2 et 50 caractères')
  ],

  changePassword: [
    body('currentPassword')
      .notEmpty().withMessage('Le mot de passe actuel est requis'),
    body('newPassword')
      .isLength({ min: 6 }).withMessage('Le nouveau mot de passe doit faire au moins 6 caractères')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)
      .withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial')
      .custom((value, { req }) => {
        if (value === req.body.currentPassword) {
          throw new Error('Le nouveau mot de passe doit être différent de l\'ancien');
        }
        return true;
      })
  ]
};

module.exports = authValidator;
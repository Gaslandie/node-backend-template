const { body, param } = require('express-validator');

const exampleValidator = {
  createExample: [
    body('title')
      .trim()
      .notEmpty().withMessage('Le titre est requis')
      .isLength({ min: 3, max: 100 }).withMessage('Le titre doit faire entre 3 et 100 caractères'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('La description ne doit pas dépasser 500 caractères'),
    body('isPublic')
      .optional()
      .isBoolean().withMessage('isPublic doit être un booléen')
  ],

  updateExample: [
    param('id')
      .isMongoId().withMessage('ID invalide'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 100 }).withMessage('Le titre doit faire entre 3 et 100 caractères'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('La description ne doit pas dépasser 500 caractères'),
    body('isPublic')
      .optional()
      .isBoolean().withMessage('isPublic doit être un booléen')
  ]
};

module.exports = exampleValidator;
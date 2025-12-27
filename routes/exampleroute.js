const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../validators/example.validator');

// Routes publiques
router.get('/', exampleController.getAllExamples);
router.get('/:id', exampleController.getExampleById);

// Routes protégées
router.post('/', authMiddleware, validate.createExample, exampleController.createExample);
router.put('/:id', authMiddleware, validate.updateExample, exampleController.updateExample);
router.delete('/:id', authMiddleware, exampleController.deleteExample);

module.exports = router;
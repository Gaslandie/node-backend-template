const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Toutes les routes nécessitent une authentification
router.use(authMiddleware.protect);

// Routes admin seulement
router.get('/', authMiddleware.restrictTo('admin'), userController.getAllUsers);
router.get('/:id', authMiddleware.restrictTo('admin'), userController.getUserById);
router.put('/:id', authMiddleware.restrictTo('admin'), userController.updateUser);
router.delete('/:id', authMiddleware.restrictTo('admin'), userController.deleteUser);

module.exports = router;
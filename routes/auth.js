const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../validators/auth.validator');

// Routes publiques
router.post('/register', validate.register, authController.register);
router.post('/login', validate.login, authController.login);

// Routes protégées
router.get('/profile', authMiddleware.protect, authController.getProfile);
router.put('/profile', authMiddleware.protect, validate.updateProfile, authController.updateProfile);
router.put('/change-password', authMiddleware.protect, validate.changePassword, authController.changePassword);
router.post('/logout', authMiddleware.protect, authController.logout);

module.exports = router;
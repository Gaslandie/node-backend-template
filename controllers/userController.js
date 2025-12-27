const User = require('../models/User');

const userController = {
  // Récupérer tous les utilisateurs (admin seulement)
  async getAllUsers(req, res, next) {
    try {
      const users = await User.find()
        .select('-password')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      next(error);
    }
  },

  // Récupérer un utilisateur par ID
  async getUserById(req, res, next) {
    try {
      const user = await User.findById(req.params.id)
        .select('-password');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  },

  // Mettre à jour un utilisateur (admin seulement)
  async updateUser(req, res, next) {
    try {
      const { role, isActive } = req.body;

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      // Empêcher un admin de se rétrograder lui-même
      if (req.params.id === req.user.userId && role && role !== 'admin') {
        return res.status(400).json({
          success: false,
          message: 'Vous ne pouvez pas changer votre propre rôle'
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { role, isActive },
        { new: true, runValidators: true }
      ).select('-password');

      res.json({
        success: true,
        message: 'Utilisateur mis à jour avec succès',
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  },

  // Supprimer un utilisateur (admin seulement)
  async deleteUser(req, res, next) {
    try {
      // Empêcher un admin de se supprimer lui-même
      if (req.params.id === req.user.userId) {
        return res.status(400).json({
          success: false,
          message: 'Vous ne pouvez pas supprimer votre propre compte'
        });
      }

      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      res.json({
        success: true,
        message: 'Utilisateur supprimé avec succès'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
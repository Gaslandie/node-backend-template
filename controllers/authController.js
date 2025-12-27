const User = require('../models/User');
const jwtUtils = require('../utils/jwt');
const hashUtils = require('../utils/hash');

const authController = {
  // Inscription
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Cet email est déjà utilisé'
        });
      }

      // Hasher le mot de passe
      const hashedPassword = await hashUtils.hashPassword(password);

      // Créer l'utilisateur
      const user = await User.create({
        email,
        password: hashedPassword,
        name
      });

      // Générer le token JWT
      const token = jwtUtils.generateToken(user._id, user.role);

      // Ne pas renvoyer le mot de passe
      user.password = undefined;

      res.status(201).json({
        success: true,
        message: 'Inscription réussie',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Connexion
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Trouver l'utilisateur avec le mot de passe
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Email ou mot de passe incorrect'
        });
      }

      // Vérifier si le compte est actif
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Compte désactivé'
        });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await hashUtils.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Email ou mot de passe incorrect'
        });
      }

      // Générer le token JWT
      const token = jwtUtils.generateToken(user._id, user.role);

      // Ne pas renvoyer le mot de passe
      user.password = undefined;

      res.json({
        success: true,
        message: 'Connexion réussie',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Récupérer le profil utilisateur
  async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.user.userId);
      
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

  // Mettre à jour le profil
  async updateProfile(req, res, next) {
    try {
      const { name, email } = req.body;

      // Vérifier si l'email est déjà utilisé par un autre utilisateur
      if (email) {
        const existingUser = await User.findOne({ 
          email, 
          _id: { $ne: req.user.userId } 
        });
        
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'Cet email est déjà utilisé'
          });
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,
        { name, email },
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: 'Profil mis à jour avec succès',
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  },

  // Changer le mot de passe
  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;

      // Récupérer l'utilisateur avec le mot de passe
      const user = await User.findById(req.user.userId).select('+password');
      
      // Vérifier l'ancien mot de passe
      const isPasswordValid = await hashUtils.comparePassword(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Mot de passe actuel incorrect'
        });
      }

      // Hasher le nouveau mot de passe
      const hashedPassword = await hashUtils.hashPassword(newPassword);

      // Mettre à jour le mot de passe
      user.password = hashedPassword;
      await user.save();

      res.json({
        success: true,
        message: 'Mot de passe changé avec succès'
      });
    } catch (error) {
      next(error);
    }
  },

  // Déconnexion (côté client généralement, mais on peut blacklister le token si nécessaire)
  async logout(req, res, next) {
    try {
      // Dans une implémentation avancée, on pourrait blacklister le token
      // Pour l'instant, on laisse le client supprimer le token
      
      res.json({
        success: true,
        message: 'Déconnexion réussie'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;
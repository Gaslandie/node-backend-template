const Example = require('../models/Example');

const exampleController = {
  // Récupérer tous les exemples (avec pagination)
  async getAllExamples(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const examples = await Example.find()
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'email name')
        .sort({ createdAt: -1 });

      const total = await Example.countDocuments();

      res.json({
        success: true,
        data: examples,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Récupérer un exemple par ID
  async getExampleById(req, res, next) {
    try {
      const example = await Example.findById(req.params.id)
        .populate('createdBy', 'email name');

      if (!example) {
        return res.status(404).json({
          success: false,
          message: 'Exemple non trouvé'
        });
      }

      res.json({
        success: true,
        data: example
      });
    } catch (error) {
      next(error);
    }
  },

  // Créer un nouvel exemple
  async createExample(req, res, next) {
    try {
      const exampleData = {
        ...req.body,
        createdBy: req.user.userId // À partir du middleware auth
      };

      const example = await Example.create(exampleData);

      res.status(201).json({
        success: true,
        message: 'Exemple créé avec succès',
        data: example
      });
    } catch (error) {
      next(error);
    }
  },

  // Mettre à jour un exemple
  async updateExample(req, res, next) {
    try {
      const example = await Example.findById(req.params.id);

      if (!example) {
        return res.status(404).json({
          success: false,
          message: 'Exemple non trouvé'
        });
      }

      // Vérifier que l'utilisateur est le propriétaire
      if (example.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Non autorisé'
        });
      }

      const updatedExample = await Example.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('createdBy', 'email name');

      res.json({
        success: true,
        message: 'Exemple mis à jour avec succès',
        data: updatedExample
      });
    } catch (error) {
      next(error);
    }
  },

  // Supprimer un exemple
  async deleteExample(req, res, next) {
    try {
      const example = await Example.findById(req.params.id);

      if (!example) {
        return res.status(404).json({
          success: false,
          message: 'Exemple non trouvé'
        });
      }

      // Vérifier que l'utilisateur est le propriétaire ou admin
      if (example.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Non autorisé'
        });
      }

      await Example.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: 'Exemple supprimé avec succès'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = exampleController;
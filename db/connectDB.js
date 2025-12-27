// utils/connectDB.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      autoIndex: process.env.NODE_ENV !== 'production', // index auto en dev uniquement
    });
    console.log('\x1b[32m[MongoDB]\x1b[0m Connecté avec succès ✔️');
  } catch (error) {
    console.error('\x1b[31m[MongoDB]\x1b[0m Erreur de connexion :', error.message);
    process.exit(1); // Arrête tout si la BDD ne répond pas
  }
};

module.exports = connectDB;

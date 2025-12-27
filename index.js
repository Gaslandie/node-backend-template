const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./db/connectDB');
const logger = require('./utils/logger');
const path = require('path');

// 🔁 Charge le bon fichier .env selon le contexte
// const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
// require('dotenv').config({ path: path.resolve(__dirname, envFile) });


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globaux
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('combined', { stream: { write: msg => logger.http(msg.trim()) }}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.set('trust proxy', 1);

// Routes principales
// Routes principales
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/userroute'));
app.use('/api/example', require('./routes/exampleroute'));



// 404 Not Found pour toutes les autres routes
app.use(notFound);

// Gestion globale des erreurs
app.use(errorHandler);

// Connexion à MongoDB puis lancement du serveur
if(process.env.NODE_ENV !== 'test'){
  connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
  });
});
}

module.exports = app;

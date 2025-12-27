# 🚀 Node.js projet backend pour Gaslandie

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

**Template professionnel et production-ready pour API REST avec Node.js, Express et MongoDB**

---

## 📋 Table des Matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation Rapide](#-installation-rapide)
- [Configuration](#-configuration)
- [Structure du Projet](#-structure-du-projet)
- [API Documentation](#-api-documentation)
- [Scripts Disponibles](#-scripts-disponibles)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Bonnes Pratiques](#-bonnes-pratiques)
- [Roadmap](#-roadmap)
- [Contribution](#-contribution)
- [License](#-license)
- [Support](#-support)

---

## 🎯 À propos

Template backend Node.js moderne et scalable, conçu pour accélérer le développement d'API REST professionnelles. Inclut l'authentification JWT, la gestion des erreurs, la validation, le logging, et bien plus.

### Pourquoi ce template ?

- ⚡ **Démarrage rapide** : Clone et lance en 2 minutes
- 🏗️ **Architecture MVC** : Code organisé et maintenable
- 🔐 **Sécurité** : Best practices de sécurité intégrées
- 📝 **Documentation** : API docs automatiques avec Swagger
- 🧪 **Tests** : Configuration Jest prête à l'emploi
- 🚀 **Production-ready** : Optimisé pour le déploiement

---

## ✨ Fonctionnalités

### Core Features

- ✅ **Authentification & Authorization** : JWT avec refresh tokens
- ✅ **Validation des données** : Joi/Express-validator
- ✅ **Gestion des erreurs** : Middleware centralisé
- ✅ **Logging** : Winston avec rotation des logs
- ✅ **Rate Limiting** : Protection contre les abus
- ✅ **CORS** : Configuration flexible
- ✅ **Compression** : Réponses HTTP compressées
- ✅ **Security Headers** : Helmet.js

### API Features

- 📧 **Emails** : Nodemailer avec templates
- 📁 **Upload de fichiers** : Multer avec validation
- 🔍 **Pagination** : Pagination, tri, filtres
- 🌐 **i18n** : Support multilingue
- 📊 **Monitoring** : Health checks & metrics
- 🗄️ **Database** : MongoDB avec Mongoose ODM

### Developer Experience

- 🔥 **Hot Reload** : Nodemon en développement
- 🎨 **Code Quality** : ESLint + Prettier
- 🧹 **Git Hooks** : Husky + Lint-staged
- 📚 **API Docs** : Swagger/OpenAPI 3.0
- 🐳 **Docker** : Dockerfile & docker-compose

---

## 🏛️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │─────▶│     API     │─────▶│  Database   │
└─────────────┘      └─────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   Services   │
                     │  (Business)  │
                     └──────────────┘
```

**Pattern MVC amélioré** :
- **Routes** → Définition des endpoints
- **Controllers** → Logique de gestion des requêtes
- **Services** → Logique métier
- **Models** → Schémas de données
- **Middlewares** → Validation, auth, errors

---

## 🛠️ Technologies

### Core Stack

| Technologie | Version | Description |
|------------|---------|-------------|
| **Node.js** | 18.x+ | Runtime JavaScript |
| **Express** | 4.18+ | Framework web minimaliste |
| **MongoDB** | 6.0+ | Base de données NoSQL |
| **Mongoose** | 7.x+ | ODM MongoDB élégant |

### Packages Principaux

**Dependencies**
- `express` - Framework web
- `mongoose` - ODM MongoDB
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Hash passwords
- `joi` - Validation
- `helmet` - Security headers
- `cors` - CORS middleware
- `express-rate-limit` - Rate limiting
- `winston` - Logging
- `dotenv` - Environment variables
- `compression` - Response compression
- `nodemailer` - Email sending
- `multer` - File upload

**Dev Dependencies**
- `nodemon` - Auto-restart
- `eslint` - Linting
- `prettier` - Code formatting
- `jest` - Testing
- `supertest` - API testing
- `husky` - Git hooks

---

## 📦 Prérequis

Assure-toi d'avoir installé :

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **MongoDB** >= 6.0
- **Git** >= 2.30.0

Vérification des versions :

```bash
node --version  # v18.x.x ou supérieur
npm --version   # v9.x.x ou supérieur
mongod --version # v6.x.x ou supérieur
```

---

## 🚀 Installation Rapide

### Option 1 : Installation Standard

```bash
# 1. Cloner le repository
git clone https://github.com/Gaslandie/nodejs-Gassamaa.git
cd nodejs-Gassamaa

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env
cp .env.example .env

# 4. Configurer les variables d'environnement
nano .env

# 5. Démarrer MongoDB (si local)
mongod

# 6. Lancer l'application
npm run dev
```

### Option 2 : Installation avec Docker

```bash
# 1. Cloner le repository
git clone https://github.com/Gaslandie/nodejs-Gassamaa.git
cd nodejs-Gassamaa

# 2. Lancer avec Docker Compose
docker-compose up -d

# L'API sera disponible sur http://localhost:3000
```

### Option 3 : Installation One-Liner

```bash
git clone https://github.com/Gaslandie/nodejs-Gassamaa.git && cd nodejs-Gassamaa && npm install && cp .env.example .env && npm run dev
```

---

## ⚙️ Configuration

### Variables d'Environnement

Crée un fichier `.env` à la racine du projet :

```env
# =====================
# APPLICATION
# =====================
NODE_ENV=development
PORT=3000
API_VERSION=v1

# =====================
# DATABASE
# =====================
# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/backend_template

# MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# =====================
# AUTHENTICATION
# =====================
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret_key
JWT_REFRESH_EXPIRE=30d

# =====================
# EMAIL
# =====================
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=gassma803@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=noreply@yourdomain.com

# =====================
# SECURITY
# =====================
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
BCRYPT_ROUNDS=10

# =====================
# CORS
# =====================
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com

# =====================
# CLOUDINARY (optionnel)
# =====================
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# =====================
# REDIS (optionnel)
# =====================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# =====================
# MONITORING
# =====================
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=debug
```

### Configuration Git

```bash
git config --global user.name "Gaslandie"
git config --global user.email "gassma803@gmail.com"
```

---

## 📁 Structure du Projet

```
nodejs-Gassamaa/
├── src/
│   ├── config/              # Configuration de l'app
│   │   ├── database.js      # Config MongoDB
│   │   ├── logger.js        # Config Winston
│   │   └── swagger.js       # Config Swagger
│   ├── controllers/         # Logique des routes
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middlewares/         # Middlewares Express
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── validate.middleware.js
│   │   └── rateLimiter.js
│   ├── models/              # Modèles Mongoose
│   │   ├── User.model.js
│   │   └── Token.model.js
│   ├── routes/              # Définition des routes
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── services/            # Logique métier
│   │   ├── auth.service.js
│   │   ├── email.service.js
│   │   └── user.service.js
│   ├── utils/               # Utilitaires
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── catchAsync.js
│   ├── validations/         # Schémas de validation
│   │   ├── auth.validation.js
│   │   └── user.validation.js
│   └── app.js               # Configuration Express
├── tests/                   # Tests
│   ├── integration/
│   └── unit/
├── docs/                    # Documentation
│   └── api/
├── logs/                    # Fichiers de logs
├── .env.example             # Template variables env
├── .eslintrc.json           # Config ESLint
├── .prettierrc              # Config Prettier
├── .gitignore
├── docker-compose.yml       # Config Docker
├── Dockerfile
├── jest.config.js           # Config Jest
├── package.json
├── README.md
└── server.js                # Point d'entrée
```

---

## 📚 API Documentation

### Endpoints Principaux

#### Authentication

```
POST   /api/v1/auth/register       # Inscription
POST   /api/v1/auth/login           # Connexion
POST   /api/v1/auth/refresh         # Refresh token
POST   /api/v1/auth/logout          # Déconnexion
POST   /api/v1/auth/forgot-password # Mot de passe oublié
POST   /api/v1/auth/reset-password  # Reset password
```

#### Users

```
GET    /api/v1/users               # Liste des utilisateurs (Admin)
GET    /api/v1/users/:id           # Détails utilisateur
PATCH  /api/v1/users/:id           # Modifier utilisateur
DELETE /api/v1/users/:id           # Supprimer utilisateur
GET    /api/v1/users/me            # Profil actuel
```

### Exemple de Requête

**Inscription**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Connexion**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Accéder à une route protégée**
```bash
curl -X GET http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Swagger UI

Documentation interactive disponible à :
```
http://localhost:3000/api-docs
```

---

## 🔧 Scripts Disponibles

### Développement
```bash
npm run dev              # Démarre avec nodemon (hot reload)
npm run dev:debug        # Démarre en mode debug
```

### Production
```bash
npm start                # Démarre en production
npm run build            # Build pour production
```

### Tests
```bash
npm test                 # Lance tous les tests
npm run test:watch       # Tests en mode watch
npm run test:coverage    # Tests avec coverage
npm run test:integration # Tests d'intégration
```

### Qualité du code
```bash
npm run lint             # Vérifie le code
npm run lint:fix         # Corrige automatiquement
npm run format           # Formate avec Prettier
npm run format:check     # Vérifie le formatage
```

### Database
```bash
npm run db:seed          # Seed la database
npm run db:reset         # Reset la database
```

### Autres
```bash
npm run docs             # Génère la documentation
npm run security:check   # Audit de sécurité
```

---

## 🧪 Tests

### Structure des Tests

```
tests/
├── unit/
│   ├── models/
│   ├── services/
│   └── utils/
├── integration/
│   ├── auth.test.js
│   └── users.test.js
├── fixtures/
│   └── users.json
└── setup.js
```

### Lancer les Tests

```bash
# Tous les tests
npm test

# Tests spécifiques
npm test auth.test.js

# Avec coverage
npm run test:coverage

# En mode watch
npm run test:watch
```

### Exemple de Test

```javascript
describe('POST /api/v1/auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!'
      })
      .expect(201);

    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
  });
});
```

---

## 🌐 Déploiement

### Option 1 : Heroku

```bash
# Installation Heroku CLI
npm install -g heroku

# Login
heroku login

# Créer l'app
heroku create nodejs-Gassamaa

# Ajouter MongoDB
heroku addons:create mongolab:sandbox

# Configurer les variables
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Déployer
git push heroku main

# Ouvrir l'app
heroku open
```

### Option 2 : Railway

```bash
# Installation Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialiser
railway init

# Déployer
railway up
```

### Option 3 : DigitalOcean App Platform

1. Connecte ton repo GitHub
2. Configure les variables d'environnement
3. Clique sur "Deploy"

### Option 4 : VPS (Ubuntu)

```bash
# Sur ton serveur
# 1. Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Installer MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo apt-get install -y mongodb-org

# 3. Installer PM2
sudo npm install -g pm2

# 4. Cloner et configurer
git clone https://github.com/Gaslandie/nodejs-Gassamaa.git
cd nodejs-Gassamaa
npm install --production
cp .env.example .env
nano .env

# 5. Démarrer avec PM2
pm2 start server.js --name "backend-api"
pm2 startup
pm2 save

# 6. Configurer Nginx (optionnel)
sudo apt install nginx
```

### Option 5 : Docker Production

```bash
# Build l'image
docker build -t nodejs-Gassamaa .

# Lancer le container
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  --name backend-api \
  nodejs-Gassamaa

# Avec Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Configuration Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📐 Bonnes Pratiques

### Code Quality

- ✅ Utilise ESLint et Prettier
- ✅ Écris des tests unitaires et d'intégration
- ✅ Documente ton code avec JSDoc
- ✅ Garde les fonctions petites et focalisées
- ✅ Utilise des noms de variables descriptifs

### Sécurité

- ✅ Valide toutes les entrées utilisateur
- ✅ Utilise des variables d'environnement
- ✅ Hash les mots de passe avec bcrypt
- ✅ Implémente le rate limiting
- ✅ Utilise HTTPS en production
- ✅ Garde les dépendances à jour

### Performance

- ✅ Utilise la compression
- ✅ Implémente le caching avec Redis
- ✅ Optimise les requêtes DB
- ✅ Utilise des indexes MongoDB
- ✅ Limite la taille des payloads

### Git Workflow

```bash
# Créer une branche feature
git checkout -b feature/new-feature

# Commits conventionnels
git commit -m "feat: add user profile endpoint"
git commit -m "fix: resolve auth bug"
git commit -m "docs: update API documentation"

# Push et PR
git push origin feature/new-feature
```

---

## 🗺️ Roadmap

### Version 1.0 (Actuelle)

- [x] Architecture MVC
- [x] Authentication JWT
- [x] CRUD Users
- [x] Validation
- [x] Error handling
- [x] Logging
- [x] API Documentation

### Version 1.1 (Prochaine)

- [ ] Rate limiting avancé
- [ ] Cache Redis
- [ ] Upload fichiers S3
- [ ] Websockets
- [ ] Notifications push
- [ ] Two-factor authentication

### Version 2.0 (Future)

- [ ] GraphQL API
- [ ] Microservices architecture
- [ ] Event-driven patterns
- [ ] Advanced monitoring
- [ ] CI/CD pipelines

---

## 🤝 Contribution

Les contributions sont très appréciées ! Voici comment participer :

### Processus de Contribution

1. **Fork le projet**
2. **Clone ton fork**
   ```bash
   git clone https://github.com/TON-USERNAME/nodejs-Gassamaa.git
   ```
3. **Crée une branche**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
4. **Commit avec des messages clairs**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push vers la branche**
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **Ouvre une Pull Request**

### Convention de Commits

Utilise [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

### Guidelines

- Respecte le style de code (ESLint + Prettier)
- Ajoute des tests pour les nouvelles features
- Mets à jour la documentation
- Assure-toi que tous les tests passent
- Garde les PRs focalisées et petites

---

## 📄 License

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

```
MIT License

Copyright (c) 2024 Gaslandie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Remerciements

### Technologies

- [Node.js](https://nodejs.org/) - Runtime JavaScript performant
- [Express.js](https://expressjs.com/) - Framework web minimaliste
- [MongoDB](https://www.mongodb.com/) - Base de données NoSQL
- [Mongoose](https://mongoosejs.com/) - ODM MongoDB élégant
- [JWT](https://jwt.io/) - Tokens d'authentification sécurisés
- [Winston](https://github.com/winstonjs/winston) - Logger professionnel
- [Jest](https://jestjs.io/) - Framework de tests
- [Swagger](https://swagger.io/) - Documentation API

### Inspiration

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express API Starter](https://github.com/w3cj/express-api-starter)
- [Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs)

---

## 📞 Support

### Besoin d'aide ?

- 📧 **Email** : gassma803@gmail.com
- 🐛 **Bug Reports** : [Créer une issue](https://github.com/Gaslandie/nodejs-Gassamaa/issues)
- 💬 **Discussions** : [GitHub Discussions](https://github.com/Gaslandie/nodejs-Gassamaa/discussions)
- 📖 **Documentation** : [Wiki](https://github.com/Gaslandie/nodejs-Gassamaa/wiki)

### Questions Fréquentes

**Comment changer le port ?**
Modifie la variable `PORT` dans ton fichier `.env`

**Quelle version de Node.js utiliser ?**
Node.js 18.x ou supérieur est recommandé

**Comment activer HTTPS ?**
Utilise un reverse proxy comme Nginx ou Caddy en production

**Comment contribuer ?**
Consulte la section [Contribution](#-contribution) ci-dessus

---

**Développé avec ❤️ par [Gaslandie](https://github.com/Gaslandie)**

⭐ Si ce template t'aide, donne-lui une étoile sur GitHub !

---
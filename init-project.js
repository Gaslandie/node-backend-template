#!/usr/bin/env node

// init-project.js
// Script d'initialisation pour nouveaux projets

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Initialisation du projet backend');
console.log('=' .repeat(50));

const questions = [
  { name: 'projectName', question: 'Nom du projet : ', default: 'mon-backend' },
  { name: 'projectDescription', question: 'Description : ', default: 'Backend API' },
  { name: 'author', question: 'Auteur : ', default: '' },
  { name: 'port', question: 'Port (défaut: 5000) : ', default: '5000' },
  { name: 'dbName', question: 'Nom de la base MongoDB : ', default: 'backend-db' }
];

const answers = {};

async function askQuestions() {
  for (const q of questions) {
    const answer = await new Promise((resolve) => {
      rl.question(q.question, (input) => {
        resolve(input.trim() || q.default);
      });
    });
    answers[q.name] = answer;
  }
  rl.close();
}

async function init() {
  await askQuestions();

  console.log('\n📋 Configuration :');
  console.log(JSON.stringify(answers, null, 2));
  
  console.log('\n⚙️  Mise à jour des fichiers...');

  // 1. Mettre à jour package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.name = answers.projectName;
  packageJson.description = answers.projectDescription;
  packageJson.author = answers.author;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  // 2. Mettre à jour .env.example
  let envContent = fs.readFileSync('.env.example', 'utf8');
  envContent = envContent.replace(/PORT=.*/g, `PORT=${answers.port}`);
  envContent = envContent.replace(/MONGO_URI=.*/g, `MONGO_URI=mongodb://localhost:27017/${answers.dbName}`);
  fs.writeFileSync('.env.example', envContent);

  // 3. Créer .env à partir de .env.example
  fs.copyFileSync('.env.example', '.env');

  // 4. Mettre à jour README.md
  let readmeContent = fs.readFileSync('README.md', 'utf8');
  readmeContent = readmeContent.replace(/backend-template/g, answers.projectName);
  readmeContent = readmeContent.replace(/Backend Template/g, answers.projectDescription);
  fs.writeFileSync('README.md', readmeContent);

  console.log('\n✅ Installation des dépendances...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  Installation manuelle requise: npm install');
  }

  console.log('\n🎉 Projet initialisé avec succès !');
  console.log('\n📝 Prochaines étapes :');
  console.log('1. Édite le fichier .env avec tes configurations');
  console.log('2. Lance MongoDB : sudo systemctl start mongod');
  console.log('3. Démarre le serveur : npm run dev');
  console.log('4. Teste l\'API : npm test');
  console.log('\n💡 Conseil : Renomme le dossier en ' + answers.projectName);
}

init().catch(console.error);
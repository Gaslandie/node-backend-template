// Configuration des tests
process.env.NODE_ENV = 'test';
process.env.PORT = 5001;
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_EXPIRES_IN = '1h';

// Mock de la connexion MongoDB pour les tests
jest.mock('../db/connectDB', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true)
}));

// Timeout global pour les tests
jest.setTimeout(30000);
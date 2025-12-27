const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');

let authToken;

beforeAll(async () => {
  // Nettoyer la base de données
  await User.deleteMany({});
});

afterAll(async () => {
  // Fermer la connexion MongoDB
  await mongoose.connection.close();
});

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123!',
          name: 'Test User'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('test@example.com');
      expect(res.body.data.token).toBeDefined();
    });

    it('should not register with existing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123!',
          name: 'Another User'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test123!'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      
      authToken = res.body.data.token;
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword'
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
    });
  });
});

describe('Example Resource API', () => {
  describe('GET /api/example', () => {
    it('should get all examples without authentication', async () => {
      const res = await request(app)
        .get('/api/example');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/example', () => {
    it('should create an example with authentication', async () => {
      const res = await request(app)
        .post('/api/example')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Example',
          description: 'This is a test example'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Example');
    });

    it('should not create example without authentication', async () => {
      const res = await request(app)
        .post('/api/example')
        .send({
          title: 'Test Example',
          description: 'This is a test example'
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
    });
  });
});
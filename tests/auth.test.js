// tests/auth.test.js
// -----------------------------------------------------------------------------
// Ce fichier contient des tests unitaires pour la route d'authentification
// GET /api/auth/check de l'API. Il vérifie que l'accès à cette route est bien
// protégé : refus sans token, refus avec un token invalide, et acceptation avec
// un token valide. Ces tests garantissent la sécurité et la fiabilité de la
// vérification d'authentification côté backend.
// -----------------------------------------------------------------------------

const request = require('supertest'); // Permet de simuler des requêtes HTTP sur l'app Express
const app = require('../index');      // Importe l'application Express à tester

// Groupe de tests pour la route d'authentification
describe('Authentification - GET /api/auth/check', () => {

    // -------------------------------------------------------------------------
    // Test 1 : Vérifie que l'accès sans token est refusé
    // -------------------------------------------------------------------------
    it('devrait refuser sans token', async () => {
        const rest = await request(app).get('/api/auth/check'); // Requête sans header Authorization
        expect(rest.statusCode).toBe(401); // On attend un code 401 (non autorisé)
        expect(rest.body.message.toLowerCase()).toMatch(/token/i); // Le message doit mentionner "token"
    });

    // -------------------------------------------------------------------------
    // Test 2 : Vérifie que l'accès avec un token invalide est refusé
    // -------------------------------------------------------------------------
    it('devrait refuser avec un token invalide', async () => {
        const res = await request(app).get('/api/auth/check')
                                      .set('Authorization', 'Bearer token_invalide'); // Faux token
        expect(res.statusCode).toBe(401); // Toujours 401 attendu
        expect(res.body.message).toMatch(/invalide/i); // Le message doit mentionner "invalide"
    });

    // -------------------------------------------------------------------------
    // Test 3 : Vérifie que l'accès avec un token valide est accepté
    // -------------------------------------------------------------------------
    it('devrait accepter avec un token valide', async () => {
        // Un token JWT valide (généré pour les tests, à adapter selon votre environnement)
        const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY3ZDhjZWU0ZTYwYmYwMzYxNmM1ODg4NTJiMjA5MTZkNjRjMzRmYmEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoic2Vrb3Uga2VpdGEiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZy1ub3Rlcy03ZmFmYiIsImF1ZCI6Imctbm90ZXMtN2ZhZmIiLCJhdXRoX3RpbWUiOjE3NDc3NjY5NTgsInVzZXJfaWQiOiJ0WXMxU2k2TXRnWTZpTjhmUUNwUnJGSGpteEkzIiwic3ViIjoidFlzMVNpNk10Z1k2aU44ZlFDcFJyRkhqbXhJMyIsImlhdCI6MTc0Nzc2Njk1OSwiZXhwIjoxNzQ3NzcwNTU5LCJlbWFpbCI6ImtlaXRhQHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImtlaXRhQHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.FIL6lVI4MlV4ZKQiiy2_F2IYDYbMkSZ2XDAzxj8woOoNwCwkMkm4uU3bRQ31-kCzJCIWur_2jb6zFlI2t16iG3dBJIF2Cfee2HFjV_w_VF2fogJ5jyf0U75lswWG8FTzqf6GTmXfm892QDRMyP9zE6cXdLvQLb3P8RZ_uOrZT_2mbrJ_PSqldkX4Fmm5xFOPiu7Ajkt5wH1zLnMlRWcA1SOJVQyuebhbiVAso-BqB-jLS5rHMKGKPxGe1jDoBRYebJMznstARozbG9nf5LnhYWhfGGWS3ZHyWrgqNY882iZxeE2p_r2R0iZNjIjEyvcbOe1Q_Z_qaStYZptjTQYMmQ"
        // Requête avec un header Authorization contenant le token valide
        const res = await request(app).get('/api/auth/check').set('Authorization',`Bearer ${token}`);
        expect(res.statusCode).toBe(200); // On attend un code 200 (succès)
        expect(res.body).toHaveProperty('uid');   // Le corps de la réponse doit contenir un uid
        expect(res.body).toHaveProperty('email'); // ...et un email
    });
});
import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js'; // Adjust path to your Express app

describe('User API Basic CRUD Tests', () => {
  let authToken;
  let testUserId;

  // Get authentication token before running tests
  before(async () => {
    const loginResponse = await request(app)
      .post("/api/v1/auth/login") // Adjust path if different
      .send({
        "username": 'jasonDoe',
        "password": 'password202'
      });

    expect(loginResponse.status).to.equal(200);
    authToken = loginResponse.body.token;
  });

  describe('POST /api/v1/users - Create User', () => {
    it('should create a new user successfully', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'NORMAL'
      };

      const res = await request(app)
        .post('/api/v1/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newUser);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('User successfully created');
      expect(res.body.data).to.be.an('array');
      
      // Find and store the created user ID for later tests
      const createdUser = res.body.data.find(user => user.email === 'test@example.com');
      if (createdUser) {
        testUserId = createdUser.id;
      }
    });

    it('should handle missing required fields', async () => {
      const invalidUser = {
        username: 'incompleteuser'
      };

      const res = await request(app)
        .post('/api/v1/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidUser);

      expect(res.status).to.equal(409);
      expect(res.body.message).to.exist;
    });
  });

  describe('GET /api/v1/users - Get All Users', () => {
    it('should return all users', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
  
    });

    it('should handle query parameters', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .query({ username: 'jasonDoe' })
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.be.oneOf([200, 404]);
      expect (res.body.message).to.equal('Users located')
    });
  });

  describe('GET /api/v1/users/:id - Get User by ID', () => {
    it('should return a specific user by ID', async () => {
      // Use the test user ID if available, otherwise use a known ID
      const userId = testUserId || "96be3f55-878f-48f5-9a04-fb69ba439718"; // Adjust default ID as needed

      const res = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.equal(200);
      expect(res.body.data.id).to.equal(userId);
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app)
        .get('/api/v1/users/99999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('No user with the id: 99999 found');
    });
  });

  describe('PUT /api/v1/users/:id - Update User', () => {
    it('should update a user successfully', async () => {
      const userId = testUserId || 1; // Adjust as needed
      const updateData = {
        username: 'updatedusername',
        email: 'updated@example.com'
      };

      const res = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(res.status).to.equal(200);
      expect(res.body.message).to.include('successfully updated');
      expect(res.body.data).to.be.an('object');
    });

    it('should return 404 when updating non-existent user', async () => {
      const updateData = {
        username: 'nonexistent'
      };

      const res = await request(app)
        .put('/api/v1/users/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(res.status).to.equal(404);
      expect(res.body.message).to.include('No user with the id: 99999 found');
    });

    it('should handle empty update data', async () => {
      const userId = testUserId || 1;
      
      const res = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(res.status).to.equal(409);
    });
  });

  describe('DELETE /users/:id - Delete User', () => {
    it('should return 404 when deleting non-existent user', async () => {
      const res = await request(app)
        .delete('/api/v1/users/99999')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.body.message).to.equal('No user with the id: 99999 found');
    });

    // Note: Actual deletion test commented out to avoid deleting real data
    // Uncomment and adjust if you want to test actual deletion
    
    it('should delete a user successfully', async () => {
      if (testUserId) {
        const res = await request(app)
          .delete(`/api/v1/users/${testUserId}`)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.body.message).to.equal(`User with the id: ${testUserId} successfully deleted`);
      }
    });
    
  });

  describe('Error Handling', () => {
    it('should deny requests without authentication token', async () => {
      const res = await request(app)
        .get('/api/v1/users');

      expect(res.body.message).to.equal('No token provided');
    });

    it('should deny requests with invalid token', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', 'Bearer invalid-token');

      expect(res.body.message).to.equal('Invalid token');
    });
  });
});
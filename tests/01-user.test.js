import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js'; 

describe('User API Basic CRUD Tests', () => {
  let adminAuthToken;
  let normalAuthToken;
  let superAuthToken
  let testUserId;

  // Get authentication token before running tests
  before(async () => {
    const loginResponse = await request(app)
      .post("/api/v1/auth/login") 
      .send({
        "username": 'jasonDoe',
        "password": 'password202'
      });

    expect(loginResponse.status).to.equal(200);
    adminAuthToken = loginResponse.body.token;
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
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send(newUser);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('User successfully created');
      
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
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send(invalidUser);

      expect(res.status).to.equal(409);
      expect(res.body.message).to.exist;
    });
  });

  describe('GET /api/v1/users - Get All Users', () => {
    it('should return all users', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(res.body.message).to.equal('Users located');
  
    });

    it('should handle query parameters', async () => {
      const res = await request(app)
        .get('/api/v1/users?username=jasonDoe')
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect (res.body.message).to.equal('Users located');
      expect (res.body.data[0].username).to.equal('jasonDoe');
    });

    it('should sort users by username', async () =>{
      const res = await request(app)
      .get('/api/v1/users?sortBy=username&sortOrder=asc')
      .set('Authorization', `Bearer ${adminAuthToken}`);
      expect (res.body.message).to.equal('Users located');
      expect (res.body.data[0].username).to.equal('alice_williams');
    });

  });

  describe('GET /api/v1/users/:id - Get User by ID', () => {
    it('should return a specific user by ID', async () => {
      const userId = testUserId 

      const res = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(res.status).to.equal(200);
      expect(res.body.data.id).to.equal(userId);
    });

    it('should return 404 for non-existent user', async () => {
      const res = await request(app)
        .get('/api/v1/users/99999')
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(res.body.message).to.equal('No user with the id: 99999 found');
    });

    //it('should return 429 Too Many Requests after 20 requests within 2 minutes', async () => {
      //const maxRequests = 10;
      //const userId = testUserId 
//
      //for (let i = 0; i < maxRequests; i++) {
        //const res = await request(app)
          //.get(`/api/v1/users/${userId}`)
          //.set('Authorization', `Bearer ${adminAuthToken}`);
      //}
//    
      //// The 21st request should be blocked by rate limiter
      //const res = await request(app)
        //.get(`/api/v1/users/${userId}`)
        //.set('Authorization', `Bearer ${adminAuthToken}`);
    //console.log(res.body);
      //expect(res.body.message).to.equal('Too many requests, please try again later.');
    //});
  });

  describe('PUT /api/v1/users/:id - Update User', () => {
    it('should update a user successfully', async () => {
      const userId = testUserId 
      const updateData = {
        username: 'updatedusername',
        email: 'updated@example.com'
      };

      const res = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send(updateData);

      expect(res.body.message).to.include(`User with the id: ${userId} successfully updated`);
    });

    it('should return 404 when updating non-existent user', async () => {
      const updateData = {
        username: 'nonexistent'
      };

      const res = await request(app)
        .put('/api/v1/users/99999')
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send(updateData);

      expect(res.status).to.equal(404);
      expect(res.body.message).to.include('No user with the id: 99999 found');
    });

    it('should handle empty update data', async () => {
      const userId = testUserId || 1;
      
      const res = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${adminAuthToken}`)
        .send({});

      expect(res.status).to.equal(409);
    });
  });

  describe('DELETE /users/:id - Delete User', () => {
    it('should return 404 when deleting non-existent user', async () => {
      const res = await request(app)
        .delete('/api/v1/users/99999')
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(res.body.message).to.equal('No user with the id: 99999 found');
    });
    
    it('should delete a user successfully', async () => {
      if (testUserId) {
        const res = await request(app)
          .delete(`/api/v1/users/${testUserId}`)
          .set('Authorization', `Bearer ${adminAuthToken}`);

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

      expect(res.body.message).to.equal('Not authorized to access this route');
    });
  });
});
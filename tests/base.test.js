import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

export function runCrudTests({
  modelName,
  basePath,
  createData,
  updateData
}) {
  describe(`${modelName} API Role-Based CRUD Tests`, () => {
    let adminToken, superToken, normalToken;
    let createdId;

    before(async () => {
      const adminLogin = await request(app).post('/api/v1/auth/login').send({
        username: 'jasonDoe',
        password: 'password202',
      });
      adminToken = adminLogin.body.token;

      const superLogin = await request(app).post('/api/v1/auth/login').send({
        username: 'superadmin_user1',
        password: 'password123',
      });
      superToken = superLogin.body.token;

      const normalLogin = await request(app).post('/api/v1/auth/login').send({
        username: 'john_doe',
        password: 'password123',
      });
      normalToken = normalLogin.body.token;
    });

    describe('POST - Create', () => {
      it('should allow ADMIN to create', async () => {
        const res = await request(app)
          .post(basePath)
          .set('Authorization', `Bearer ${adminToken}`)
          .send(createData);
        expect(res.status).to.equal(201);
        createdId = res.body.data.id || res.body.data[0]?.id;
      });

      it('should allow SUPER_ADMIN to create', async () => {
        const res = await request(app)
          .post(basePath)
          .set('Authorization', `Bearer ${superToken}`)
          .send(createData);
        expect(res.status).to.equal(201);
      });

      it('should not allow NORMAL user to create', async () => {
        const res = await request(app)
          .post(basePath)
          .set('Authorization', `Bearer ${normalToken}`)
          .send(createData);
        expect(res.status).to.equal(403);
      });

  
    });

    describe('GET - Read', () => {
      it('should allow NORMAL to get all', async () => {
        const res = await request(app)
          .get(basePath)
          .set('Authorization', `Bearer ${normalToken}`);
        expect(res.status).to.equal(200);
      });

      it('should allow NORMAL to get by ID', async () => {
        const res = await request(app)
          .get(`${basePath}/${createdId}`)
          .set('Authorization', `Bearer ${normalToken}`);
        expect(res.status).to.equal(200);
      });
    });

    describe('PUT - Update', () => {
      it('should allow ADMIN to update', async () => {
        const res = await request(app)
          .put(`${basePath}/${createdId}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send(updateData);
        expect(res.status).to.equal(200);
      });

      it('should not allow NORMAL to update', async () => {
        const res = await request(app)
          .put(`${basePath}/${createdId}`)
          .set('Authorization', `Bearer ${normalToken}`)
          .send(updateData);
        expect(res.status).to.equal(403);
      });
    });

    describe('DELETE - Remove', () => {
      it('should allow SUPER_ADMIN to delete', async () => {
        const res = await request(app)
          .delete(`${basePath}/${createdId}`)
          .set('Authorization', `Bearer ${superToken}`);
        expect(res.status).to.equal(200);
      });

      it('should not allow NORMAL to delete', async () => {
        const res = await request(app)
          .delete(`${basePath}/${createdId}`)
          .set('Authorization', `Bearer ${normalToken}`);
        expect(res.status).to.equal(403);
      });
    });

    describe('Pagination', () => {
      it('should return paginated results', async () => {
        const res = await request(app)
          .get(`${basePath}?amount=2`)
          .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.be.at.most(2);
      });
    });
  });
}

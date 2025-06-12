import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

export function runCrudTests({
  modelName,
  basePath,
  createData,
  updateData,
  filterField,
  filterValue,
  sortField
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
        console.log("data", res.body);
        await request(app)
          .delete(`${basePath}/${createdId}`)
          .set('Authorization', `Bearer ${adminToken}`);
      });



      it('should allow SUPER_ADMIN to create', async () => {
        const res = await request(app)
          .post(basePath)
          .set('Authorization', `Bearer ${superToken}`)
          .send(createData);
        expect(res.status).to.equal(201);
        createdId = res.body.data.id || res.body.data[1]?.id;

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

      if (filterField && filterValue !== undefined) {
        it(`should filter by ${filterField}`, async () => {
          const res = await request(app)
            .get(`${basePath}?${filterField}=${filterValue}`)
            .set('Authorization', `Bearer ${adminToken}`);

          expect(res.status).to.equal(200);
          for (const item of res.body.data) {
            expect(item[filterField]).to.contain(filterValue);
          }
        });
      }

      if (sortField) {
        it(`should sort by chosen ${sortField} in ascending}`, async () => {
          const res = await request(app)
            .get(`${basePath}?sortBy=${sortField}`)
            .set('Authorization', `Bearer ${adminToken}`);

          expect(res.status).to.equal(200);
          const data = res.body.data;

          const values = data.map(item => item[sortField]);
          const sorted = [...values].sort();

          expect(values).to.deep.equal(sorted);
        });

        it(`should sort by ${sortField} descending`, async () => {
          const res = await request(app)
            .get(`${basePath}?sortBy=${sortField}&sortOrder=desc`)
            .set('Authorization', `Bearer ${adminToken}`);

          expect(res.status).to.equal(200);
          const data = res.body.data;

          const values = data.map(item => item[sortField]);
          const sorted = typeof values[0] === 'number'
            ? [...values].sort((a, b) => b - a)  // descending for numbers
            : [...values].sort().reverse();      // descending for strings

          expect(values).to.deep.equal(sorted);
        });
      }

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

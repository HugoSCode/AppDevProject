import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

describe('Rate Limit (from app.js)', () => {
    let adminToken;

    before(async () => {
        const adminLogin = await request(app).post('/api/v1/auth/login').send({
            username: 'jasonDoe',
            password: 'password202',
        });
        adminToken = adminLogin.body.token;
    });

    it('should block after 20 GETs to /api/v1/teams', async () => {
        for (let i = 0; i < 20; i++) {
            const res = await request(app)
                .get('/api/v1/teams')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.status).to.equal(200); 
        }

        const blocked = await request(app)
        .get('/api/v1/teams')
        .set('Authorization', `Bearer ${adminToken}`);
        expect(blocked.text).to.include('You have exceeded the number of requests: 20. Please try again in 2 minutes.');
    });

    it('should block after 10 POSTs to /api/v1/players', async () => {
        const team = {
            name: "Lionel Messi",
            age: 36,
            nationality: "Argentina",
            position: "FORWARD"
        };

        for (let i = 0; i < 10; i++) {
            const res = await request(app).post('/api/v1/players')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(team);
            expect(res.status).to.equal(201); 
        }

        const blocked = await request(app)
        .post('/api/v1/players')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(team);
        expect(blocked.text).to.equal("You have exceeded the number of requests: 10. Please try again in 1 minute.");
    });
});

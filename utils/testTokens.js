import request from 'supertest';
import app from '../app.js'; 

export async function setupTest() {
  const adminLogin = await request(app).post('/api/v1/auth/login').send({
    username: 'jasonDoe',
    password: 'password202',
  });
  const adminToken = adminLogin.body.token;

  const superLogin = await request(app).post('/api/v1/auth/login').send({
    username: 'superDoe',
    password: 'password202',
  });
  const superToken = superLogin.body.token;

  const normalLogin = await request(app).post('/api/v1/auth/login').send({
    username: 'normalDoe',
    password: 'password202',
  });
  const normalToken = normalLogin.body.token;

  const leagueRes = await request(app)
    .post('/api/v1/leagues')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      name: 'Test League',
      country: 'Testland',
    });

  const leagueId = leagueRes.body.data?.id;

  return {
    adminToken,
    superToken,
    normalToken,
    leagueId,
  };
}

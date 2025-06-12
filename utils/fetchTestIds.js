import request from 'supertest';
import app from '../app.js';

let leagueId, matchId, playerId, teamId1, teamId2;

async function fetchTestIds() {
  const login = await request(app).post('/api/v1/auth/login').send({
    username: 'jasonDoe',
    password: 'password202',
  });

  const token = login.body.token;

  const leagues = await request(app).get('/api/v1/leagues').set('Authorization', `Bearer ${token}`);
  const matches = await request(app).get('/api/v1/matches').set('Authorization', `Bearer ${token}`);
  const players = await request(app).get('/api/v1/players').set('Authorization', `Bearer ${token}`);
  const teams = await request(app).get('/api/v1/teams').set('Authorization', `Bearer ${token}`);

  leagueId = leagues.body.data[0]?.id;
  matchId = matches.body.data[0]?.id;
  playerId = players.body.data[0]?.id;
  teamId1 = teams.body.data[0]?.id;
  teamId2 = teams.body.data[1]?.id;
}

await fetchTestIds();

export { leagueId, matchId, playerId, teamId1, teamId2 };

import prisma from '../prisma/client.js';

const seedMatches = async () => {
  try {
    await prisma.match.deleteMany();

    const teams = await prisma.team.findMany();
    const leagues = await prisma.league.findMany();

    const teamMap = {};
    teams.forEach(team => {
      teamMap[team.name] = team.id;
    });

    const leagueMap = {};
    leagues.forEach(league => {
      leagueMap[league.name] = league.id;
    });

    const matchesData = [
      {
        date: new Date('2024-05-01T15:00:00Z'),
        stadium: 'Old Trafford',
        homeTeamId: teamMap['Manchester United'],
        awayTeamId: teamMap['Liverpool'],
        leagueId: leagueMap['Premier League'] || null,
      },
      {
        date: new Date('2024-05-02T17:30:00Z'),
        stadium: 'Etihad Stadium',
        homeTeamId: teamMap['Manchester City'],
        awayTeamId: teamMap['Chelsea'],
        leagueId: leagueMap['Premier League'] || null,
      },
      {
        date: new Date('2024-05-03T16:00:00Z'),
        stadium: 'Emirates Stadium',
        homeTeamId: teamMap['Arsenal'],
        awayTeamId: teamMap['Tottenham Hotspur'],
        leagueId: leagueMap['Premier League'] || null,
      }
    ];

    await prisma.match.createMany({
      data: matchesData,
      skipDuplicates: true,
    });

    console.log('Matches successfully seeded');
  } catch (err) {
    console.error('Seeding matches failed:', err.message);
  }
};

seedMatches();

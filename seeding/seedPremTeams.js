import prisma from '../prisma/client.js';

const seedTeams = async () => {
  try {
    await prisma.team.deleteMany();

    const premierLeague = await prisma.league.findFirst({
      where: { name: "Premier League" },
    });

    if (!premierLeague) {
      throw new Error('Premier League not found. Please seed leagues first.');
    }

    const teamsData = [
      {
        name: "Manchester United",
        coach: "Erik ten Hag",
        stadium: "Old Trafford",
        leagueId: premierLeague.id,
      },
      {
        name: "Liverpool",
        coach: "Jürgen Klopp",
        stadium: "Anfield",
        leagueId: premierLeague.id,
      },
      {
        name: "Manchester City",
        coach: "Pep Guardiola",
        stadium: "Etihad Stadium",
        leagueId: premierLeague.id,
      },
      {
        name: "Chelsea",
        coach: "Mauricio Pochettino",
        stadium: "Stamford Bridge",
        leagueId: premierLeague.id,
      },
      {
        name: "Arsenal",
        coach: "Mikel Arteta",
        stadium: "Emirates Stadium",
        leagueId: premierLeague.id,
      },
      {
        name: "Tottenham Hotspur",
        coach: "Nuno Espírito Santo",
        stadium: "Tottenham Hotspur Stadium",
        leagueId: premierLeague.id,
      },
      {
        name: "Leicester City",
        coach: "Brendan Rodgers",
        stadium: "King Power Stadium",
        leagueId: premierLeague.id,
      },
      {
        name: "West Ham United",
        coach: "David Moyes",
        stadium: "London Stadium",
        leagueId: premierLeague.id,
      },
      {
        name: "Everton",
        coach: "Sean Dyche",
        stadium: "Goodison Park",
        leagueId: premierLeague.id,
      },
      {
        name: "Aston Villa",
        coach: "Unai Emery",
        stadium: "Villa Park",
        leagueId: premierLeague.id,
      },
    ];

    await prisma.team.createMany({
      data: teamsData,
      skipDuplicates: true,
    });

    console.log('Premier League teams successfully seeded');
  } catch (err) {
    console.error('Seeding teams failed:', err.message);
  }
};

seedTeams();


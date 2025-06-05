import prisma from '../prisma/client.js';

const seedTeams = async () => {
  try {
    // Delete existing teams
    await prisma.team.deleteMany();

    const teamsData = [
      {
        name: "Manchester United",
        coach: "Erik ten Hag",
        stadium: "Old Trafford"
      },
      {
        name: "Liverpool",
        coach: "Jürgen Klopp",
        stadium: "Anfield"
      },
      {
        name: "Manchester City",
        coach: "Pep Guardiola",
        stadium: "Etihad Stadium"
      },
      {
        name: "Chelsea",
        coach: "Mauricio Pochettino",
        stadium: "Stamford Bridge"
      },
      {
        name: "Arsenal",
        coach: "Mikel Arteta",
        stadium: "Emirates Stadium"
      },
      {
        name: "Tottenham Hotspur",
        coach: "Nuno Espírito Santo",
        stadium: "Tottenham Hotspur Stadium"
      },
      {
        name: "Leicester City",
        coach: "Brendan Rodgers",
        stadium: "King Power Stadium"
      },
      {
        name: "West Ham United",
        coach: "David Moyes",
        stadium: "London Stadium"
      },
      {
        name: "Everton",
        coach: "Sean Dyche",
        stadium: "Goodison Park"
      },
      {
        name: "Aston Villa",
        coach: "Unai Emery",
        stadium: "Villa Park"
      }
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

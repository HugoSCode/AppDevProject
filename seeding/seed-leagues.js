import prisma from '../prisma/client.js';

const seedLeagues = async () => {
  try {
    await prisma.league.deleteMany();

    const leaguesData = [
      {
        name: "Premier League",
        country: "England",
      },
      {
        name: "La Liga",
        country: "Spain",
      },
      {
        name: "Bundesliga",
        country: "Germany",
      },
      {
        name: "Serie A",
        country: "Italy",
      },
      {
        name: "Ligue 1",
        country: "France",
      },
    ];

    await prisma.league.createMany({
      data: leaguesData,
      skipDuplicates: true,
    });

    console.log('Leagues successfully seeded');
  } catch (err) {
    console.error('Seeding leagues failed:', err.message);
  }
};

seedLeagues();

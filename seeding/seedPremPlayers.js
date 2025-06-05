import prisma from '../prisma/client.js';

const seedPlayers = async () => {
  try {
    // Delete existing players
    await prisma.player.deleteMany();

    // Get all teams
    const teams = await prisma.team.findMany();
    const teamMap = {};
    teams.forEach(team => {
      teamMap[team.name] = team.id;
    });

    const playersData = [
      {
        name: "Marcus Rashford",
        age: 26,
        nationality: "England",
        position: "FORWARD",
        teamId: teamMap["Manchester United"]
      },
      {
        name: "Mohamed Salah",
        age: 31,
        nationality: "Egypt",
        position: "FORWARD",
        teamId: teamMap["Liverpool"]
      },
      {
        name: "Erling Haaland",
        age: 24,
        nationality: "Norway",
        position: "FORWARD",
        teamId: teamMap["Manchester City"]
      },
      {
        name: "Bukayo Saka",
        age: 23,
        nationality: "England",
        position: "MIDFIELDER",
        teamId: teamMap["Arsenal"]
      },
      {
        name: "Enzo Fernández",
        age: 23,
        nationality: "Argentina",
        position: "MIDFIELDER",
        teamId: teamMap["Chelsea"]
      },
      {
        name: "James Maddison",
        age: 27,
        nationality: "England",
        position: "MIDFIELDER",
        teamId: teamMap["Tottenham Hotspur"]
      },
      {
        name: "Youri Tielemans",
        age: 26,
        nationality: "Belgium",
        position: "MIDFIELDER",
        teamId: teamMap["Leicester City"]
      },
      {
        name: "Jarrod Bowen",
        age: 27,
        nationality: "England",
        position: "FORWARD",
        teamId: teamMap["West Ham United"]
      },
      {
        name: "Jordan Pickford",
        age: 30,
        nationality: "England",
        position: "GOALKEEPER",
        teamId: teamMap["Everton"]
      },
      {
        name: "Ollie Watkins",
        age: 28,
        nationality: "England",
        position: "FORWARD",
        teamId: teamMap["Aston Villa"]
      }
    ];

    await prisma.player.createMany({
      data: playersData,
      skipDuplicates: true
    });

    console.log('Premier League players successfully seeded');
  } catch (err) {
    console.error('Seeding players failed:', err.message);
  }
};

seedPlayers();

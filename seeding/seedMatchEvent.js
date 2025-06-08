import prisma from '../prisma/client.js';

const seedMatchEvents = async () => {
  try {
    await prisma.matchEvent.deleteMany();

    const matches = await prisma.match.findMany();
    const players = await prisma.player.findMany();

    if (matches.length === 0 || players.length === 0) {
      throw new Error("Make sure matches and players are seeded first");
    }

    const eventsData = [
      {
        type: "GOAL",
        minute: 10,
        matchId: matches[0].id,
        playerId: players.find(p => p.name === "Marcus Rashford")?.id,
        details: "Powerful shot from the left side"
      },
      {
        type: "GOAL",
        minute: 22,
        matchId: matches[0].id,
        playerId: players.find(p => p.name === "Mohamed Salah")?.id,
        details: "Fast break and finish"
      },
      {
        type: "YELLOW_CARD",
        minute: 35,
        matchId: matches[0].id,
        playerId: players.find(p => p.name === "Enzo Fernández")?.id,
        details: "Late challenge"
      },
      {
        type: "SUBSTITUTION",
        minute: 60,
        matchId: matches[0].id,
        playerId: players.find(p => p.name === "James Maddison")?.id,
        details: "Tactical substitution"
      },
      {
        type: "RED_CARD",
        minute: 75,
        matchId: matches[0].id,
        playerId: players.find(p => p.name === "Jarrod Bowen")?.id,
        details: "Dangerous foul"
      }
    ];

    await prisma.matchEvent.createMany({
      data: eventsData.filter(e => e.playerId), 
      skipDuplicates: true
    });

    console.log("Match events successfully seeded");
  } catch (err) {
    console.error("Seeding match events failed:", err.message);
  }
};

seedMatchEvents();




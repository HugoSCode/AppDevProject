import prisma from "../prisma/client.js";

class PlayerStatisticsRepository {
  async create(data) {
    return await prisma.playerStatistics.create({
      data: {
        player: { connect: { id: data.playerId } },
        match: { connect: { id: data.matchId } },
        goals: data.goals,
        assists: data.assists,
        tackles: data.tackles,
        passes: data.passes,
        saves: data.saves,
      },
    });
  }

async findAll(filters = {}, options = {}) {
  const {
    take = 25,
    skip = 0,
    orderBy = { id: 'asc' }
  } = options;

  const query = {
    take,
    skip,
    orderBy,
    include: {
      player: true,
      match: true,
    },
    where: {},
  };

  for (const [key, value] of Object.entries(filters)) {
    if (!value) continue;

    switch (key) {
      case 'goals':
      case 'assists':
      case 'passes':
      case 'tackles':
      case 'saves':
        query.where[key] = { equals: Number(value) };
        break;

      case 'playerId':
        query.where.playerId =value;
        break;

      case 'matchId':
        query.where.matchId = value;
        break;
    }
  }

  return await prisma.playerStatistics.findMany(query);
}



  async findById(id) {
    return await prisma.playerStatistics.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.playerStatistics.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.playerStatistics.delete({
      where: { id },
    });
  }
}

export default new PlayerStatisticsRepository();
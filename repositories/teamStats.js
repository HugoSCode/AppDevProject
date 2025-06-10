// src/repositories/teamStatsRepository.js
import prisma from "../prisma/client.js";

class TeamStatsRepository {
  async create(data) {
    return await prisma.teamStats.create({
      data: {
        team: { connect: { id: data.teamId } },
        league: { connect: { id: data.leagueId } },
        wins: data.wins,
        losses: data.losses,
        draws: data.draws,
        points: data.points,
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
      team: true,
      league: true,
    },
    where: {},
  };

  for (const [key, value] of Object.entries(filters)) {
    if (!value) continue;

    switch (key) {
      case 'wins':
      case 'draws':
      case 'losses':
      case 'points':
        query.where[key] = { equals: Number(value) };
        break;

      case 'team':
        query.where.team = {
          name: { contains: value, mode: 'insensitive' },
        };
        break;

      case 'league':
        query.where.league = {
          name: { contains: value, mode: 'insensitive' },
        };
        break;
    }
  }

  return await prisma.teamStats.findMany(query);
}



  async findById(id) {
    return await prisma.teamStats.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.teamStats.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.teamStats.delete({
      where: { id },
    });
  }
}

export default new TeamStatsRepository();
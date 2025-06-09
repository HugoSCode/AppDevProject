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

  async findAll(filters = {}, sortBy = "id", sortOrder = "asc") {
    const query = {
      orderBy: {
        [sortBy]: sortOrder,
      }
    };

    if (Object.keys(filters).length > 0) {
      query.where = {};
      // Loop through the filters and apply them dynamically
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          query.where[key] = { contains: value };
        }
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
// src/repositories/teamRepository.js
import prisma from "../prisma/client.js";

class TeamRepository {
  // Create a new team with connected players
  async create(data) {
    return await prisma.team.create({
      data: {
        name: data.name,
        coach: data.coach,
        stadium: data.stadium,
        players: {
          connect: data.playerIds?.map(id => ({ id })),
        },
        league: { connect: { id: data.leagueId } },
      },
    });
  }

  async findAll(filters = {}, options = {}) {
    const {
      take = 25,
      skip = 0,
      orderBy= {id: 'asc'}
    } = options;

    const query = {
      take,
      skip,
      orderBy,
    };


    if (Object.keys(filters).length > 0) {
      query.where = {};
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          query.where[key] = { contains: value };
        }
      }
    }

    return await prisma.team.findMany(query);
  }

  async findById(id) {
    return await prisma.team.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.team.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.team.delete({
      where: { id },
    });
  }
}

export default new TeamRepository();

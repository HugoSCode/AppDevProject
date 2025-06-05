import prisma from "../prisma/client.js";

class LeagueRepository {
  async create(data) {
    return await prisma.league.create({
      data: {
        name: data.name,
        country: data.country,
      },
    });
  }

  async findAll(filters = {}, sortBy = "name", sortOrder = "asc") {
    const query = {
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        matches: true,
        standings: true,
      },
    };

    if (Object.keys(filters).length > 0) {
      query.where = {};
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          query.where[key] = { contains: value, mode: 'insensitive' };
        }
      }
    }

    return await prisma.league.findMany(query);
  }

  async findById(id) {
    return await prisma.league.findUnique({
      where: { id },
      include: {
        matches: true,
        standings: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.league.update({
      where: { id },
      data: {
        name: data.name,
        country: data.country,
      },
    });
  }

  async delete(id) {
    return await prisma.league.delete({
      where: { id },
    });
  }
}

export default new LeagueRepository();


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
      data,
    });
  }

  async delete(id) {
    return await prisma.league.delete({
      where: { id },
    });
  }
}

export default new LeagueRepository();


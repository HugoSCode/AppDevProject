import prisma from "../prisma/client.js";

class MatchRepository {
  async create(data) {
    return await prisma.match.create({
      data: {
        date: new Date(data.date),
        stadium: data.stadium,
        homeTeam: { connect: { id: data.homeTeamId } },
        awayTeam: { connect: { id: data.awayTeamId } },
        league: data.leagueId ? { connect: { id: data.leagueId } } : undefined,
      },
    });
  }

  async findAll(filters = {}, sortBy = "id", sortOrder = "asc") {
    const query = {
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
    };

    if (Object.keys(filters).length > 0) {
      query.where = {};
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          query.where[key] = { contains: value };
        }
      }
    }

    return await prisma.match.findMany(query);
  }

  async findById(id) {
    return await prisma.match.findUnique({
      where: { id },
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
        events: true,
        stats: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.match.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.match.delete({
      where: { id },
    });
  }
}

export default new MatchRepository();

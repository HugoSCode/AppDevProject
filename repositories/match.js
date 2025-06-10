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

  async findAll(filters = {}, options = {}) {
    const {
      take = 25,
      skip = 0,
      orderBy = { id: 'asc' },
    } = options;

    const query = {
      take,
      skip,
      orderBy,
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
      where: {},
    };

    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        if (key === 'stadium') {
          query.where.stadium = { contains: value };
        } else if (key === 'date') {
          query.where.date = { equals: new Date(value) };
        }
        else if (key === 'homeTeam') {
          query.where.homeTeam = {
            name: {
              contains: value,
            },
          };
        } else if (key === 'awayTeam') {
          query.where.awayTeam = {
            name: {
              contains: value,
            },
          };
        } else if (key === 'league') {
          query.where.league = {
            name: {
              contains: value,
            },
          };
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

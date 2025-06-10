import prisma from "../prisma/client.js";

class MatchEventRepository {
  async create(data) {
    return await prisma.matchEvent.create({
      data: {
        type: data.type,
        minute: data.minute,
        details: data.details || null,
        match: { connect: { id: data.matchId } },
        player: data.playerId ? { connect: { id: data.playerId } } : undefined,
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
      match: true,
      player: true,
    }
  };

  if (Object.keys(filters).length > 0) {
    query.where = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'type') {
          query.where.type = { contains: value };
        } else if (key === 'minute') {
          query.where.minute = { equals: Number(value) };
        } else if (key === 'matchId') {
          query.where.matchId = { equals: value };
        }
      }
    }
  }

  return await prisma.matchEvent.findMany(query);
}


  async findById(id) {
    return await prisma.matchEvent.findUnique({
      where: { id },
      include: {
        match: true,
        player: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.matchEvent.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.matchEvent.delete({
      where: { id },
    });
  }
}

export default new MatchEventRepository();

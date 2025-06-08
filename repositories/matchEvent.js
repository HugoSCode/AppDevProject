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

  async findAll(filters = {}, sortBy = "minute", sortOrder = "asc") {
    const query = {
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        match: true,
        player: true,
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
      data: {
        type: data.type,
        minute: data.minute,
        details: data.details,
        match: data.matchId ? { connect: { id: data.matchId } } : undefined,
        player: data.playerId ? { connect: { id: data.playerId } } : { disconnect: true },
      },
    });
  }

  async delete(id) {
    return await prisma.matchEvent.delete({
      where: { id },
    });
  }
}

export default new MatchEventRepository();

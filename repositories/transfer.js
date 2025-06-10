import prisma from "../prisma/client.js";

class TransferRepository {
  async create(data) {
    return await prisma.transfer.create({
      data: {
        playerId: data.playerId,
        fromTeamId: data.fromTeamId,
        toTeamId: data.toTeamId,
        fee: data.fee,
        date: data.date,
        transferType: data.transferType,
      },
    });
  }

  async findAll(filters = {}, options = {}) {
    const {
      take = 25,
      skip = 0,
      orderBy = { date: "desc" },
    } = options;

    const query = {
      take,
      skip,
      orderBy,
      include: {
        player: true,
        fromTeam: true,
        toTeam: true,
      },
    };

    if (Object.keys(filters).length > 0) {
      query.where = {};
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          if (["fee"].includes(key)) {
            query.where[key] = { equals: Number(value) };
          } else if (["transferType"].includes(key)) {
            query.where[key] = { equals: value };
          } else {
            query.where[key] = { contains: value, mode: "insensitive" };
          }
        }
      }
    }

    return await prisma.transfer.findMany(query);
  }

  async findById(id) {
    return await prisma.transfer.findUnique({
      where: { id },
      include: {
        player: true,
        fromTeam: true,
        toTeam: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.transfer.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.transfer.delete({
      where: { id },
    });
  }
}

export default new TransferRepository();

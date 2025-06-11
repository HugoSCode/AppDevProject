import prisma from "../prisma/client.js";

class TransferRepository {
  async create(data) {
    const parsedDate = new Date(data.date);
    return await prisma.transfer.create({
      data: {
        playerId: data.playerId,
        fromTeamId: data.fromTeamId,
        toTeamId: data.toTeamId,
        fee: data.fee,
        date: parsedDate,
        transferType: data.transferType,
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
      player: true,
      fromTeam: true,
      toTeam: true,
    },
    where: {},
  };

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      if (key === 'fee') {
        query.where.fee = { equals: Number(value) };
      } else if (key === 'transferType') {
        query.where.transferType = { equals: value };
      } else if (key === 'date') {
        query.where.date = { equals: new Date(value) };
      } else if (key === 'player') {
        query.where.player = {
          name: {
            contains: value,
          },
        };
      } else if (key === 'fromTeamId') {
        query.where.fromTeamId = { equals: value };
      } else if (key === 'toTeamId') {
        query.where.toTeamId = { equals: value };
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

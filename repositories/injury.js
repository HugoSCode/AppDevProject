import prisma from "../prisma/client.js";
import { parse } from "date-fns";

class InjuryRepository {
  async create(data) {
    const parsedDate = new Date(data.date);
    return await prisma.injury.create({
      data: {
        player: { connect: { id: data.playerId } },
        description: data.description,
        date: parsedDate,
        duration: data.duration,
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
      player: true,
    },
    where: {},
  };

  for (const [key, value] of Object.entries(filters)) {
    if (!value) continue;

    switch (key) {
      case 'duration':
        query.where[key] = { equals: Number(value) };
        break;
    
    case 'date': 
      query.where.date= { equals: new Date(value) };
        break;
      case 'playerId':
        query.where.playerId = value;
        break;

      case 'description':
        query.where.description = value;
        break;
      
    }
  }

  return await prisma.injury.findMany(query);
}



  async findById(id) {
    return await prisma.injury.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.injury.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.injury.delete({
      where: { id },
    });
  }
}

export default new InjuryRepository();
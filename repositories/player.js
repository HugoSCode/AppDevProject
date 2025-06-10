import prisma from "../prisma/client.js";

class PlayerRepository {
  async create(data) {
    return await prisma.player.create({ data });
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
      include:{
        team: true,
      }
    };


    if (Object.keys(filters).length > 0) {
      query.where = {};
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          if (key === 'name' || key === 'nationality') {
            query.where[key] = { contains: value };
          } else if (key === 'age') {
            query.where.age = { equals: Number(value) };
          } else if (key === 'position') {
            query.where[key] = { equals: value };
          } else if (key === 'team') {
            query.where.team = {
              name: {
                contains: value
              }

            };
          }
        }
      }
    }

    return await prisma.player.findMany(query);
  }


  async findById(id) {
    return await prisma.player.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.player.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.player.delete({
      where: { id: id },
    });
  }
}

export default new PlayerRepository();

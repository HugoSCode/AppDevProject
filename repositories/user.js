import prisma from "../prisma/client.js";

class UserRepository {
  async create(data) {
    return await prisma.user.create({ data });
  }

  async findAll(filters = {}, sortBy="id", sortOrder="asc") {
    // Create an empty query object
    const query = {
      orderBy: {
        [sortBy]: sortOrder,
      }
    };

    if (Object.keys(filters).length > 0) {
      query.where = {};
      // Loop through the filters and apply them dynamically
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          query.where[key] = { contains: value };
        }
      }
    }

    return await prisma.user.findMany(query);
}

  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserRepository();
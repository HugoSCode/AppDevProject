import prisma from "../prisma/client.js";

class UserRepository {
  async create(data) {
    return await prisma.user.create({ data });
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
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'email' || key === 'username') {
            query.where[key] = { contains: value };
          } else if (key === 'enabled') {
            const boolValue = value === 'true' || value === true; //converts enabled value back to an actual boolean
            query.where[key] = { equals: boolValue };
          } else if (key === 'role') {
            query.where[key] = { equals: value };
          }
        }
      }
    } else {
      query.where = undefined;
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
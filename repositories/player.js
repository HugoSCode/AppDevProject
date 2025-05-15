// src/repositories/playerRepository.js
import prisma from "../prisma/client.js";

class PlayerRepository {
  // Create a new player
  async create(data) {
    return await prisma.player.create({ data });
  }

  // Get all players
  async findAll(filters = {}, sortBy = "id", sortOrder = "asc") {
    // Create an empty query object
    const query = {
      orderBy: {
        [sortBy]: sortOrder,
      },
    };
  
    if (Object.keys(filters).length > 0) {
      query.where = {};
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          if (key === 'name' || key === 'nationality') {
            query.where[key] = { contains: value };
          }
          else if (key === 'age') {
            query.where.age = { equals: Number(value) }; 
          }
          else if (key === 'position') {
            query.where[key] = { equals: value };
          }
        }
      }
    }
  
    return await prisma.player.findMany(query);
  }
  

  // Get a single player by ID
  async findById(id) {
    return await prisma.player.findUnique({
      where: { id},
    });
  }

  // Update a player by ID
  async update(id, data) {
    return await prisma.player.update({
      where: { id},
      data,
    });
  }

  // Delete a player by ID
  async delete(id) {
    return await prisma.player.delete({
      where: { id: id},
    });
  }
}

export default new PlayerRepository();

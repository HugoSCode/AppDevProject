// src/repositories/playerRepository.js
import prisma from "../prisma/client.js";

class PlayerRepository {
  // Create a new player
  async create(data) {
    return await prisma.player.create({ data });
  }

  // Get all players
  async findAll() {
    return await prisma.player.findMany();
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

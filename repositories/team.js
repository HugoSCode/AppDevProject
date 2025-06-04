// src/repositories/teamRepository.js
import prisma from "../prisma/client.js";

class TeamRepository {
  // Create a new team with connected players
  async create(data) {
    return await prisma.team.create({
      data: {
        name: data.name,
        coach: data.coach,
        stadium: data.stadium,
        players: {
          connect: data.playerIds?.map(id => ({ id })),
        },
      },
    });
  }

  // Get all teams
  async findAll(filters = {}, sortBy = "id", sortOrder = "asc") {
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

    return await prisma.team.findMany(query);
  }

  // Get a team by ID
  async findById(id) {
    return await prisma.team.findUnique({
      where: { id },
    });
  }

  // Update a team and its players
  async update(id, data) {
    return await prisma.team.update({
      where: { id },
      data: {
        name: data.name,
        coach: data.coach,
        stadium: data.stadium,
        players: {
          connect: data.playerIds?.map(id => ({ id })),
        },
      },
    });
  }

  // Delete a team
  async delete(id) {
    return await prisma.team.delete({
      where: { id },
    });
  }
}

export default new TeamRepository();

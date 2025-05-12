import prisma from "../../prisma/client.js";
// Add the following code under import prisma from "../prisma/client.js";

/**
 * @description This function creates a new team
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createTeam = async (req, res) => {
  try {
    const newTeam = await prisma.team.create({
      data: {
        name: req.body.name,
        coach: req.body.coach,
        stadium: req.body.stadium,
        players: {
          connect: req.body.playerIds.map(id => ({ id: id }))
        }
      }
    });

    return res.status(201).json({
      message: "Team successfully created",
      data: newTeam,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};



  // Add the following code under the createTeam function
const getTeams = async (req, res) => {
    try {
      const teams = await prisma.team.findMany();
  
      // Check if there are no teams
      if (!teams) {
        return res.status(404).json({ message: "No teams found" });
      }
  
      return res.status(200).json({
        data: teams,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  // Add the following code under the getTeams function
const getTeam = async (req, res) => {
    try {
      const team = await prisma.team.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no team
      if (!team) {
        return res.status(404).json({
          message: `No team with the id: ${req.params.id} found`,
        });
      }
  
      return res.status(200).json({
        data: team,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  // Add the following code under the getTeam function
const updateTeam = async (req, res) => {
    try {
      // Find the team by id
      let team = await prisma.team.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no team
      if (!team) {
        return res.status(404).json({
          message: `No team with the id: ${req.params.id} found`,
        });
      }
  
      // Update the team
      team = await prisma.team.update({
        where: { id: req.params.id },
        data: {
          name: req.body.name,
          coach: req.body.coach,
          stadium: req.body.stadium,
          players: {
            connect: req.body.playerIds.map(id => ({ id }))
          },
        },
      });
  
      return res.status(200).json({
        message: `Team with the id: ${req.params.id} successfully updated`,
        data: team,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  // Add the following code under the updateTeam function
const deleteTeam = async (req, res) => {
    try {
      const team = await prisma.team.findUnique({
        where: { id: req.params.id },
      });
  
      if (!team) {
        return res.status(404).json({
          message: `No team with the id: ${req.params.id} found`,
        });
      }
  
      await prisma.team.delete({
        where: { id: req.params.id },
      });
  
      return res.json({
        message: `Team with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  // Add the following code under the deleteTeam function
export {
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    deleteTeam,
  };
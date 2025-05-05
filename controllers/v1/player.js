import prisma from "../../prisma/client.js";
// Add the following code under import prisma from "../prisma/client.js";

/**
 * @description This function creates a new player
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createPlayer = async (req, res) => {
    // Try/catch blocks are used to handle exceptions
    try {
      // Create a new player
      await prisma.player.create({

        data:{
            name: req.body.name,
            age: req.body.age,
            nationality: req.body.nationality,
            position: req.body.position,
            teamId: req.body.teamId,
        },
      });
  
      // Get all players from the player table
      const newPlayers = await prisma.player.findMany();
  
      // Send a JSON response
      return res.status(201).json({
        message: "Player successfully created",
        data: newPlayers,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };


  // Add the following code under the createPlayer function
const getPlayers = async (req, res) => {
    try {
      const players = await prisma.player.findMany();
  
      // Check if there are no players
      if (!players) {
        return res.status(404).json({ message: "No players found" });
      }
  
      return res.status(200).json({
        data: players,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  // Add the following code under the getPlayers function
const getPlayer = async (req, res) => {
    try {
      const player = await prisma.player.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no player
      if (!player) {
        return res.status(404).json({
          message: `No player with the id: ${req.params.id} found`,
        });
      }
  
      return res.status(200).json({
        data: player,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  // Add the following code under the getPlayer function
const updatePlayer = async (req, res) => {
    try {
      // Find the player by id
      let player = await prisma.player.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no player
      if (!player) {
        return res.status(404).json({
          message: `No player with the id: ${req.params.id} found`,
        });
      }
  
      // Update the player
      player = await prisma.player.update({
        where: { id: req.params.id },
        data: {
          name: req.body.name,
          age: req.body.age,
          nationality: req.body.nationality,
          position: req.body.position,
          teamId: req.body.teamId,
        },
      });
  
      return res.status(200).json({
        message: `Player with the id: ${req.params.id} successfully updated`,
        data: player,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  // Add the following code under the updatePlayer function
const deletePlayer = async (req, res) => {
    try {
      const player = await prisma.player.findUnique({
        where: { id: req.params.id },
      });
  
      if (!player) {
        return res.status(404).json({
          message: `No player with the id: ${req.params.id} found`,
        });
      }
  
      await prisma.player.delete({
        where: { id: req.params.id },
      });
  
      return res.json({
        message: `Player with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  // Add the following code under the deletePlayer function
export {
    createPlayer,
    getPlayers,
    getPlayer,
    updatePlayer,
    deletePlayer,
  };
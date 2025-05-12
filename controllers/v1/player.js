import playerRepository from "../../repositories/player.js";

// Create a player
const createPlayer = async (req, res) => {
  try {
    const newPlayer = await playerRepository.create(req.body);
    return res.status(201).json({
      message: "Player successfully created",
      data: newPlayer,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all players
const getPlayers = async (req, res) => {
  try {
    const players = await playerRepository.findAll();
    if (!players.length) {
      return res.status(404).json({ message: "No players found" });
    }
    return res.status(200).json({ data: players });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get a single player
const getPlayer = async (req, res) => {
  try {
    const player = await playerRepository.findById(req.params.id);
    if (!player) {
      return res.status(404).json({
        message: `No player with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({ data: player });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a player
const updatePlayer = async (req, res) => {
  try {
    const player = await playerRepository.findById(req.params.id);
    if (!player) {
      return res.status(404).json({
        message: `No player with the id: ${req.params.id} found`,
      });
    }

    const updatedPlayer = await playerRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Player with the id: ${req.params.id} successfully updated`,
      data: updatedPlayer,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete a player
const deletePlayer = async (req, res) => {
  try {
    const player = await playerRepository.findById(req.params.id);
    if (!player) {
      return res.status(404).json({
        message: `No player with the id: ${req.params.id} found`,
      });
    }

    await playerRepository.delete(req.params.id);
    return res.json({
      message: `Player with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
};

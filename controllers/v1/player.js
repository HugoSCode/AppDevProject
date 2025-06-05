import playerRepository from "../../repositories/player.js";

const createPlayer = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all players or get players by id"});
    }
    const newPlayer = await playerRepository.create(req.body);
    return res.status(201).json({
      message: "Player successfully created",
      data: newPlayer,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getPlayers = async (req, res) => {
  try {
    const filters = {
      name: req.query.name || undefined,
      age: req.query.age || undefined,
      nationality: req.query.nationality || undefined,
      position: req.query.position || undefined
    };

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const players = await playerRepository.findAll(filters, sortBy, sortOrder);

    if (!players || players.length === 0) {
      return res.status(404).json({ message: "No players found" });
    }

    return res.status(200).json({ data: players });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

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

const updatePlayer = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all players or get players by id"});
    }
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

const deletePlayer = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all players or get players by id"});
    }
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

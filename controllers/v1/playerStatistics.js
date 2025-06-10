import playerStatisticsRepository from "../../repositories/playerStatistics.js";
import { queryOptions } from "../../utils/pagination.js";
const createPlayerStatistics = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all playerStatisticss or get playerStatisticss by id"});
    }
    const newPlayerStatistics = await playerStatisticsRepository.create(req.body);
    return res.status(201).json({
      message: "PlayerStatistics successfully created",
      data: newPlayerStatistics,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllPlayerStatistics = async (req, res) => {
  try {
    const filters = {
      playerId: req.query.playerId || undefined,
      matchId: req.query.stadium || undefined,
      goals: req.query.goals || undefined,
      assists: req.query.assists || undefined,
      tackles: req.query.tackles || undefined,
      saves: req.query.saves || undefined,
    };

    const options =queryOptions(req.query);
    const playerStatistics = await playerStatisticsRepository.findAll(filters, options);

    if (!playerStatistics || playerStatistics.length === 0) {
      return res.status(404).json({ message: "No playerStatistics found" });
    }

    return res.status(200).json({ data: playerStatistics });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const getPlayerStatistics = async (req, res) => {
  try {
    const playerStatistics = await playerStatisticsRepository.findById(req.params.id);
    if (!playerStatistics) {
      return res.status(404).json({
        message: `No playerStatistics with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({ data: playerStatistics });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updatePlayerStatistics = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all playerStatisticss or get playerStatisticss by id"});
    }
    const existingPlayerStatistics = await playerStatisticsRepository.findById(req.params.id);
    if (!existingPlayerStatistics) {
      return res.status(404).json({
        message: `No playerStatistics with the id: ${req.params.id} found`,
      });
    }

    const updatedPlayerStatistics = await playerStatisticsRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `PlayerStatistics with the id: ${req.params.id} successfully updated`,
      data: updatedPlayerStatistics,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deletePlayerStatistics = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all playerStatisticss or get playerStatisticss by id"});
    }
    const playerStatistics = await playerStatisticsRepository.findById(req.params.id);
    if (!playerStatistics) {
      return res.status(404).json({
        message: `No playerStatistics with the id: ${req.params.id} found`,
      });
    }

    await playerStatisticsRepository.delete(req.params.id);
    return res.json({
      message: `PlayerStatistics with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createPlayerStatistics,
  getAllPlayerStatistics,
  getPlayerStatistics,
  updatePlayerStatistics,
  deletePlayerStatistics,
};
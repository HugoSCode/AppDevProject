import teamStatsRepository from "../../repositories/teamStats.js";
import { queryOptions } from "../../utils/pagination.js";
const createTeamStats = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all teamStats or get teamStats by id"});
    }
    const newTeamStats = await teamStatsRepository.create(req.body);
    return res.status(201).json({
      message: "TeamStats successfully created",
      data: newTeamStats,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllTeamStats = async (req, res) => {
  try {
    const options =queryOptions(req.query);
    const filters = {
      team: req.query.team || undefined,
      wins: req.query.wins || undefined,
      draws: req.query.draws || undefined,
      losses: req.query.losses || undefined,
      league: req.query.league || undefined,
      points : req.query.points || undefined,
    };

 
    const teamStatss = await teamStatsRepository.findAll(filters, options);

    if (!teamStatss || teamStatss.length === 0) {
      return res.status(404).json({ message: "No teamStats found" });
    }

    return res.status(200).json({ data: teamStatss });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const getTeamStats = async (req, res) => {
  try {
    const teamStats = await teamStatsRepository.findById(req.params.id);
    if (!teamStats) {
      return res.status(404).json({
        message: `No teamStats with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({ data: teamStats });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateTeamStats = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all teamStats or get teamStats by id"});
    }
    const existingTeamStats = await teamStatsRepository.findById(req.params.id);
    if (!existingTeamStats) {
      return res.status(404).json({
        message: `No teamStats with the id: ${req.params.id} found`,
      });
    }

    const updatedTeamStats = await teamStatsRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `TeamStats with the id: ${req.params.id} successfully updated`,
      data: updatedTeamStats,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteTeamStats = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all teamStatss or get teamStatss by id"});
    }
    const teamStats = await teamStatsRepository.findById(req.params.id);
    if (!teamStats) {
      return res.status(404).json({
        message: `No teamStats with the id: ${req.params.id} found`,
      });
    }

    await teamStatsRepository.delete(req.params.id);
    return res.json({
      message: `TeamStats with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createTeamStats,
  getAllTeamStats,
  getTeamStats,
  updateTeamStats,
  deleteTeamStats,
};
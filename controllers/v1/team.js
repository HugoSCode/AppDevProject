import teamRepository from "../../repositories/team.js";
import { queryOptions } from "../../utils/pagination.js";
const createTeam = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all teams or get teams by id"});
    }
    const newTeam = await teamRepository.create(req.body);
    return res.status(201).json({
      message: "Team successfully created",
      data: newTeam,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getTeams = async (req, res) => {
  try {
    const filters = {
      name: req.query.name || undefined,
      coach: req.query.coach || undefined,
      stadium: req.query.stadium || undefined,
      leagueId: req.query.leagueId || undefined
    };

    const options =queryOptions(req.query);
    const teams = await teamRepository.findAll(filters, options);

    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: "No teams found" });
    }

    return res.status(200).json({ data: teams });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const getTeam = async (req, res) => {
  try {
    const team = await teamRepository.findById(req.params.id);
    if (!team) {
      return res.status(404).json({
        message: `No team with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({ data: team });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all teams or get teams by id"});
    }
    const existingTeam = await teamRepository.findById(req.params.id);
    if (!existingTeam) {
      return res.status(404).json({
        message: `No team with the id: ${req.params.id} found`,
      });
    }

    const updatedTeam = await teamRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Team with the id: ${req.params.id} successfully updated`,
      data: updatedTeam,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all teams or get teams by id"});
    }
    const team = await teamRepository.findById(req.params.id);
    if (!team) {
      return res.status(404).json({
        message: `No team with the id: ${req.params.id} found`,
      });
    }

    await teamRepository.delete(req.params.id);
    return res.json({
      message: `Team with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};

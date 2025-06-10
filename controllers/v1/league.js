import leagueRepository from "../../repositories/league.js";
import { queryOptions } from "../../utils/pagination.js";
const createLeague = async (req, res) => {
  try {
    if (req.user.role === 'NORMAL') {
      return res.status(403).json({
        message: "Normal users are only permitted to get all leagues or get leagues by id",
      });
    }

    const newLeague = await leagueRepository.create(req.body);
    return res.status(201).json({
      message: "League successfully created",
      data: newLeague,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getLeagues = async (req, res) => {
  try {
    const options =queryOptions(req.query);
    const filters = {
      name: req.query.name || undefined,
      country: req.query.country || undefined,
    };
    console.log(options)
    const leagues = await leagueRepository.findAll(filters, options);

    if (!leagues || leagues.length === 0) {
      return res.status(404).json({ message: "No leagues found" });
    }

    return res.status(200).json({ data: leagues });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getLeague = async (req, res) => {
  try {
    const league = await leagueRepository.findById(req.params.id);
    if (!league) {
      return res.status(404).json({
        message: `No league with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({ data: league });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateLeague = async (req, res) => {
  try {
    if (req.user.role === 'NORMAL') {
      return res.status(403).json({
        message: "Normal users are only permitted to get all leagues or get leagues by id",
      });
    }

    const existingLeague = await leagueRepository.findById(req.params.id);
    if (!existingLeague) {
      return res.status(404).json({
        message: `No league with the id: ${req.params.id} found`,
      });
    }

    const updatedLeague = await leagueRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `League with the id: ${req.params.id} successfully updated`,
      data: updatedLeague,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteLeague = async (req, res) => {
  try {
    if (req.user.role === 'NORMAL') {
      return res.status(403).json({
        message: "Normal users are only permitted to get all leagues or get leagues by id",
      });
    }

    const league = await leagueRepository.findById(req.params.id);
    if (!league) {
      return res.status(404).json({
        message: `No league with the id: ${req.params.id} found`,
      });
    }

    await leagueRepository.delete(req.params.id);
    return res.json({
      message: `League with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createLeague,
  getLeagues,
  getLeague,
  updateLeague,
  deleteLeague,
};

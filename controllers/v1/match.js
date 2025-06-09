import matchRepository from "../../repositories/match.js";
import { queryOptions } from "../../utils/pagination.js";
const createMatch = async (req, res) => {
  try {
    if (req.user.role === "NORMAL") {
      return res.status(403).json({
        message: "Normal users are only permitted to get all matches or get matches by id",
      });
    }

    const newMatch = await matchRepository.create(req.body);
    return res.status(201).json({
      message: "Match successfully created",
      data: newMatch,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMatches = async (req, res) => {
  try {
    const options =queryOptions(req.query);
    const filters = {
      stadium: req.query.stadium || undefined,
    };
 
    const matches = await matchRepository.findAll(filters, options);

    if (!matches || matches.length === 0) {
      return res.status(404).json({ message: "No matches found" });
    }

    return res.status(200).json({ data: matches });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMatch = async (req, res) => {
  try {
    const match = await matchRepository.findById(req.params.id);
    if (!match) {
      return res.status(404).json({
        message: `No match with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({ data: match });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateMatch = async (req, res) => {
  try {
    if (req.user.role === "NORMAL") {
      return res.status(403).json({
        message: "Normal users are only permitted to get all matches or get matches by id",
      });
    }

    const existingMatch = await matchRepository.findById(req.params.id);
    if (!existingMatch) {
      return res.status(404).json({
        message: `No match with the id: ${req.params.id} found`,
      });
    }

    const updatedMatch = await matchRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Match with the id: ${req.params.id} successfully updated`,
      data: updatedMatch,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteMatch = async (req, res) => {
  try {
    if (req.user.role === "NORMAL") {
      return res.status(403).json({
        message: "Normal users are only permitted to get all matches or get matches by id",
      });
    }

    const match = await matchRepository.findById(req.params.id);
    if (!match) {
      return res.status(404).json({
        message: `No match with the id: ${req.params.id} found`,
      });
    }

    await matchRepository.delete(req.params.id);
    return res.json({
      message: `Match with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createMatch,
  getMatches,
  getMatch,
  updateMatch,
  deleteMatch,
};

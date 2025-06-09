import matchEventRepository from "../../repositories/matchEvent.js";
import { queryOptions } from "../../utils/pagination.js";
const createMatchEvent = async (req, res) => {
  try {
    if (req.user.role === "NORMAL") {
      return res.status(403).json({
        message: "Normal users are only permitted to get all matchEventes or get matchEventes by id",
      });
    }

    const newMatchEvent = await matchEventRepository.create(req.body);
    return res.status(201).json({
      message: "MatchEvent successfully created",
      data: newMatchEvent,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMatchEvents = async (req, res) => {
  try {
    const filters = {
      stadium: req.query.stadium || undefined,
    };

    const options =queryOptions(req.query);
    const matchEventes = await matchEventRepository.findAll(filters, options);

    if (!matchEventes || matchEventes.length === 0) {
      return res.status(404).json({ message: "No matchEventes found" });
    }

    return res.status(200).json({ data: matchEventes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMatchEvent = async (req, res) => {
  try {
    const matchEvent = await matchEventRepository.findById(req.params.id);
    if (!matchEvent) {
      return res.status(404).json({
        message: `No matchEvent with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({ data: matchEvent });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateMatchEvent = async (req, res) => {
  try {
    if (req.user.role === "NORMAL") {
      return res.status(403).json({
        message: "Normal users are only permitted to get all matchEventes or get matchEventes by id",
      });
    }

    const existingMatchEvent = await matchEventRepository.findById(req.params.id);
    if (!existingMatchEvent) {
      return res.status(404).json({
        message: `No matchEvent with the id: ${req.params.id} found`,
      });
    }

    const updatedMatchEvent = await matchEventRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `MatchEvent with the id: ${req.params.id} successfully updated`,
      data: updatedMatchEvent,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteMatchEvent = async (req, res) => {
  try {
    if (req.user.role === "NORMAL") {
      return res.status(403).json({
        message: "Normal users are only permitted to get all matchEventes or get matchEventes by id",
      });
    }

    const matchEvent = await matchEventRepository.findById(req.params.id);
    if (!matchEvent) {
      return res.status(404).json({
        message: `No matchEvent with the id: ${req.params.id} found`,
      });
    }

    await matchEventRepository.delete(req.params.id);
    return res.json({
      message: `MatchEvent with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createMatchEvent,
  getMatchEvents,
  getMatchEvent,
  updateMatchEvent,
  deleteMatchEvent,
};

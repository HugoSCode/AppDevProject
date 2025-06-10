import injuryRepository from "../../repositories/injury.js";
import { queryOptions } from "../../utils/pagination.js";
const createInjury = async (req, res) => {
  try {
    if (req.user.role === 'NORMAL') {
      return res.status(403).json({
        message: "Normal users are only permitted to get all injuries or get injuries by id",
      });
    }

    const newInjury = await injuryRepository.create(req.body);
    return res.status(201).json({
      message: "Injury successfully created",
      data: newInjury,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getInjuries = async (req, res) => {
  try {
    const options =queryOptions(req.query);
    const filters = {
      playerId: req.query.name || undefined,
      description: req.query.description || undefined,
      date: req.query.date || undefined,
      duration: req.query.duration || undefined,
    };
    const injuries = await injuryRepository.findAll(filters, options);

    if (!injuries || injuries.length === 0) {
      return res.status(404).json({ message: "No injuries found" });
    }

    return res.status(200).json({ data: injuries });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getInjury = async (req, res) => {
  try {
    const injury = await injuryRepository.findById(req.params.id);
    if (!injury) {
      return res.status(404).json({
        message: `No injury with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({ data: injury });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateInjury = async (req, res) => {
  try {
    if (req.user.role === 'NORMAL') {
      return res.status(403).json({
        message: "Normal users are only permitted to get all injuries or get injuries by id",
      });
    }

    const existingInjury = await injuryRepository.findById(req.params.id);
    if (!existingInjury) {
      return res.status(404).json({
        message: `No injury with the id: ${req.params.id} found`,
      });
    }

    const updatedInjury = await injuryRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Injury with the id: ${req.params.id} successfully updated`,
      data: updatedInjury,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteInjury = async (req, res) => {
  try {
    if (req.user.role === 'NORMAL') {
      return res.status(403).json({
        message: "Normal users are only permitted to get all injuries or get injuries by id",
      });
    }

    const injury = await injuryRepository.findById(req.params.id);
    if (!injury) {
      return res.status(404).json({
        message: `No injury with the id: ${req.params.id} found`,
      });
    }

    await injuryRepository.delete(req.params.id);
    return res.json({
      message: `Injury with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createInjury,
  getInjuries,
  getInjury,
  updateInjury,
  deleteInjury,
};
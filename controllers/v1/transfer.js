import transferRepository from "../../repositories/transfer.js";
import { queryOptions } from "../../utils/pagination.js";
const createTransfer = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all transfers or get transfers by id"});
    }
    const newTransfer = await transferRepository.create(req.body);
    return res.status(201).json({
      message: "Transfer successfully created",
      data: newTransfer,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getTransfers = async (req, res) => {
  try {
    const options =queryOptions(req.query);
    const filters = {
      player: req.query.player || undefined,
      fromTeam: req.query.fromTeam || undefined,
      toTeam: req.query.toTeam || undefined,
      fee: req.query.fee || undefined,
      transferType: req.query.transferType || undefined,
      date: req.query.date || undefined
    };

  
    const transfers= await transferRepository.findAll(
        filters,
        options
      );
    if (!transfers || transfers.length === 0) {
      return res.status(404).json({ message: "No transfers found" });
    }

    return res.status(200).json({ data: transfers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getTransfer = async (req, res) => {
  try {
    const transfer = await transferRepository.findById(req.params.id);
    if (!transfer) {
      return res.status(404).json({
        message: `No transfer with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({ data: transfer });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateTransfer = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all transfers or get transfers by id"});
    }
    const transfer = await transferRepository.findById(req.params.id);
    if (!transfer) {
      return res.status(404).json({
        message: `No transfer with the id: ${req.params.id} found`,
      });
    }

    const updatedTransfer = await transferRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Transfer with the id: ${req.params.id} successfully updated`,
      data: updatedTransfer,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteTransfer = async (req, res) => {
  try {
    if (req.user.role==='NORMAL'){
      return res.status(403).json({message: "Normal users are only permitted to get all transfers or get transfers by id"});
    }
    const transfer = await transferRepository.findById(req.params.id);
    if (!transfer) {
      return res.status(404).json({
        message: `No transfer with the id: ${req.params.id} found`,
      });
    }

    await transferRepository.delete(req.params.id);
    return res.json({
      message: `Transfer with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createTransfer,
  getTransfers,
  getTransfer,
  updateTransfer,
  deleteTransfer,
};
import userRepository from "../../repositories/user.js";

const createUser = async (req, res) => {
  try {
    if (req.user.role === 'NORMAL') {
      return res.status(403).json({ message: "Denied: Normal users are not authorized to create new users" });
    } else if (req.user.role === 'ADMIN') {
      if (req.body.role != 'NORMAL') {
        return res.status(404).json({ message: "Denied: Admin users are only authorized to create NORMAL users" });
      }
      delete req.body.password;
    }
    await userRepository.create(req.body);
    const newUsers = await userRepository.findAll();
    return res.status(201).json({
      message: "User successfully created",
      data: newUsers,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const filters = {
      username: req.query.username || undefined,
      email: req.query.email || undefined,
      role: req.query.role || undefined,
    };

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const users = await userRepository.findAll(
      filters,
      sortBy,
      sortOrder
    );

    if (!users || users.length == 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }
    user = await userRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `User with the id: ${req.params.id} successfully updated`,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }
    await userRepository.delete(req.params.id);
    return res.json({
      message: `User with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
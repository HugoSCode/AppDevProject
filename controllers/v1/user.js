import userRepository from "../../repositories/user.js";
import { queryOptions } from "../../utils/pagination.js";

const createUser = async (req, res) => {
  try {
    if (req.user.role === 'NORMAL') {
      return res.status(403).json({ message: "Denied: Normal users are not authorized to create new users" });
    } else if (req.user.role === 'ADMIN') {
      if (req.body.role != 'NORMAL') {
        return res.status(404).json({ message: "Denied: Admin users are only authorized to create NORMAL users" });
      }
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
    const options =queryOptions(req.query);

    const filters = {
      username: req.query.username || undefined,
      email: req.query.email || undefined,
      role: req.query.role || undefined,
      enabled: req.query.enabled || undefined
    };

    let users;

    if (req.user.role === 'NORMAL') {
      const user = await userRepository.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "Note that NORMAL users can only return their own details, not other users details",
        data: user
      });
    } else {
      users = await userRepository.findAll(
        filters,
        options
      );

      if (req.user.role === 'ADMIN') {
        users = users.filter(user => user.role != 'SUPER_ADMIN');
      }
    }

    if (!users || users.length == 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({
      message: "Users located",
      note: "ADMIN users may not return data of SUPER_ADMIN users",
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
    if (req.user.role === "NORMAL" && req.params.id != req.user.id) {
      return res.status(403).json({ message: "Normal users are not authorised to search details of other users" });
    }

    const user = await userRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `No user with the id: ${req.params.id} found`,
      });
    }
    if (req.user.role === "ADMIN" && user.role === "SUPER_ADMIN") {
      return res.status(403).json({
        message: "ADMIN users are not authorised to view the details of SUPER_ADMIN users"
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
    const updateThemself = req.user.id === user.id;
    const changingRole = req.body.role && req.body.role != user.role; //checks if role is supplied and if its been changed
    const updatingPassword = req.body.password;
    const isChangingEnabled = 'enabled' in req.body;


    if (req.user.role == "NORMAL") {
      if (!updateThemself || changingRole) {
        return res.status(403).json({ message: "Denied: NORMAL users are not authorised to update others information or change their own role" });
      }
    } else if (req.user.role === "ADMIN") {
      if (!updateThemself && user.role != "NORMAL") {
        return res.status(403).json({ message: "Denied: ADMIN users only authorised to update NORMAL users" });
      }
      if (updateThemself && changingRole) {
        return res.status(403).json({ message: "Denied: ADMIN users cannot change their own role" });
      }
    } else if (req.user.role === "SUPER_ADMIN") {
      if (updateThemself && changingRole) {
        return res.status(403).json({ message: "Denied: Not authorised to change your own role" });
      }
      if (!updateThemself && user.role === "SUPER_ADMIN") {
        return res.status(403).json({ message: "Denied: Not authorised to update other SUPER_ADMIN users information" });
      }
      if (isChangingEnabled && user.role === "SUPER_ADMIN") {
        return res.status(403).json({ message: "Denied: Not authorised to enable or disbale SUPER_ADMIN users" });
      }
    }
    if (!updateThemself && updatingPassword) {
      return res.status(403).json({ message: "Denied: Not authorised to update other users password" });
    }
    if (req.user.role != "SUPER_ADMIN" && isChangingEnabled) {
      return res.status(403).json({ message: "Denied: Only SUPER_ADMIN users can change a users status" });
    }
    console.log(req.body);
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
    if (req.user.role === "NORMAL") {
      return res.status(403).json({ message: "Denied: NORMAL users not authorised to deleted users" });
    }
    else if (req.user.role === "ADMIN" && user.role != "NORMAL") {
      return res.status(403).json({ message: "Denied: ADMIN users are only authorised to delete NORMAL users" });
    }
    else if (req.user.role === "SUPER_ADMIN" && user.role === "SUPER_ADMIN") {
      return res.status(403).json({ message: "Denied: Not authorised to delete other SUPER_ADMIN users" });
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
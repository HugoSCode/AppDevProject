import prisma from "../../prisma/client.js";
// Add the following code under import prisma from "../prisma/client.js";

/**
 * @description This function creates a new user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createUser = async (req, res) => {
    // Try/catch blocks are used to handle exceptions
    try {
      // Create a new user
      await prisma.user.create({
        // Data to be inserted
        data: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      });
  
      // Get all users from the user table
      const newUsers = await prisma.user.findMany();
  
      // Send a JSON response
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


  // Add the following code under the createUser function
const getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
  
      // Check if there are no users
      if (!users) {
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

  // Add the following code under the getUsers function
const getUser = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no user
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

  // Add the following code under the getUser function
const updateUser = async (req, res) => {
    try {
      // Find the user by id
      let user = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
  
      // Check if there is no user
      if (!user) {
        return res.status(404).json({
          message: `No user with the id: ${req.params.id} found`,
        });
      }
  
      // Update the user
      user = await prisma.user.update({
        where: { id: req.params.id },
        data: {
          // Data to be updated
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      });
  
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

  // Add the following code under the updateUser function
const deleteUser = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
  
      if (!user) {
        return res.status(404).json({
          message: `No user with the id: ${req.params.id} found`,
        });
      }
  
      await prisma.user.delete({
        where: { id: req.params.id },
      });
  
      return res.json({
        message: `User with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };

  // Add the following code under the deleteUser function
export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
  };
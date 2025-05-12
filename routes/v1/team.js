import express from "express";

import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
} from "../../controllers/v1/team.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Arsenal"
 *         coach:
 *           type: string
 *           example: "Mikel Arteta"
 *         stadium:
 *           type: string
 *           example: "Emirates Stadium"
 *         playerIds:
 *           type: array
 *           description: Array of player UUIDs to associate with the team
 *           items:
 *             type: string
 *             format: uuid
 *           example: ["123e4567-e89b-12d3-a456-426614174001", "223e4567-e89b-12d3-a456-426614174002"]
 */




/**
 * @swagger
 * /api/v1/teams:
 *   post:
 *     summary: Create a new team
 *     tags:
 *       - Team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       '201':
 *         description: Team successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Team successfully created"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Team'
 *       '400':
 *         description: Team with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Team with the same name already exists"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.post("/", createTeam);

/**
 * @swagger
 * /api/v1/teams:
 *   get:
 *     summary: Get all teams
 *     tags:
 *       - Team
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Team'
 *       '404':
 *         description: No teams found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No teams found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/", getTeams);

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   get:
 *     summary: Get an team by id
 *     tags:
 *       - Team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The team id
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       '404':
 *         description: No team found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No team with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/:id", getTeam);

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   put:
 *     summary: Update an team by id
 *     tags:
 *       - Team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The team id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       '200':
 *         description: Team successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Team with the id: {id} successfully updated"
 *                 data:
 *                   $ref: '#/components/schemas/Team'
 *       '404':
 *         description: No team found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No team with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.put("/:id", updateTeam);

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   delete:
 *     summary: Delete an team by id
 *     tags:
 *       - Team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The team id
 *     responses:
 *       '200':
 *         description: Team successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Team with the id: {id} successfully deleted"
 *       '404':
 *         description: No team found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No team with the id: {id} found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.delete("/:id", deleteTeam);

export default router;
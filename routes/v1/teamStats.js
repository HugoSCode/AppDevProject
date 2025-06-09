import express from "express";

import {
  createTeamStats,
  getAllTeamStats,
  getTeamStats,
  updateTeamStats,
  deleteTeamStats,
} from "../../controllers/v1/teamStats.js";

import {
  validatePostTeamStats,
  validatePutTeamStats,
} from "../../middleware/validation/teamStats.js";

const router = express.Router();

router.post("/", validatePostTeamStats, createTeamStats);
router.get("/", getAllTeamStats);
router.get("/:id", getTeamStats);
router.put("/:id", validatePutTeamStats, updateTeamStats);
router.delete("/:id", deleteTeamStats);

/**
 * @swagger
 * components:
 *   schemas:
 *     TeamStats:
 *       type: object
 *       properties:
 *         teamId:
 *           type: string
 *           format: uuid
 *           example: "111e4567-e89b-12d3-a456-426614174000"
 *         leagueId:
 *           type: string
 *           format: uuid
 *           example: "222e4567-e89b-12d3-a456-426614174000"
 *         wins:
 *           type: integer
 *           example: 10
 *         draws:
 *           type: integer
 *           example: 5
 *         losses:
 *           type: integer
 *           example: 3
 *         points:
 *           type: integer
 *           example: 35
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /api/v1/teamStats:
 *   post:
 *     summary: Create new team stats
 *     tags:
 *       - TeamStats
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamStats'
 *     responses:
 *       '201':
 *         description: Team stats successfully created
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/teamStats:
 *   get:
 *     summary: Get all team stats
 *     tags:
 *       - TeamStats
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No stats found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/teamStats/{id}:
 *   get:
 *     summary: Get a single team stats record by ID
 *     tags:
 *       - TeamStats
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the team stats record
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Team stats not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/teamStats/{id}:
 *   put:
 *     summary: Update a team stats record
 *     tags:
 *       - TeamStats
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the team stats record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamStats'
 *     responses:
 *       '200':
 *         description: Team stats updated successfully
 *       '400':
 *         description: Validation error
 *       '404':
 *         description: Team stats not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/teamStats/{id}:
 *   delete:
 *     summary: Delete a team stats record
 *     tags:
 *       - TeamStats
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the team stats record to delete
 *     responses:
 *       '200':
 *         description: Team stats deleted successfully
 *       '404':
 *         description: Team stats not found
 *       '500':
 *         description: Internal server error
 */

export default router;

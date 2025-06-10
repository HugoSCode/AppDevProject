import express from "express";

import {
  createPlayerStatistics,
  getAllPlayerStatistics,
  getPlayerStatistics,
  updatePlayerStatistics,
  deletePlayerStatistics,
} from "../../controllers/v1/playerStatistics.js";

import {
  validatePostPlayerStatistics,
  validatePutPlayerStatistics,
} from "../../middleware/validation/playerStatistics.js";

const router = express.Router();

router.post("/", validatePostPlayerStatistics, createPlayerStatistics);
router.get("/", getAllPlayerStatistics);
router.get("/:id", getPlayerStatistics);
router.put("/:id", validatePutPlayerStatistics, updatePlayerStatistics);
router.delete("/:id", deletePlayerStatistics);

/**
 * @swagger
 * components:
 *   schemas:
 *     PlayerStatistics:
 *       type: object
 *       properties:
 *         playerId:
 *           type: string
 *           format: uuid
 *           example: "0ba2fd12-9977-4e77-b724-c94a88f4ea20"
 *         matchId:
 *           type: string
 *           format: uuid
 *           example: "3cdd4263-2237-4ed4-b42d-310a37e9c41e"
 *         goals:
 *           type: integer
 *           example: 2
 *         assists:
 *           type: integer
 *           example: 1
 *         passes:
 *           type: integer
 *           example: 50
 *         tackles:
 *           type: integer
 *           example: 4
 *         saves:
 *           type: integer
 *           example: 0
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
 * /api/v1/playerStatistics:
 *   post:
 *     summary: Create player statistics
 *     tags:
 *       - PlayerStatistics
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerStatistics'
 *     responses:
 *       201:
 *         description: Player statistics created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/playerStatistics:
 *   get:
 *     summary: Get all player statistics
 *     tags:
 *       - PlayerStatistics
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: playerId
 *         schema:
 *           type: string
 *         description: Filter by player ID
 *       - in: query
 *         name: matchId
 *         schema:
 *           type: string
 *         description: Filter by match ID
 *       - in: query
 *         name: goals
 *         schema:
 *           type: integer
 *         description: Filter by number of goals
 *       - in: query
 *         name: assists
 *         schema:
 *           type: integer
 *         description: Filter by number of assists
 *       - in: query
 *         name: tackles
 *         schema:
 *           type: integer
 *         description: Filter by number of tackles
 *       - in: query
 *         name: saves
 *         schema:
 *           type: integer
 *         description: Filter by number of saves
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, goals, assists, passes, tackles, saves]
 *         description: Field to sort the player stats by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the player stats by (default is 'asc')
 *       - in: query
 *         name: amount
 *         schema:
 *           type: integer
 *         description: How many entries to show per page (default is 25)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Which page of entries to show (default is 1)
 *     responses:
 *       200:
 *         description: List of player statistics
 *       404:
 *         description: No stats found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/playerStatistics/{id}:
 *   get:
 *     summary: Get player statistics by ID
 *     tags:
 *       - PlayerStatistics
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Player statistics ID
 *     responses:
 *       200:
 *         description: Player statistics found
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/playerStatistics/{id}:
 *   put:
 *     summary: Update player statistics by ID
 *     tags:
 *       - PlayerStatistics
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Player statistics ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerStatistics'
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/playerStatistics/{id}:
 *   delete:
 *     summary: Delete player statistics by ID
 *     tags:
 *       - PlayerStatistics
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Player statistics ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

export default router;


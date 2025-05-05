import express from "express";

import {
  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer,
} from "../../controllers/v1/player.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Bukayo Saka"
 *         age:
 *           type: integer
 *           example: 22
 *         nationality:
 *           type: string
 *           example: "English"
 *         position:
 *           type: string
 *           enum:
 *             - GOALKEEPER
 *             - DEFENDER
 *             - MIDFIELDER
 *             - ATTACKER
 *           example: "MIDFIELDER"
 *         teamId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 */




/**
 * @swagger
 * /api/v1/players:
 *   post:
 *     summary: Create a new player
 *     tags:
 *       - Player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       '201':
 *         description: Player successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Player successfully created"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Player'
 *       '400':
 *         description: Player with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Player with the same name already exists"
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
router.post("/", createPlayer);

/**
 * @swagger
 * /api/v1/players:
 *   get:
 *     summary: Get all players
 *     tags:
 *       - Player
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
 *                     $ref: '#/components/schemas/Player'
 *       '404':
 *         description: No players found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No players found"
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
router.get("/", getPlayers);

/**
 * @swagger
 * /api/v1/players/{id}:
 *   get:
 *     summary: Get an player by id
 *     tags:
 *       - Player
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The player id
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       '404':
 *         description: No player found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No player with the id: {id} found"
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
router.get("/:id", getPlayer);

/**
 * @swagger
 * /api/v1/players/{id}:
 *   put:
 *     summary: Update an player by id
 *     tags:
 *       - Player
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The player id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       '200':
 *         description: Player successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Player with the id: {id} successfully updated"
 *                 data:
 *                   $ref: '#/components/schemas/Player'
 *       '404':
 *         description: No player found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No player with the id: {id} found"
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
router.put("/:id", updatePlayer);

/**
 * @swagger
 * /api/v1/players/{id}:
 *   delete:
 *     summary: Delete an player by id
 *     tags:
 *       - Player
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The player id
 *     responses:
 *       '200':
 *         description: Player successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Player with the id: {id} successfully deleted"
 *       '404':
 *         description: No player found with the provided id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No player with the id: {id} found"
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
router.delete("/:id", deletePlayer);

export default router;
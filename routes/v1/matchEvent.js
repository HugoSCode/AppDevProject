import express from "express";

import {
  createMatchEvent,
  getMatchEvents,
  getMatchEvent,
  updateMatchEvent,
  deleteMatchEvent,
} from "../../controllers/v1/matchEvent.js";

import {
  validatePostMatchEvent,
  validatePutMatchEvent,
} from "../../middleware/validation/matchEvent.js";

const router = express.Router();

router.post("/", validatePostMatchEvent, createMatchEvent);
router.get("/", getMatchEvents);
router.get("/:id", getMatchEvent);
router.put("/:id", validatePutMatchEvent, updateMatchEvent);
router.delete("/:id", deleteMatchEvent);

/**
 * @swagger
 * components:
 *   schemas:
 *     MatchEvent:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: "Goal"
 *         minute:
 *           type: integer
 *           example: 42
 *         matchId:
 *           type: string
 *           format: uuid
 *           example: "111e4567-e89b-12d3-a456-426614174000"
 *         playerId:
 *           type: string
 *           format: uuid
 *           example: "222e4567-e89b-12d3-a456-426614174000"
 *         details:
 *           type: string
 *           example: "Right-footed shot from outside the box"
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
 * /api/v1/matchEvent:
 *   post:
 *     summary: Create a new match event
 *     tags:
 *       - MatchEvent
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatchEvent'
 *     responses:
 *       '201':
 *         description: Match event successfully created
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/matchEvent:
 *   get:
 *     summary: Get all match events
 *     tags:
 *       - MatchEvent
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: No match events found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/matchEvent/{id}:
 *   get:
 *     summary: Get a match event by ID
 *     tags:
 *       - MatchEvent
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Match event not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/matchEvent/{id}:
 *   put:
 *     summary: Update a match event
 *     tags:
 *       - MatchEvent
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatchEvent'
 *     responses:
 *       '200':
 *         description: Match event updated
 *       '400':
 *         description: Validation error
 *       '404':
 *         description: Match event not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/matchEvent/{id}:
 *   delete:
 *     summary: Delete a match event
 *     tags:
 *       - MatchEvent
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '204':
 *         description: Match event deleted
 *       '404':
 *         description: Match event not found
 *       '500':
 *         description: Internal server error
 */

export default router;

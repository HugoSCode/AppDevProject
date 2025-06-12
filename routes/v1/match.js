import express from "express";
import { getReqLimit, createReqLimit } from "../../middleware/limitRequests.js";
import {
  createMatch,
  getMatches,
  getMatch,
  updateMatch,
  deleteMatch,
} from "../../controllers/v1/match.js";

import {
  validatePostMatch,
  validatePutMatch,
} from "../../middleware/validation/match.js";

const router = express.Router();

router.post("/", validatePostMatch, createReqLimit, createMatch);
router.get("/", getReqLimit, getMatches);
router.get("/:id", getReqLimit, getMatch);
router.put("/:id", createReqLimit, validatePutMatch, updateMatch);
router.delete("/:id", createReqLimit, deleteMatch);

/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T15:30:00.000Z"
 *         stadium:
 *           type: string
 *           example: "Old Trafford"
 *         homeTeamId:
 *           type: string
 *           format: uuid
 *           example: "111e4567-e89b-12d3-a456-426614174000"
 *         awayTeamId:
 *           type: string
 *           format: uuid
 *           example: "222e4567-e89b-12d3-a456-426614174000"
 *         leagueId:
 *           type: string
 *           format: uuid
 *           example: "333e4567-e89b-12d3-a456-426614174000"
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
 * /api/v1/matches:
 *   post:
 *     summary: Create a new match
 *     tags:
 *       - Match
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       '201':
 *         description: Match successfully created
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/matches:
 *   get:
 *     summary: Get all matches
 *     tags:
 *       - Match
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: stadium
 *         schema:
 *           type: string
 *         description: Filter matches by stadium
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Filter matches by date
 *       - in: query
 *         name: homeTeam
 *         schema:
 *           type: string
 *         description: Filter matches by home team name
 *       - in: query
 *         name: awayTeam
 *         schema:
 *           type: string
 *         description: Filter matches by away team name
 *       - in: query
 *         name: league
 *         schema:
 *           type: string
 *         description: Filter matches by league name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, date, stadium, leagueId, homeTeamId, awayTeamId]
 *         description: Field to sort the matches by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the matches by (default is 'asc')
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
 *       '200':
 *         description: Success
 *       '404':
 *         description: No matches found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/matches/{id}:
 *   get:
 *     summary: Get a match by ID
 *     tags:
 *       - Match
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Match ID
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Match not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/matches/{id}:
 *   put:
 *     summary: Update a match by ID
 *     tags:
 *       - Match
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Match ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       '200':
 *         description: Match updated
 *       '404':
 *         description: Match not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/matches/{id}:
 *   delete:
 *     summary: Delete a match by ID
 *     tags:
 *       - Match
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Match ID
 *     responses:
 *       '200':
 *         description: Match deleted
 *       '404':
 *         description: Match not found
 *       '500':
 *         description: Internal server error
 */

export default router;

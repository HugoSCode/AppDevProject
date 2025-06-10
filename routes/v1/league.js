
import express from "express";

import {
  createLeague,
  getLeagues,
  getLeague,
  updateLeague,
  deleteLeague,
} from "../../controllers/v1/league.js";

import {
  validatePostLeague,
  validatePutLeague,
} from "../../middleware/validation/league.js";

const router = express.Router();

router.post("/", validatePostLeague, createLeague);
router.get("/", getLeagues);
router.get("/:id", getLeague);
router.put("/:id", validatePutLeague, updateLeague);
router.delete("/:id", deleteLeague);

/**
 * @swagger
 * components:
 *   schemas:
 *     League:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Premier League"
 *         country:
 *           type: string
 *           example: "England"
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
 * /api/v1/leagues:
 *   post:
 *     summary: Create a new league
 *     tags:
 *       - League
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/League'
 *     responses:
 *       '201':
 *         description: League successfully created
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/leagues:
 *   get:
 *     summary: Get all leagues
 *     tags:
 *       - League
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter leagues by name
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter leagues by country
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
 *         description: No leagues found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/leagues/{id}:
 *   get:
 *     summary: Get a league by ID
 *     tags:
 *       - League
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: League ID
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: League not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/leagues/{id}:
 *   put:
 *     summary: Update a league by ID
 *     tags:
 *       - League
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: League ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/League'
 *     responses:
 *       '200':
 *         description: League updated
 *       '404':
 *         description: League not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/leagues/{id}:
 *   delete:
 *     summary: Delete a league by ID
 *     tags:
 *       - League
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: League ID
 *     responses:
 *       '200':
 *         description: League deleted
 *       '404':
 *         description: League not found
 *       '500':
 *         description: Internal server error
 */

export default router;

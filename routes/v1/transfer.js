import express from "express";

import { getReqLimit, createReqLimit } from "../../middleware/limitRequests.js";

import {
  createTransfer,
  getTransfers,
  getTransfer,
  updateTransfer,
  deleteTransfer,
} from "../../controllers/v1/transfer.js";

import {
  validatePostTransfer,
  validatePutTransfer,
} from "../../middleware/validation/transfer.js";

const router = express.Router();

router.post("/", validatePostTransfer, createReqLimit, createTransfer);
router.get("/", getReqLimit, getTransfers);
router.get("/:id", getReqLimit, getTransfer);
router.put("/:id", createReqLimit, validatePutTransfer, updateTransfer);
router.delete("/:id", createReqLimit, deleteTransfer);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Transfer:
 *       type: object
 *       properties:
 *         playerId:
 *           type: string
 *           format: uuid
 *           example: "139a3c5d-27c0-4911-81e1-b689d210bf44"
 *         fromTeamId:
 *           type: string
 *           format: uuid
 *           example: "223e4567-e89b-12d3-a456-426614174000"
 *         toTeamId:
 *           type: string
 *           format: uuid
 *           example: "001edf5e-025f-4430-9327-89a69e16f33d"
 *         fee:
 *           type: integer
 *           example: 50000000
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2024-07-01T12:00:00Z"
 *         transferType:
 *           type: string
 *           enum:
 *             - PERMANENT
 *             - LOAN
 *             - FREE
 *           example: "PERMANENT"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /api/v1/transfers:
 *   post:
 *     summary: Create a new transfer
 *     tags:
 *       - Transfer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transfer'
 *     responses:
 *       '201':
 *         description: Transfer successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transfer successfully created"
 *                 data:
 *                   $ref: '#/components/schemas/Transfer'
 *       '400':
 *         description: Invalid transfer data
 */

/**
 * @swagger
 * /api/v1/transfers:
 *   get:
 *     summary: Get all transfers
 *     tags:
 *       - Transfer
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: playerId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by player ID
 *       - in: query
 *         name: fromTeamId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by origin team
 *       - in: query
 *         name: toTeamId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by destination team
 *       - in: query
 *         name: fee
 *         schema:
 *           type: string
 *         description: Filter by fee
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Filter by date of transfer
 *       - in: query
 *         name: transferType
 *         schema:
 *           type: string
 *           enum: [PERMANENT, LOAN, FREE]
 *         description: Filter by type of transfer
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, fee, fromTeam, toTeam]
 *           default: date
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
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
 *         description: List of transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transfer'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/transfers/{id}:
 *   get:
 *     summary: Get a transfer by ID
 *     tags:
 *       - Transfer
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Transfer details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transfer'
 *       '404':
 *         description: Transfer not found
 *   put:
 *     summary: Update a transfer
 *     tags:
 *       - Transfer
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transfer'
 *     responses:
 *       '200':
 *         description: Transfer updated
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Transfer not found
 *   delete:
 *     summary: Delete a transfer
 *     tags:
 *       - Transfer
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Transfer deleted
 *       '404':
 *         description: Transfer not found
 */


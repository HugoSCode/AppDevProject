import express from "express";

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

router.post("/", validatePostTransfer, createTransfer);
router.get("/", getTransfers);
router.get("/:id", getTransfer);
router.put("/:id", validatePutTransfer, updateTransfer);
router.delete("/:id", deleteTransfer);

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
 *           example: "PERMANENT"
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
 *
 *   get:
 *     summary: Get all transfers
 *     tags:
 *       - Transfer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: List of transfers
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
 *
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
 *
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
 */

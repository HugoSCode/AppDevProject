import express from "express";
import { getReqLimit, createReqLimit } from "../../middleware/limitRequests.js";
import {
  createInjury,
  getInjuries,
  getInjury,
  updateInjury,
  deleteInjury,
} from "../../controllers/v1/injury.js";
import {
  validatePostInjury,
  validatePutInjury,
} from "../../middleware/validation/injury.js";

const router = express.Router();

router.post("/", validatePostInjury, createReqLimit, createInjury);
router.get("/", getReqLimit, getInjuries);
router.get("/:id", getReqLimit, getInjury);
router.put("/:id", createReqLimit, validatePutInjury, updateInjury);
router.delete("/:id", createReqLimit, deleteInjury);

/**
 * @swagger
 * components:
 *   schemas:
 *     Injury:
 *       type: object
 *       properties:
 *         playerId:
 *           type: string
 *           example: "023c5f44-e042-4dc9-82df-cd4cc991c380"
 *         description:
 *           type: string
 *           example: "Ankle sprain"
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-06-10"
 *         duration:
 *           type: integer
 *           example: 14
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
 * /api/v1/injuries:
 *   post:
 *     summary: Create a new injury record
 *     tags:
 *       - Injury
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Injury'
 *     responses:
 *       '201':
 *         description: Injury record successfully created
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/injuries:
 *   get:
 *     summary: Retrieve all injury records
 *     tags:
 *       - Injury
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: playerId
 *         schema:
 *           type: string
 *         description: Filter injuries by player ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter injuries by date
 *       - in: query
 *         name: duration
 *         schema:
 *           type: integer
 *         description: Filter injuries by duration
 *       - in: query
 *         name: amount
 *         schema:
 *           type: integer
 *         description: Number of records per page (default is 25)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default is 1)
*       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, date, description, playerId, duration]
 *         description: Field to sort the injuries by (default is 'id')
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order to sort the injuries by (default is 'asc')
 *     responses:
 *       '200':
 *         description: List of injury records
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/injuries/{id}:
 *   get:
 *     summary: Retrieve a specific injury record by ID
 *     tags:
 *       - Injury
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Injury record ID
 *     responses:
 *       '200':
 *         description: Injury record details
 *       '404':
 *         description: Injury record not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/injuries/{id}:
 *   put:
 *     summary: Update an existing injury record by ID
 *     tags:
 *       - Injury
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Injury record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Injury'
 *     responses:
 *       '200':
 *         description: Injury record successfully updated
 *       '400':
 *         description: Validation error
 *       '404':
 *         description: Injury record not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/injuries/{id}:
 *   delete:
 *     summary: Delete an injury record by ID
 *     tags:
 *       - Injury
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Injury record ID
 *     responses:
 *       '200':
 *         description: Injury record successfully deleted
 *       '404':
 *         description: Injury record not found
 *       '500':
 *         description: Internal server error
 */

export default router;

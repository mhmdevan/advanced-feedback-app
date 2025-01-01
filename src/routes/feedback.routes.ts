import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
} from "../controllers/feedback.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Create a new feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", authenticateToken, createFeedback);

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Get all feedbacks
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: List of feedbacks
 *       500:
 *         description: Server error
 */
router.get("/", getAllFeedbacks);

export default router;

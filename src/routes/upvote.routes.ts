import express from "express";
import { upvoteFeedback } from "../controllers/upvote.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/upvote:
 *   post:
 *     summary: Upvote a feedback
 *     tags: [Upvote]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedbackId:
 *                 type: integer
 *                 description: ID of the feedback to upvote
 *     responses:
 *       201:
 *         description: Upvote created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     feedbackId:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *       400:
 *         description: Feedback ID is required
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Server error
 */
router.post("/", authenticateToken, upvoteFeedback);

export default router;

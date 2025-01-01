import { Request, Response } from "express";
import * as UpvoteService from "../services/upvote.service";
import * as FeedbackService from "../services/feedback.service";
import { createResponse } from "../utils/response.util";

export const upvoteFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { feedbackId } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    res.status(403).json(createResponse(false, null, "Unauthorized"));
    return;
  }

  if (!feedbackId) {
    res
      .status(400)
      .json(createResponse(false, null, "Feedback ID is required"));
    return;
  }

  try {
    const feedback = await FeedbackService.findFeedbackById(feedbackId);
    if (!feedback) {
      res.status(404).json(createResponse(false, null, "Feedback not found"));
      return;
    }

    const upvote = await UpvoteService.createUpvote(userId, feedbackId);
    res
      .status(201)
      .json(createResponse(true, upvote, "Upvote created successfully"));
  } catch (error) {
    console.error("Error creating upvote:", error);
    res
      .status(500)
      .json(
        createResponse(
          false,
          null,
          error instanceof Error ? error.message : "Unknown error occurred"
        )
      );
  }
};

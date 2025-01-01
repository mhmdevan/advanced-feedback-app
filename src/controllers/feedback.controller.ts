import { Request, Response } from "express";
import * as FeedbackService from "../services/feedback.service";
import { createResponse } from "../utils/response.util";

export const createFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, category, status } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    res.status(403).json(createResponse(false, null, "Unauthorized"));
    return;
  }

  try {
    const feedback = await FeedbackService.createFeedback(
      title,
      description,
      category,
      status,
      userId
    );
    res
      .status(201)
      .json(createResponse(true, feedback, "Feedback created successfully"));
  } catch (error) {
    console.error("Error creating feedback:", error);
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

export const getAllFeedbacks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const feedbacks = await FeedbackService.getAllFeedbacks();
    res
      .status(200)
      .json(
        createResponse(true, feedbacks, "Feedbacks retrieved successfully")
      );
  } catch (error) {
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

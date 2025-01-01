import prisma from "../config/database";

export const createUpvote = async (userId: number, feedbackId: number) => {
  return prisma.upvote.create({
    data: { userId, feedbackId },
  });
};

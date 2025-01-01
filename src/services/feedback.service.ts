import prisma from "../config/database";

export const createFeedback = async (
  title: string,
  description: string,
  category: string,
  status: string,
  authorId: number
) => {
  return prisma.feedback.create({
    data: { title, description, category, status, authorId },
  });
};

export const getAllFeedbacks = async () => {
  return prisma.feedback.findMany();
};

export const findFeedbackById = async (id: number) => {
  return prisma.feedback.findUnique({ where: { id } });
};

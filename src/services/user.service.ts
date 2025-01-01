import bcrypt from "bcrypt";
import prisma from "../config/database";
import { generateToken } from "../utils/jwt.util";

export const createUser = async (
  email: string,
  password: string,
  avatar?: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { email, password: hashedPassword, avatar },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const validatePassword = async (plainText: string, hashed: string) => {
  return bcrypt.compare(plainText, hashed);
};

export const generateUserToken = (userId: number) => {
  return generateToken(userId);
};

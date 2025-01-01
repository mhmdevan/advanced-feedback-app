import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import { createResponse } from "../utils/response.util";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, avatar } = req.body;

  try {
    const user = await UserService.createUser(email, password, avatar);
    res
      .status(201)
      .json(
        createResponse(
          true,
          { id: user.id, email: user.email },
          "User registered successfully"
        )
      );
  } catch (error) {
    console.error("Error during user registration:", error);
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

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      res.status(404).json(createResponse(false, null, "User not found"));
      return;
    }

    const isValid = await UserService.validatePassword(password, user.password);
    if (!isValid) {
      res.status(401).json(createResponse(false, null, "Invalid credentials"));
      return;
    }

    const token = UserService.generateUserToken(user.id);
    res.json(createResponse(true, { token }, "Login successful"));
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

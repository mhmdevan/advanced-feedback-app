import request from "supertest";
import app from "../app";
import prisma from "../config/database";
import bcrypt from "bcrypt";

let userId: number;

describe("User API", () => {
  beforeAll(async () => {
    const email = "test-login@example.com";
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    userId = user.id;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        id: userId,
      },
    });
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/user/register")
      .send({
        email: `test-register${Date.now()}@example.com`,
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("should login a user", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "test-login@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });
});

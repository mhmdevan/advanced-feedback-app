import request from "supertest";
import app from "../app";
import prisma from "../config/database";
import bcrypt from "bcrypt";

let token: string;
let feedbackId: number;

describe("Upvote API", () => {
  beforeAll(async () => {
    const email = `test-upvote${Date.now()}@example.com`;
    const password = "password123";

    const user = await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    const loginResponse = await request(app).post("/api/user/login").send({
      email,
      password,
    });

    token = loginResponse.body.data.token;

    const feedbackResponse = await request(app)
      .post("/api/feedback")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Upvote Feedback",
        description: "This feedback is for testing upvotes.",
        category: "Test",
        status: "Idea",
      });

    feedbackId = feedbackResponse.body.data.id;
  });

  afterAll(async () => {
    await prisma.upvote.deleteMany({
      where: {
        feedbackId,
      },
    });

    await prisma.feedback.deleteMany({
      where: {
        id: feedbackId,
      },
    });
  });

  it("should create an upvote", async () => {
    const res = await request(app)
      .post("/api/upvote")
      .set("Authorization", `Bearer ${token}`)
      .send({ feedbackId });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});

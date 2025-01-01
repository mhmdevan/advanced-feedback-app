import request from "supertest";
import app from "../app";
import prisma from "../config/database";
import bcrypt from "bcrypt";

let token: string;
let feedbackId: number;

describe("Feedback API", () => {
  beforeAll(async () => {
    const email = `test-feedback${Date.now()}@example.com`;
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
  });

  afterAll(async () => {
    await prisma.feedback.deleteMany({
      where: {
        id: feedbackId,
      },
    });
  });

  it("should create feedback", async () => {
    const res = await request(app)
      .post("/api/feedback")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Feedback",
        description: "This is a test feedback.",
        category: "UI",
        status: "Idea",
      });

    feedbackId = res.body.data.id;

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("should retrieve all feedbacks", async () => {
    const res = await request(app).get("/api/feedback");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
  });
});

import express from "express";
import dotenv from "dotenv";
import feedbackRoutes from "./routes/feedback.routes";
import userRoutes from "./routes/user.routes";
import upvoteRoutes from "./routes/upvote.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/feedback", feedbackRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upvote", upvoteRoutes);

export default app;

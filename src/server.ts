import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./config/swagger.config";

const app = express();
const PORT = 3000;

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

import userRoutes from "./routes/user.routes";
import feedbackRoutes from "./routes/feedback.routes";
import upvoteRoutes from "./routes/upvote.routes";

app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/upvote", upvoteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});

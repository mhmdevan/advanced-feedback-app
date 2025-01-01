import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Advanced Feedback App API",
      version: "1.0.0",
      description: "API documentation for the Advanced Feedback App",
    },
    servers: [
      {
        url: "http://localhost:3000", // Update with your server's base URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the route files
};

export default swaggerOptions;

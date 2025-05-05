// Import the Express module
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// Import the index routes module
import indexRoutes from "./routes/index.js";
// This should be declared under - import indexRoutes from "./routes/index.js";
import userRoutes from "./routes/v1/user.js";
import teamRoutes from "./routes/v1/team.js";
import playerRoutes from "./routes/v1/player.js";
import { isContentTypeApplicationJSON } from "./middleware/utils.js";

// Create an Express application
const app = express();

// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads. For example, form data
// Use the routes module
app.use(express.json()); // To parse the incoming requests with JSON payloads. For example, REST API requests
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Football data API",
      version: "1.0.0",
      description: "An API for any kind of football information",
      contact: {
        name: "Hugo Smith",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/v1/*.js"],
};

// This should be declared under - const swaggerOptions = { ... };
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(isContentTypeApplicationJSON);

app.use("/", indexRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/players", playerRoutes);


// Start the server on port 3000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;
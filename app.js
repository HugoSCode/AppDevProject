// Import the Express module
import dotenv from 'dotenv';
if (process.env.APP_ENV === 'development') {
  dotenv.config();
}
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// Import the index routes module
import indexRoutes from "./routes/index.js";
// This should be declared under - import indexRoutes from "./routes/index.js";
import userRoutes from "./routes/v1/user.js";
import teamRoutes from "./routes/v1/team.js";
import playerRoutes from "./routes/v1/player.js";
import matchRoutes from "./routes/v1/match.js";
import matchEventRoutes from "./routes/v1/matchEvent.js";
import leagueRoutes from "./routes/v1/league.js";
import teamStatsRoutes from "./routes/v1/teamStats.js";
import transferRoutes from "./routes/v1/transfer.js";
import playerStatisticsRoutes from "./routes/v1/playerStatistics.js";
import injuryRoutes from "./routes/v1/injury.js";
import { isContentTypeApplicationJSON } from "./middleware/utils.js";
import authRoutes from "./routes/v1/auth.js";
import jwtAuth from "./middleware/jwtAuth.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';




const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.disable('x-powered-by');

//Log to combined log file
app.use((req, res, next) => {
  const logs = [];

  // Capture the original send method
  const originalSend = res.send;

  // Intercept response body
  res.send = function (body) {
    logs.push(typeof body === 'string' ? body : JSON.stringify(body));
    res.send = originalSend;
    return res.send(body);
  };

  // When response finishes, log request and response
  res.on('finish', () => {
    const log = `
[${new Date().toISOString()}]
Request:
  ${req.method} ${req.originalUrl}
  Headers: ${JSON.stringify(req.headers)}
  Body: ${JSON.stringify(req.body)}

Response:
  Status: ${res.statusCode}
  Body: ${logs.join('')}

------------------------------
`;

    fs.appendFile(path.join(__dirname, 'combined.log'), log, err => {
      if (err) console.error('Failed to write log:', err);
    });
  });

  next();
});

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(isContentTypeApplicationJSON);

app.use("/", indexRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1/users", jwtAuth, userRoutes);
app.use("/api/v1/teams", jwtAuth, teamRoutes);
app.use("/api/v1/players", jwtAuth, playerRoutes);
app.use("/api/v1/matches", jwtAuth, matchRoutes);
app.use("/api/v1/matchEvents", jwtAuth, matchEventRoutes);
app.use("/api/v1/leagues", jwtAuth, leagueRoutes);
app.use('/api/v1/teamStats', jwtAuth, teamStatsRoutes);
app.use('/api/v1/transfers', jwtAuth, transferRoutes);
app.use('/api/v1/playerStatistics', jwtAuth, playerStatisticsRoutes);
app.use('/api/v1/injuries', jwtAuth, injuryRoutes);
app.use("/api/v1/auth",  authRoutes);




// Export the Express application. May be used by other modules. For example, API testing
export default app;
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";

/* Config */
import config from "./config/config";

/* Routes */
import routes from "./routes";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin:
      config.mode === "dev"
        ? ["http://localhost:5173", "http://localhost:4200"]
        : "*",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(config.apiRoute as string, routes);

export default app;

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import "dotenv/config";

/* Routes */
import franchiseRoutes from "./routes/franchise.router";
import loginRoutes from "./routes/login.router";
import saleRoutes from "./routes/sale.route";
import userRoutes from "./routes/user.router";
import userTypeRoutes from "./routes/userType.route";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(userRoutes);
app.use(userTypeRoutes);
app.use(franchiseRoutes);
app.use(saleRoutes);
app.use(loginRoutes);

export default app;

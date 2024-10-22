import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser';
import 'dotenv/config'

/* Routes */
import userRoutes from "./routes/user.router";
import userTypeRoutes from "./routes/userType.route";
import productRoutes from "./routes/product.router";
import franchiseRoutes from "./routes/franchise.router";
import saleRoutes from "./routes/sale.route";
import loginRoutes from "./routes/login.router";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(userRoutes);
app.use(userTypeRoutes);
app.use(productRoutes);
app.use(franchiseRoutes);
app.use(saleRoutes);
app.use(loginRoutes);

export default app;

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";

/* Routes */
import franchiseRouter from "./routes/franchise.router";
import authRouter from "./routes/auth.router";
import productRouter from "./routes/product.router";
import roleRouter from "./routes/role.router";
import saleRouter from "./routes/sale.router";
import userRouter from "./routes/user.router";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(franchiseRouter);
app.use(authRouter);
app.use(productRouter);
app.use(roleRouter);
app.use(userRouter);
app.use(saleRouter);

export default app;

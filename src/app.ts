import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";

/* Routes */
import franchiseRouter from "./routes/franchise.router";
import loginRouter from "./routes/login.router";
import productRouter from "./routes/product.router";
import saleRouter from "./routes/sale.router";
import userRouter from "./routes/user.router";
import userTypeRouter from "./routes/userType.router";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(franchiseRouter);
app.use(loginRouter);
app.use(productRouter);
app.use(userRouter);
app.use(userTypeRouter);
app.use(saleRouter);

export default app;

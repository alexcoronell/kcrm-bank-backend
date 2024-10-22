import express from "express";
import morgan from "morgan";
import cors from "cors";

/* Routes */
import userRoutes from "./routes/user.router";
import userTypeRoutes from "./routes/userType.route";
import productRoutes from "./routes/product.router";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(userTypeRoutes);
app.use(productRoutes);

export default app;

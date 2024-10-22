import express from "express";
import morgan from "morgan";
import cors from "cors";

/* Routes */
import userRoutes from "./routes/user.router";
import userTypeRoutes from "./routes/userType.route";
import productRoutes from "./routes/product.router";
import franchiseRoutes from "./routes/franchise.router";
import saleRoutes from "./routes/sale.route";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(userTypeRoutes);
app.use(productRoutes);
app.use(franchiseRoutes);
app.use(saleRoutes);

export default app;

import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

import authRouter from "./auth.router";
import franchiseRouter from "./franchise.router";
import productRouter from "./product.router";
import roleRouter from "./role.router";
import saleRouter from "./sale.router";
import userRouter from "./user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/franchises", authMiddleware, franchiseRouter);
router.use("/products", authMiddleware, productRouter);
router.use("/roles", authMiddleware, roleRouter);
router.use("/sales", authMiddleware, saleRouter);
router.use("/users", authMiddleware, userRouter);

export default router;

import { Router } from "express";

/* Middlewares */
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

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
router.use("/sales", authMiddleware, saleRouter);
router.use("/roles", [authMiddleware, adminMiddleware], roleRouter);
router.use("/users", [authMiddleware, adminMiddleware], userRouter);

export default router;

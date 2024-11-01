import { Router } from "express";

import authRouter from "./auth.router";
import franchiseRouter from "./franchise.router";
import productRouter from "./product.router";
import roleRouter from "./role.router";
import saleRouter from "./sale.router";
import userRouter from "./user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/franchises", franchiseRouter);
router.use("/products", productRouter);
router.use("/roles", roleRouter);
router.use("/sales", saleRouter);
router.use("/users", userRouter);

export default router;

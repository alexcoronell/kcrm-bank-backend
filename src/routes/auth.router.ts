import { Router } from "express";

import { checkJwt } from "../middlewares/jwt.middleware";

import { login, refreshToken } from "../controllers/auth.controller";

const router = Router();

/* Login */
router.post("/login", (req, res) => {
  login(req, res);
});

router.post("/refresh-token", (req, res) => {
  refreshToken(req, res);
});

export default router;
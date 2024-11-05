import { Router } from "express";

import { checkJwt } from "../middlewares/jwt.middleware";

import { login, logout, refreshToken, verifySession } from "../controllers/auth.controller";

const router = Router();

/* Login */
router.post("/login", (req, res) => {
  login(req, res);
});

router.get("/logout", (req, res) => {
  logout(req, res);
})

router.post("/refresh-token", (req, res) => {
  refreshToken(req, res);
});

router.get("/verify-session", (req, res) => {
  verifySession(req, res)
})

export default router;
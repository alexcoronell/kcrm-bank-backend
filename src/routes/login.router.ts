import { Router } from "express";

const router = Router();

/* Controllers */
import {
  login
} from "../controllers/login.controller";

const baseRoute = "login";

router.post(`/${baseRoute}`, (req, res) => {
  login(req, res);
});


export default router;
import { Router } from "express";

const router = Router();

/* Controllers */
import {
  create,
  deleteUser,
  get,
  getAll,
  update,
  updatePassword,
} from "../controllers/user.controller";

router.post("/", (req, res) => {
  create(req, res);
});

router.get("/", (req, res) => {
  getAll(req, res);
});

router.patch("/password/:id", (req, res) => {
  updatePassword(req, res);
});

router.get("/:id", (req, res) => {
  get(req, res);
});

router.patch("/:id", (req, res) => {
  update(req, res);
});

router.delete("/:id", (req, res) => {
  deleteUser(req, res);
});

export default router;

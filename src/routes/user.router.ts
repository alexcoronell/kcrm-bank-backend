import { Router } from "express";

const router = Router();

/* Controllers */
import {
  activate,
  create,
  deactivate,
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

router.put("/password/:id", (req, res) => {
  updatePassword(req, res);
});

router.get("/:id", (req, res) => {
  get(req, res);
});

router.put("/:id", (req, res) => {
  update(req, res);
});

router.put("/activate/:id", (req, res) => {
  activate(req, res);
});

router.put("/deactivate/:id", (req, res) => {
  deactivate(req, res);
});

router.delete("/:id", (req, res) => {
  deleteUser(req, res);
});

export default router;

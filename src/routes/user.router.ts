import { Router } from "express";

const router = Router();

/* Controllers */
import {
  create,
  getAll,
  get,
  update,
  updatePassword,
  activate,
  deactivate,
  deleteUser,
} from "../controllers/user.controller";

router.post("/users", (req, res) => {
  create(req, res);
});

router.get("/users", (req, res) => {
  getAll(req, res);
});

router.put("/users/password/:id", (req, res) => {
  updatePassword(req, res);
});

router.get("/users/:id", (req, res) => {
  get(req, res);
});

router.put("/users/:id", (req, res) => {
  update(req, res);
});


router.put("/users/activate/:id", (req, res) => {
  activate(req, res);
});

router.put("/users/deactivate/:id", (req, res) => {
  deactivate(req, res);
});

router.delete("/users/:id", (req, res) => {
  deleteUser(req, res);
});

export default router;

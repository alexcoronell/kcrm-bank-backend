import { Router } from "express";

const router = Router();

/* Controllers */
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updatePasswordUser,
  activateUser,
  inactivateUser,
  deleteUser,
} from "../controllers/user.controller";

router.post("/users", (req, res) => {
  createUser(req, res);
});

router.get("/users", (req, res) => {
  getUsers(req, res);
});

router.put("/users/password/:id", (req, res) => {
  updatePasswordUser(req, res);
});

router.get("/users/:id", (req, res) => {
  getUser(req, res);
});

router.put("/users/:id", (req, res) => {
  updateUser(req, res);
});


router.put("/users/activate/:id", (req, res) => {
  activateUser(req, res);
});

router.put("/users/inactivate/:id", (req, res) => {
  inactivateUser(req, res);
});

router.delete("/users/:id", (req, res) => {
  deleteUser(req, res);
});

export default router;

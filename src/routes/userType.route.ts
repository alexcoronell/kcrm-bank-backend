import { Router } from "express";

const router = Router();

/* Controllers */
import {
  create,
  getAll,
  get,
  update,
  activate,
  deactivate,
  deleteUserType,
} from "../controllers/userType.controller";

const baseRoute = "user-types";

router.post(`/${baseRoute}`, (req, res) => {
  create(req, res);
});

router.get(`/${baseRoute}`, (req, res) => {
  getAll(req, res);
});

router.get(`/${baseRoute}/:id`, (req, res) => {
  get(req, res);
});

router.put(`/${baseRoute}/:id`, (req, res) => {
  update(req, res);
});

router.put(`/${baseRoute}/activate/:id`, (req, res) => {
  activate(req, res);
});

router.put(`/${baseRoute}/deactivate/:id`, (req, res) => {
  deactivate(req, res);
});

router.delete(`/${baseRoute}/:id`, (req, res) => {
  deleteUserType(req, res);
});

export default router;
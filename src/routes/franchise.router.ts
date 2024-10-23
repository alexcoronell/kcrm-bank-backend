import { Router } from "express";

const router = Router();

/* Controllers */
import {
  create,
  countTotal,
  getAll,
  get,
  update,
  remove,
} from "../controllers/franchise.controller";

const baseRoute = "franchises";

router.post(`/${baseRoute}`, (req, res) => {
  create(req, res);
});

router.get(`/${baseRoute}`, (req, res) => {
  getAll(req, res);
});

router.get(`/${baseRoute}/count`, (req, res) => {
  countTotal(req, res);
});

router.get(`/${baseRoute}/:id`, (req, res) => {
  get(req, res);
});

router.put(`/${baseRoute}/:id`, (req, res) => {
  update(req, res);
});

router.delete(`/${baseRoute}/:id`, (req, res) => {
  remove(req, res);
});

export default router;

import { Router } from "express";

const router = Router();

/* Controllers */
import {
  countTotal,
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/product.controller";

router.post("/", (req, res) => {
  create(req, res);
});

router.get("/", (req, res) => {
  getAll(req, res);
});

router.get("/count", (req, res) => {
  countTotal(req, res);
});

router.get("/:id", (req, res) => {
  get(req, res);
});

router.put("/:id", (req, res) => {
  update(req, res);
});

router.delete("/:id", (req, res) => {
  remove(req, res);
});

export default router;

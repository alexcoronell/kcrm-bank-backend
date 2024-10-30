import { Router } from "express";

const router = Router();

/* Controllers */
import {
	countTotal,
	create,
	get,
	getAll,
	getAllSimple,
	remove,
	update,
} from "../controllers/userType.controller";

const baseRoute = "user-types";

router.post(`/${baseRoute}`, (req, res) => {
	create(req, res);
});

router.get(`/${baseRoute}`, (req, res) => {
	getAll(req, res);
});

router.get(`/${baseRoute}/simple`, (req, res) => {
	getAllSimple(req, res);
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

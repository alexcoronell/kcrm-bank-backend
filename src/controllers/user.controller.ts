import * as bcrypt from "bcrypt";
import type { Request, Response } from "express";

/* Entities */
import { User } from "../entities/User.entity";

/* Helpers */
import pagination from "../helpers/pagination.helper";

export const create = async (req: Request, res: Response) => {
	try {
		const { name, email, password, role } = req.body;
		try {
			const { email } = req.body;
			const user = await User.findOneBy({email});
			if(user) return res.status(409).json({ message: 'Username already taken' });
		}catch (e) {
			if (e instanceof Error) {
				return res.status(500).json({ message: e.message });
			}
		}
		const user = new User();
		const hashPassword = await bcrypt.hash(password, 10);
		user.name = name;
		user.email = email;
		user.password = hashPassword;
		user.role = role;
		await user.save();
		return res.status(201).json({message: "User saved"});
	} catch (e) {
		if (e instanceof Error) {
			return res.status(500).json({ message: e.message });
		}
	}
};

export const getAll = async (req: Request, res: Response) => {
	const { take, skip } = pagination(req);
	try {
		const users = await User.findAndCount({
			relations: ["role"],
			where: { deleted: false },
			order: { id: "DESC" },
			take,
			skip,
		});
		const [items, count] = users;
		return res.status(200).json({ items, count });
	} catch (e) {
		if (e instanceof Error) {
			return res.status(500).json({ message: e.message });
		}
	}
};

export const get = async (req: Request, res: Response) => {
	try {
		const id: number = Number.parseInt(req.params.id);
		const user = await User.findOne({
			where: { id },
			relations: ["role"],
		});
		if (!user) return res.status(404).json({ message: "User does not exist" });
		const { password, ...rta } = user;
		return res.json(rta);
	} catch (e) {
		if (e instanceof Error) {
			return res.status(500).json({ message: e.message });
		}
	}
};

export const update = async (req: Request, res: Response) => {
	try {
		const id: number = Number.parseInt(req.params.id);
		const user = await User.findOneBy({ id });
		if (!user) return res.status(404).json({ message: "User does not exist" });
		const { name, email, role } = req.body;
		User.merge(user, {name, email, role})
		User.save(user);
		return res.status(204).json({message: "User updated"});
	} catch (e) {
		if (e instanceof Error) {
			return res.status(500).json({ message: e.message });
		}
	}
};

export const updatePassword = async (req: Request, res: Response) => {
	try {
		const id: number = Number.parseInt(req.params.id);
		const user = await User.findOneBy({ id });
		if (!user) return res.status(404).json({ message: "User does not exist" });
		const { password } = req.body;
		const hashPassword = await bcrypt.hash(password, 10);
		await User.merge(user, { password: hashPassword });
		await User.save(user)
		return res.status(204).json({message: "Password Updated"});
	} catch (e) {
		if (e instanceof Error) {
			console.log(e)
			return res.status(500).json({ message: e.message });
		}
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const id: number = Number.parseInt(req.params.id);
		const user = await User.findOneBy({ id });
		if (!user) return res.status(404).json({ message: "User does not exist" });
		await User.update({ id }, { deleted: true });
		return res.status(204).json({message: "User deleted"});
	} catch (e) {
		if (e instanceof Error) {
			return res.status(500).json({ message: e.message });
		}
	}
};

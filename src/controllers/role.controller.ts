import type { Request, Response } from "express";

/* Entities */
import { Role } from "../entities/Role.entity";

/* Helpers */
import pagination from "../helpers/pagination.helper";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, isAdmin } = req.body;
    const roleName = await Role.findOneBy({ name });
    if (roleName)
      return res.status(409).json({ message: "Role already exists" });
    const role = new Role();
    role.name = name;
    role.isAdmin = isAdmin;
    await role.save();
    return res.status(201).json(role);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const countTotal = async (req: Request, res: Response) => {
  try {
    const total = await Role.count({
      where: { deleted: false },
    });
    return res.status(200).json(total);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const getAll = async (req: Request, res: Response) => {
  const { take, skip } = pagination(req);

  try {
    const role = await Role.findAndCount({
      where: { deleted: false },
      order: { name: "ASC" },
      take,
      skip,
    });
    const [items, count] = role;
    return res.status(200).json({ items, count });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const getAllSimple = async (req: Request, res: Response) => {
  try {
    const role = await Role.find({
      select: ["id", "name"],
      where: { deleted: false, active: true },
      order: { name: "ASC" },
    });
    return res.status(200).json(role);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const role = await Role.findOneBy({ id });
    if (!role) return res.status(404).json({ message: "Role does not exist" });
    return res.json(role);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const role = await Role.findOneBy({ id });
    if (!role) return res.status(404).json({ message: "Role does not exist" });
    const { name, isAdmin, active } = req.body;
    await Role.update({ id }, { name, isAdmin, active });
    return res.sendStatus(204);
  } catch (e) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const { code } = e as any;
    if (code === "23505")
      return res.status(409).json({ message: "Role already exists" });
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const role = await Role.findOneBy({ id });
    if (!role)
      return res.status(404).json({ message: "User Type does not exist" });
    await Role.update({ id }, { deleted: true });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

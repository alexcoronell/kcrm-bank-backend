import type { Request, Response } from "express";

/* Entities */
import { Franchise } from "../entities/Franchise.entity";

/* Helpers */
import pagination from "../helpers/pagination.helper";
export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const franchiseName = await Franchise.findOneBy({
      name: name.toUpperCase(),
    });
    if (franchiseName)
      return res.status(409).json({ message: "Name is already taken" });
    const franchise = new Franchise();
    franchise.name = name.toUpperCase();
    await franchise.save();
    return res.status(201).json(franchise);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const countTotal = async (req: Request, res: Response) => {
  try {
    const total = await Franchise.count({
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
    const franchises = await Franchise.findAndCount({
      where: { deleted: false },
      order: { id: "DESC" },
      take,
      skip,
    });
    const [items, count] = franchises;
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
    const franchise = await Franchise.findOneBy({ id });
    if (!franchise)
      return res.status(404).json({ message: "Franchise does not exist" });
    return res.json(franchise);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const franchise = await Franchise.findOneBy({ id });
    if (!franchise)
      return res.status(404).json({ message: "Franchise does not exist" });
    const { name, active } = req.body;
    await Franchise.update({ id }, { name: name.toUpperCase(), active });
    return res.sendStatus(204);
  } catch (e) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const { code } = e as any;
    if (code === "23505")
      return res.status(409).json({ message: "Franchise already exists" });
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id: number = Number.parseInt(req.params.id);
    const franchise = await Franchise.findOneBy({ id });
    if (!franchise)
      return res.status(404).json({ message: "Franchise does not exist" });
    await Franchise.update({ id }, { deleted: true });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

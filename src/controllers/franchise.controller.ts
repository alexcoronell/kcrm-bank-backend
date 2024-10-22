import { Request, Response } from "express";

import { Franchise } from "../entities/Franchise.entity";

export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const franchise = new Franchise();
    franchise.name = name.toUpperCase();
    await franchise.save();
    return res.json(franchise);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const franchises = await Franchise.find();
    return res.json(franchises);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
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
    const id: number = parseInt(req.params.id);
    const franchise = await Franchise.findOneBy({ id });
    if (!franchise)
      return res.status(404).json({ message: "Franchise does not exist" });
    const { name } = req.body;
    await Franchise.update({ id }, { name: name.toUpperCase() });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const activate = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const franchise = await Franchise.findOneBy({ id });
    if (!franchise)
      return res.status(404).json({ message: "Franchise does not exist" });
    await Franchise.update({ id }, { active: true });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const deactivate = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const franchise = await Franchise.findOneBy({ id });
    if (!franchise)
      return res.status(404).json({ message: "Franchise does not exist" });
    await Franchise.update({ id }, { active: false });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const deleteFranchise = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
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

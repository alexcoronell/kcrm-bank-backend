import { Request, Response } from "express";

import { UserType } from "../entities/UserType.entity";

export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userType = new UserType();
    userType.name = name;
    await userType.save();
    return res.status(201).json(userType);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const countTotal = async (req: Request, res: Response) => {
  try {
    const total = await UserType.count({
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
  try {
    const userTypes = await UserType.find({
      where: { deleted: false}
    });
    return res.status(200).json(userTypes);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const userType = await UserType.findOneBy({ id });
    if (!userType)
      return res.status(404).json({ message: "User Type does not exist" });
    return res.json(userType);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const userType = await UserType.findOneBy({ id });
    if (!userType)
      return res.status(404).json({ message: "User Type does not exist" });
    const { name } = req.body;
    await UserType.update({ id }, { name });
    await userType.save();
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const userType = await UserType.findOneBy({ id });
    if (!userType)
      return res.status(404).json({ message: "User Type does not exist" });
    await UserType.update({ id }, { deleted: true });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

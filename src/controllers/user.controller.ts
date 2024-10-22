import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';

import { User } from "../entities/User.entity";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, email, password, userType } = req.body;
    const user = new User();
    const hashPassword = await bcrypt.hash(password, 10)
    user.name = name;
    user.email = email;
    user.password = hashPassword;
    user.userType = userType;
    await user.save();
    return res.json(user);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const user = await User.findOne({
      where: {id},
      relations: ['userType']
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
    const id: number = parseInt(req.params.id);
    const user = await User.findOneBy({ id });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    const { name, email, userType } = req.body;
    const body = {
      name,
      email,
      userType,
    };
    User.update({id}, body)
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const user = await User.findOneBy({ id });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10)
    await User.update({ id }, { password: hashPassword });
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
    const user = await User.findOneBy({ id });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    await User.update({ id }, { active: true });
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
    const user = await User.findOneBy({ id });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    await User.update({ id }, { active: false });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    console.log(id);
    const user = await User.findOneBy({ id });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    await User.update({ id }, { deleted: true });
    return res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

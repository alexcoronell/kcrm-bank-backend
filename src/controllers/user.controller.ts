import { Request, Response } from "express";

import { User } from "../entities/User.entity";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, userType } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.userType = userType;
    await user.save();
    return res.json(user);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const user = await User.findOneBy({ id });
  if (!user) return res.status(404).json({ message: "User does not exist" });
  return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const user = await User.findOneBy({ id });
  if (!user) return res.status(404).json({ message: "User does not exist" });
  const { name, email, userType } = req.body;
  user.name = name;
  user.email = email;
  user.userType = userType;
  await user.save();

  return res.sendStatus(204);
};

export const updatePasswordUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const user = await User.findOneBy({ id });
  if (!user) return res.status(404).json({ message: "User does not exist" });
  const { password } = req.body;
  user.password = password;
  await user.save();

  return res.sendStatus(204);
};

export const activateUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const user = await User.findOneBy({ id });
  if (!user) return res.status(404).json({ message: "User does not exist" });
  user.active = true;
  await user.save();

  return res.sendStatus(204);
};

export const inactivateUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const user = await User.findOneBy({ id });
  if (!user) return res.status(404).json({ message: "User does not exist" });
  user.active = false;
  await user.save();

  return res.sendStatus(204);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  console.log(id);
  const user = await User.findOneBy({ id });
  if (!user) return res.status(404).json({ message: "User does not exist" });
  user.deleted = true;
  await user.save();

  return res.sendStatus(204);
};

import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

import { User } from "../entities/User.entity";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOneBy({ email });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...rta } = user;
      return res.json(rta);
    } else {
      return null;
    }
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

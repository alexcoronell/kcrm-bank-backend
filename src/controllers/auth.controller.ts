import * as bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

/* Entities */
import { User } from "../entities/User.entity";
import type { Role } from "../entities/Role.entity";

/* Models */
import type { TokenDto } from "../dtos/token.dto";

/* Interfaces */
import type { PayloadToken } from "../interfaces/PayloadToken.interface";

/* Config */
import config from "../config/config";

/* Helpers */
import { setCookies } from "../helpers/setCookies";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      relations: ["role"],
      where: { email, deleted: false, active: true },
    });
    if (!user) return res.status(404).json({ message: "Invalid Login" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { token: accessToken, isAdmin } = generateJWT(user);
      const { token: refreshToken } = generateJWT(user, true);
      setCookies(res, accessToken, refreshToken)
      return res.send({ message: "OK", accessToken, refreshToken, isAdmin });
    }
    return res.status(404).json({ message: "Invalid Login" });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.headers.refresh as string;

  if (!refreshToken) {
    return res.status(400).json({ message: "Something goes wrong!" });
  }

  try {
    const verifyResult = jwt.verify(
      refreshToken,
      config.jwtSecretRefresh as string
    );
    const { email } = verifyResult as User;
    const user = await User.findOneOrFail({
      where: { email },
      relations: ["role"],
    });
    const token = generateJWT(user);
    return res.json({ message: "OK", token });
  } catch (e) {
    return res.status(400).json({ message: "Something is wrong!" });
  }
};

const generateJWT = (user: User, refresh = false) => {
  const { id, role } = user;
  const { isAdmin } = role as unknown as Role;
  const secret = refresh ? config.jwtSecretRefresh : config.jwtSecret;
  const expiresIn = refresh ? config.jwtRefreshExpiresIn : Number.parseInt(config.jwtExpiresIn as string);
  const payload: PayloadToken = { user: id, isAdmin };
  return {
    token: jwt.sign(payload, secret as string, { expiresIn }),
    isAdmin,
  };
};

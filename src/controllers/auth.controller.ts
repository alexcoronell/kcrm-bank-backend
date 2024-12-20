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
import generateJWT from "../helpers/generateJWT.helper";
import {
  setCookies,
  setAccessTokenCookie,
  getCookies,
  clearCookies,
} from "../helpers/cookies.helper";

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
      const { token: accessToken, isAdmin, publicUser } = generateJWT(user);
      const { token: refreshToken } = generateJWT(user, true);
      setCookies(res, accessToken, refreshToken);
      return res.status(200).send({ message: "OK", isAdmin, user: publicUser });
    }
    return res.status(404).json({ message: "Invalid Login" });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Complete logout" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.headers.refresh as string;

  if (!refreshToken) {
    clearCookies(res);
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

export const verifySession = async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await getCookies(req);
  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ session: false, message: "Token does't exist" });
  }

  if (!accessToken && refreshToken) {
    const refreshTokenDecoded = jwt.verify(
      refreshToken,
      config?.jwtSecretRefresh as string
    );
    const { user: id } = refreshTokenDecoded as PayloadToken;
    try {
      const user = await User.findOne({
        relations: ["role"],
        where: { id, deleted: false, active: true },
      });
      if(!user) {
        return res.status(401).json({message: "Invalid Token"})
      }
      const { token: accessToken, isAdmin, publicUser } = generateJWT(user);
      setAccessTokenCookie(res, accessToken)
      return res.status(200).send({ message: "OK", isAdmin, user: publicUser });
    } catch(e) {
      console.error(e)
      return res.status(401).json({message: "Invalid Token"})
    }
  }
};
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

const JwtSecret: string = process.env.JWT_SECRET as string;
const JwtSecretRefresh: string = process.env.JWT_SECRET as string;

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
      const { accessToken, publicUser } = generateJWT(user);
      console.log(JwtSecret);
      return res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .send({ user: publicUser, accessToken });
    }
    return res.status(404).json({ message: "Invalid Login" });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
};

const generateJWT = (user: User) => {
  const { id, role } = user;
  const { isAdmin } = role as unknown as Role;
  const expiresIn = 60;
  const payload = { user: id, isAdmin };
  const { password, ...publicUser } = user;
  return {
    accessToken: jwt.sign(payload, JwtSecret, { expiresIn }),
    publicUser,
  };
};

const generateRefreshToken = (payload: PayloadToken) => {
  const expiresIn = 86400;
  return jwt.sign(payload, JwtSecret, { expiresIn });
};

const refreshToken = (dto: TokenDto) => {
  const expiresIn = 60;
  const userToken = jwt.decode(dto.refresh);
  const { user, isAdmin } = userToken as PayloadToken;
  const payload: PayloadToken = { user, isAdmin };
  return { accessToken: jwt.sign(payload, JwtSecret, { expiresIn }) };
};

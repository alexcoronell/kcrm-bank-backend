import type { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { User } from "../entities/User.entity";

import generateJWT from "../helpers/generateJWT.helper";
import { getCookies, setAccessTokenCookie } from "../helpers/cookies.helper";

const jwtSecret: string = process.env.JWT_SECRET as string;
const jwtSecretRefresh: string = process.env.JWT_SECRET_REFRESH as string;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<any> => {
  const { accessToken, refreshToken } = await getCookies(req);
  const token = <string>req.headers.auth;
    
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Tokens not found" });
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, jwtSecret);
    return next();
  } catch (e) {
    const decodedRefreshToken = jwt.verify(refreshToken, jwtSecretRefresh);
    const { user: id } = decodedRefreshToken as any;
    const user = await User.findOneOrFail({
      where: { id },
      relations: ["role"],
    });
    const { token: accessToken } = generateJWT(user);
    setAccessTokenCookie(res, accessToken);
    return next()
  }
};

import type { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { User } from "../entities/User.entity";
import { getCookies, setAccessTokenCookie } from "../helpers/cookies.helper";

const jwtSecret: string = process.env.JWT_SECRET as string;

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = await getCookies(req);

  if (!accessToken) {
    return res.status(401).json({ message: "Tokens not found" });
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, jwtSecret);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const { isAdmin } = decodedAccessToken as any;
    console.log("*********** isAdmin: ", isAdmin)
    console.log("*********** decoded: ", decodedAccessToken)
    if(!isAdmin) return res.status(401).json({message: "Unauthorized"})
    return next();
  } catch (e) {
    console.log(e);
  }
};

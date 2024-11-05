import type { Request, Response } from "express";
import type { CookieOptions } from "express";

import config from "../config/config";

const accessTokenOptions: CookieOptions = {
  httpOnly: config.mode === "prod",
  secure: config.mode === "prod",
  sameSite: "strict",
  maxAge: 120000,
};

const refreshTokenOptions: CookieOptions = {
  httpOnly: config.mode === "prod",
  secure: config.mode === "prod",
  sameSite: "strict",
  maxAge: 28800000,
};

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res
    .cookie("access_token", accessToken, accessTokenOptions)
    .cookie("refresh_token", refreshToken, refreshTokenOptions);
};

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
  res.cookie("access_token", accessToken, accessTokenOptions);
};

export const getCookies = async (req: Request) => {
  const accessToken = await req.cookies.access_token;
  const refreshToken = await req.cookies.refresh_token;
  return { accessToken, refreshToken };
};

export const clearCookies = (res: Response) => {
  res.clearCookie("access_token").clearCookie("refresh_token");
};

import type { Response } from "express";

import config from "../config/config";

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res
    .cookie("access_token", accessToken, {
      httpOnly: config.mode === "prod",
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 120,
    })
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: config.mode === "prod",
      sameSite: "strict",
      maxAge: 60 * 60 * 8,
    });
};

import jwt from "jsonwebtoken";

import type { User } from "../entities/User.entity";
import type { Role } from "../entities/Role.entity";
import type { PayloadToken } from "../interfaces/PayloadToken.interface";

/* Config */
import config from "../config/config";

const generateJWT = (user: User, refresh = false) => {
  const { id, role } = user;
  const { isAdmin } = role as unknown as Role;
  const secret = refresh ? config.jwtSecretRefresh : config.jwtSecret;
  const expiresIn = refresh
    ? config.jwtRefreshExpiresIn
    : Number.parseInt(config.jwtExpiresIn as string);
  const payload: PayloadToken = { user: id, isAdmin };
  const {
    password,
    active,
    role: roleTemp,
    deleted,
    createAt,
    updateAt,
    ...publicUser
  } = user;
  return {
    token: jwt.sign(payload, secret as string, { expiresIn }),
    isAdmin,
    publicUser,
  };
};

export default generateJWT;

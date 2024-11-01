export default {
  mode: process.env.NODE_ENV,
  apiRoute: process.env.VERSION_ROUTE,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretReset: process.env.JWT_SECRET_REST,
  jwtSecretRefresh: process.env.JWT_SECRET_REFRESH,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
};

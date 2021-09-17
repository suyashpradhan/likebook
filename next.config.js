module.exports = {
  reactStrictMode: true,
  env: {
    DB_URL: process.env.DB_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    JWT_COOKIE_EXPIRY: process.env.JWT_COOKIE_EXPIRY,
    PRODUCTION_URL:
      process.env.NODE_ENV === "production"
        ? `http://localhost:${process.env.PORT}`
        : "https://ss",
  },
};

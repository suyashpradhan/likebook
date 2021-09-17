module.exports = {
  reactStrictMode: true,
  env: {
    DB_URL: process.env.DB_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    PORT: process.env.PORT,
    JWT_COOKIE_EXPIRY: process.env.JWT_COOKIE_EXPIRY,
    NEXT_PUBLIC_PRODUCTION_URL:
      process.env.NODE_ENV === "production"
        ? "https://likebook.vercel.app"
        : `http://localhost:${process.env.PORT}`,
  },
};

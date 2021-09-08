export const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
};

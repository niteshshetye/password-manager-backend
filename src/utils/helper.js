export const setCookie = (
  res = {},
  cookieName = "",
  cookieValue = "",
  customConfig = {}
) => {
  res.cookie(cookieName, cookieValue, {
    http: true, // Set to true for secure cookies in production,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "Strict", // Adjust as needed, 'Strict' or 'Lax',
    maxAge: 1000 * 60 * 60, // 1 hour
    ...customConfig,
  });
};

export const getCookie = (req, cookieName) => {
  if (!req || !req.cookies) return null;
  return req.cookies[cookieName] || null;
};

export const deleteCookie = (res, cookieName) => {
  res.clearCookie(cookieName, {
    http: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
};

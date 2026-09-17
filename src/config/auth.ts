export const authRoutes = {
  signup: "/signup",
  login: "/login",
  verify: "/verify",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  changePassword: "/change-password",
} as const;

export const PUBLIC_ROUTES = [
  "/",
  authRoutes.login,
  authRoutes.signup,
  authRoutes.verify,
  authRoutes.forgotPassword,
  authRoutes.resetPassword,
] as const;

export const PRIVATE_ROUTES = [
  "/dashboard",
  "/settings",
  "/account",
  authRoutes.changePassword,
] as const;

export const DEFAULT_AUTHENTICATED_REDIRECT = "/dashboard";

export const LOGIN_ROUTE = authRoutes.login;

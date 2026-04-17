import { Router, Request, Response } from "express";
import {
  handleLogin,
  handleRegister,
  handleRefreshToken,
  handleLogout,
} from "./auth.controller";
import passport from "passport";
import { env } from "../../config/env";
import { OAUTH_COOKIE_OPTIONS } from "./auth.constants";

const router = Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/refresh-token", handleRefreshToken); // will be read on http cookie
router.post("/logout", handleLogout);

// OAuth Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req: Request, res: Response) => {
    const { accessToken, refreshToken } = req.user as any;
    res.cookie("refreshToken", refreshToken, OAUTH_COOKIE_OPTIONS);
    res.redirect(`${env.CLIENT_URL}/auth/callback?token=${accessToken}`);
  },
);

// OAuth GitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false }),
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  (req: Request, res: Response) => {
    const { accessToken, refreshToken } = req.user as any;
    res.cookie("refreshToken", refreshToken, OAUTH_COOKIE_OPTIONS);
    res.redirect(`${env.CLIENT_URL}/auth/callback?token=${accessToken}`);
  },
);

export default router;

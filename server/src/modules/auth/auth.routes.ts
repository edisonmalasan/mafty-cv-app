import { Router } from "express";
import {
  handleLogin,
  handleRegister,
  handleRefreshToken,
  handleLogout,
} from "./auth.controller";

const router = Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/refresh-token", handleRefreshToken); // will be read on http cookie
router.post("/logout", handleLogout);

export default router;

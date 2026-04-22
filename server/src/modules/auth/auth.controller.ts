import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { REFRESH_COOKIE_OPTIONS } from "./auth.constants";

const REFRESH_COOKIE = "refreshToken";

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.register({
      email,
      password,
      name,
    });

    res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
    res.status(201).json({ success: true, data: { user, accessToken } });
  } catch (error: any) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.login({
      email,
      password,
    });

    res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
    res.status(200).json({ success: true, data: { user, accessToken } });
  } catch (error: any) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
  try {
    // read from httpOnly cookie
    const oldRefreshToken = req.cookies[REFRESH_COOKIE];

    if (!oldRefreshToken) {
      res
        .status(401)
        .json({ success: false, message: "No refresh token provided." });
      return;
    }

    const { accessToken, refreshToken } =
      await AuthService.refresh(oldRefreshToken);

    // set new refresh token in cookie & overwrite old one
    res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
    res.status(200).json({ success: true, data: { accessToken } });
  } catch (error: any) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.[REFRESH_COOKIE];

    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }

    res.clearCookie(REFRESH_COOKIE, REFRESH_COOKIE_OPTIONS);
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

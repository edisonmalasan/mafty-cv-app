import { AuthService } from "../auth/auth.service";

export const handleUserRegistration = async (req: any, res: any) => {
  try {
    const userData = req.body;
    const result = await AuthService.register(userData);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

export const handleLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

export const handleLogout = async (req: any, res: any) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const handleRefreshToken = async (req: any, res: any) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }
  } catch (error: any) {
    res
      .status(error.statusCode || 400)
      .json({ success: false, message: error.message });
  }
};

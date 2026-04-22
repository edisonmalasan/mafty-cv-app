import { Request, Response } from "express";
import { UserService } from "./user.service";

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getMe(req.user!.userId);
    res.status(200).json({ success: true, data: { user } });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateMe(req.user!.userId, req.body);
    res.status(200).json({ success: true, data: { user } });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded." });
      return;
    }
    const user = await UserService.uploadAvatar(
      req.user!.userId,
      req.file.buffer,
      req.file.mimetype,
    );
    res.status(200).json({ success: true, data: { user } });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const deleteMe = async (req: Request, res: Response) => {
  try {
    await UserService.deleteMe(req.user!.userId);
    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully." });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

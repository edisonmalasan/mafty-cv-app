import { Request, Response } from "express";
import { TemplateService } from "./template.service";

interface getTemplateParams {
  id: string;
}

export const listTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await TemplateService.list();
    res.status(200).json({ success: true, data: { templates } });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const getTemplate = async (
  req: Request<getTemplateParams>,
  res: Response,
) => {
  try {
    const template = await TemplateService.getById(req.params.id);
    res.status(200).json({ success: true, data: { template } });
  } catch (error: any) {
    res
      .status(error.statusCode || 404)
      .json({ success: false, message: error.message });
  }
};

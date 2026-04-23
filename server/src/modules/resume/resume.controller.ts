import { Request, Response, NextFunction } from "express";
import { ResumeService } from "./resume.service";

// helper
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

// Resume CRUD
export const listResumes = asyncHandler(async (req, res) => {
  const resumes = await ResumeService.list(req.user!.userId);
  res.status(200).json({ success: true, data: { resumes } });
});

export const createResume = asyncHandler(async (req, res) => {
  const resume = await ResumeService.create(req.user!.userId, req.body);
  res.status(201).json({ success: true, data: { resume } });
});

export const getResume = asyncHandler(async (req, res) => {
  const resume = await ResumeService.getById(req.params.id as string, req.user!.userId);
  res.status(200).json({ success: true, data: { resume } });
});

export const updateResume = asyncHandler(async (req, res) => {
  const resume = await ResumeService.update(
    req.params.id as string,
    req.user!.userId,
    req.body,
  );
  res.status(200).json({ success: true, data: { resume } });
});

export const deleteResume = asyncHandler(async (req, res) => {
  await ResumeService.delete(req.params.id as string, req.user!.userId);
  res.status(200).json({ success: true, message: "Resume deleted." });
});

export const duplicateResume = asyncHandler(async (req, res) => {
  const resume = await ResumeService.duplicate(req.params.id as string, req.user!.userId);
  res.status(201).json({ success: true, data: { resume } });
});

// header and settings
export const updateHeader = asyncHandler(async (req, res) => {
  const header = await ResumeService.updateHeader(
    req.params.id as string,
    req.user!.userId,
    req.body,
  );
  res.status(200).json({ success: true, data: { header } });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await ResumeService.updateSettings(
    req.params.id as string,
    req.user!.userId,
    req.body,
  );
  res.status(200).json({ success: true, data: { settings } });
});

// sections
export const addSection = asyncHandler(async (req, res) => {
  const section = await ResumeService.addSection(
    req.params.id as string,
    req.user!.userId,
    req.body,
  );
  res.status(201).json({ success: true, data: { section } });
});

export const updateSection = asyncHandler(async (req, res) => {
  const section = await ResumeService.updateSection(
    req.params.id as string,
    req.params.sectionId as string,
    req.user!.userId,
    req.body,
  );
  res.status(200).json({ success: true, data: { section } });
});

export const deleteSection = asyncHandler(async (req, res) => {
  await ResumeService.deleteSection(
    req.params.id as string,
    req.params.sectionId as string,
    req.user!.userId,
  );
  res.status(200).json({ success: true, message: "Section deleted." });
});

// section items
export const addItem = asyncHandler(async (req, res) => {
  const item = await ResumeService.addItem(
    req.params.id as string,
    req.params.sectionId as string,
    req.user!.userId,
    req.body,
  );
  res.status(201).json({ success: true, data: { item } });
});

export const updateItem = asyncHandler(async (req, res) => {
  const item = await ResumeService.updateItem(
    req.params.id as string,
    req.params.sectionId as string,
    req.params.itemId as string,
    req.user!.userId,
    req.body,
  );
  res.status(200).json({ success: true, data: { item } });
});

export const deleteItem = asyncHandler(async (req, res) => {
  await ResumeService.deleteItem(
    req.params.id as string,
    req.params.sectionId as string,
    req.params.itemId as string,
    req.user!.userId,
  );
  res.status(200).json({ success: true, message: "Item deleted." });
});

// public share
export const getPublicResume = asyncHandler(async (req, res) => {
  const resume = await ResumeService.getBySlug(req.params.slug as string);
  res.status(200).json({ success: true, data: { resume } });
});


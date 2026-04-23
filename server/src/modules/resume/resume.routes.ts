import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { validate } from "../../middleware/validate";
import {
  createResumeSchema,
  updateResumeSchema,
  updateHeaderSchema,
  updateSettingsSchema,
  addSectionSchema,
  updateSectionSchema,
} from "./resume.schema";
import {
  listResumes,
  createResume,
  getResume,
  updateResume,
  deleteResume,
  duplicateResume,
  updateHeader,
  updateSettings,
  addSection,
  updateSection,
  deleteSection,
  addItem,
  updateItem,
  deleteItem,
  getPublicResume,
} from "./resume.controller";

// public router
export const publicResumeRouter = Router();
publicResumeRouter.get("/:slug", getPublicResume);

// protected router
const router = Router();

// apply auth to every route in this router.
router.use(authenticate);

// resume crud
router.get("/", listResumes);
router.post("/", validate(createResumeSchema), createResume);
router.get("/:id", getResume);
router.patch("/:id", validate(updateResumeSchema), updateResume);
router.delete("/:id", deleteResume);
router.post("/:id/duplicate", duplicateResume);

// header and settings
router.patch("/:id/header", validate(updateHeaderSchema), updateHeader);
router.patch("/:id/settings", validate(updateSettingsSchema), updateSettings);

// sections
router.post("/:id/sections", validate(addSectionSchema), addSection);
router.patch(
  "/:id/sections/:sectionId",
  validate(updateSectionSchema),
  updateSection,
);
router.delete("/:id/sections/:sectionId", deleteSection);

// section items
router.post("/:id/sections/:sectionId/items", addItem);
router.patch("/:id/sections/:sectionId/items/:itemId", updateItem);
router.delete("/:id/sections/:sectionId/items/:itemId", deleteItem);

export default router;

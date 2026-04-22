import { Router } from "express";
import { getTemplate, listTemplates } from "./template.controller";

const router = Router();

router.get("/", listTemplates);
router.get("/:id", getTemplate);

export default router;

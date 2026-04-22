import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { validate } from "../../middleware/validate";
import { upload } from "../../middleware/upload";
import { getMe, updateMe, uploadAvatar, deleteMe } from "./user.controller";
import { updateUserSchema } from "./user.schema";

const router = Router();

router.get("/me", getMe);
router.patch("/me", validate(updateUserSchema), updateMe);
router.post("/me/avatar", upload.single("avatar"), uploadAvatar);
router.delete("/me", deleteMe);

export default router;

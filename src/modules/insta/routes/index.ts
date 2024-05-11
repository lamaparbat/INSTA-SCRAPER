import { Router } from "express";
import { getProfileSchema } from "../validator";
import { validator } from "../../../shared/utils";
import { getProfile, getTags } from "../controllers";

const router = Router();

router.get("/insta/tags", validator.query(getProfileSchema), getTags);
router.get("/insta/profile", validator.query(getProfileSchema), getProfile);


export default router;


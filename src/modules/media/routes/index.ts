import { Router } from "express";
import { getMediaByPath } from "../controllers";
import { validator } from "../../../shared/utils";
import { getMediaSchema } from "../../insta/validator";

const router = Router();

router.get("/media/:filepath", validator.params(getMediaSchema), getMediaByPath);


export default router;


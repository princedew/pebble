import {Router} from "express";
import { createProject, getProject } from "./handler/handler";

const router = Router();

router.post("/project", createProject);
router.get("/project", getProject);

export default router;















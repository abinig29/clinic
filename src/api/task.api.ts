
import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { createTaskSchema, updateTaskSchema } from "../validation/task.validation";
import { createTaskHandler, updateTaskHandler } from "../controller/task";



const router = express.Router();

router.post("/",
    AuthJWT,
    validateSchema(createTaskSchema),
    createTaskHandler)
router.patch("/:id", AuthJWT, validateSchema(updateTaskSchema), updateTaskHandler)



export default router;


import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { guard } from "../middleware/guard";
import { PERMISSIONS } from "../config/permission";
import { createClinicHandler, deleteClinicHandler, getClinicHandler, updateClinicHandler } from "../controller/clinic";
import { createClinicSchema, updateClinicSchema } from "../validation/clinic.validation";


const router = express.Router();

router.post("/",
    AuthJWT,
    guard(PERMISSIONS["clinic:write"]),
    validateSchema(createClinicSchema),
    createClinicHandler)
router.get("/", getClinicHandler)
router.patch("/", AuthJWT, guard(PERMISSIONS["clinic:edit"]), validateSchema(updateClinicSchema), updateClinicHandler)
router.delete("/", AuthJWT, guard(PERMISSIONS["clinic:delete"]), deleteClinicHandler)



export default router;


import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { guard } from "../middleware/guard";
import { PERMISSIONS } from "../config/permission";
import { deleteBranchHandler, updateBranchHandler } from "../controller/branch";
import { deleteBranchSchema, updateBranchSchema } from "../validation/branch.validation";
import { createAppointmentSchema, updateAppointmentSchema, updateAppointmentStatusSchema } from "../validation/appointment.validation";
import { createAppointmentHandler, getAppointmentHandler, getMeAppointmentHandler, updateAppointmentHandler, updateAppointmentStatusHandler } from "../controller/appointment";


const router = express.Router();

router.post("/",
    AuthJWT,
    guard(PERMISSIONS["appointment:create"]),
    validateSchema(createAppointmentSchema),
    createAppointmentHandler)

router.get("/",
    AuthJWT,
    guard(PERMISSIONS["appointment:view"]),
    getAppointmentHandler)

router.get("/my-patient",
    AuthJWT,
    guard(PERMISSIONS["appointment:view"]),
    getMeAppointmentHandler)

router.patch("/:id",
    AuthJWT,
    guard(PERMISSIONS["appointment:edit"]),
    validateSchema(updateAppointmentSchema),
    updateAppointmentHandler)

router.patch("/:id/status",
    AuthJWT,
    guard(PERMISSIONS["appointment:edit"]),
    validateSchema(updateAppointmentStatusSchema),
    updateAppointmentStatusHandler)


router.delete("/:id",
    AuthJWT,
    guard(PERMISSIONS["branch:delete"]),
    validateSchema(deleteBranchSchema),
    deleteBranchHandler)



export default router;

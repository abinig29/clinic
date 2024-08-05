import {
    getPatientsHandler,
    getPatientByIdHandler,
    updatePatientTeethHandler,
    deletePatientHandler,
    updatePatientHandler,
    createPatientHandler,
    getPatientDiagnosisHandler,
    deletePatientPaymentHandler,
    updatePatientPayemntHandler,
    createPatientPaymentHandler,
    deletePatientVitalHandler,
    updatePatientVitalHandler,
    createPatientVitalHandler,
    createPatientDiagnosisHandler,
    updatePatientDiagnosisHandler,
    deletePatientDiagnosisHandler,
    deletePatientAllergyHandler,
    updatePatientAllergyHandler,
    createPatientAllergyHandler,
    createPatientExaminationHandler,
    updatePatientExaminationHandler,
    deletePatientExaminationHandler,
    deletePatientHistoryHandler,
    createPatientHistoryHandler,
    updatePatientHistoryHandler,
    createPatientPlanHandler,
    updatePatientPlanHandler,
    deletePatientPlanHandler,
    getPatientPlanHandler,
    refillPatientPlanHandler,
    getNewPatientsHandler,
    updatePatientPinHandler,
    getAssignedPatientsHandler,
    assignDocForPatientHandler
} from "../controller/patient"


import express from "express";
import { AuthJWT } from "../middleware/auth";
import { PERMISSIONS } from "../config/permission";
import { guard } from "../middleware/guard";
import validateSchema from "../middleware/validate-schema.middleware";
import { assignDocSchema, createOrUpdatePatientAllergySchema, createOrUpdatePatientDiagnosisSchema, createOrUpdatePatientHistorySchema, createOrUpdatePatientPaymentSchema, createOrUpdatePatientVitalSchema, createOrUpdatePatientexaminationSchema, createPatientSchema, deletePatientEntitySchema, deletePatientSchema, getPatientDiagnosisByIdSchema, updatePatientPinSchema, updatePatientSchema, updatePatientTeethSchema } from "../validation/patient.validation";
import { createOrUpdatePatientPlanSchema, deletePatientPlanSchema, getPatientPlanByIdSchema } from "../validation/plan.validation";

const router = express.Router();

// PATIENT BASIC
router.post("/", AuthJWT, guard(PERMISSIONS["patient:create"]), validateSchema(createPatientSchema), createPatientHandler)
/* get alll patients */
router.get("/", AuthJWT, guard(PERMISSIONS["patient:view"]), getPatientsHandler)
/*  get only today registred patients  */
router.get("/new", AuthJWT, guard(PERMISSIONS["patient:view"]), getNewPatientsHandler)
/*  get only assigned patients for dooctors  */
router.get("/assigned", AuthJWT, guard(PERMISSIONS["patient:view"]), getAssignedPatientsHandler)
/*  get patients by id */
router.get("/:id", AuthJWT, guard(PERMISSIONS["patient:view"]), getPatientByIdHandler)



router.patch("/:id", AuthJWT, guard(PERMISSIONS["patient:edit"]), validateSchema(updatePatientSchema), updatePatientHandler)
/* pin new patient or unpin */
router.patch("/:id/pin", AuthJWT, guard(PERMISSIONS["patient:edit"]), validateSchema(updatePatientPinSchema), updatePatientPinHandler)
/* pull out patients teeth*/
router.patch("/:id/pull-out-teeth", AuthJWT, guard(PERMISSIONS["patient:edit"]), validateSchema(updatePatientTeethSchema), updatePatientTeethHandler)
/*assign doctor for patients*/
router.patch("/:id/assign", AuthJWT, guard(PERMISSIONS["patient:assigned-doctor:edit"]), validateSchema(assignDocSchema), assignDocForPatientHandler)
router.delete("/:id", AuthJWT, guard(PERMISSIONS["patient:delete"]), validateSchema(deletePatientSchema), deletePatientHandler)



// VITAL 
router.post("/:patientId/vital", AuthJWT, guard(PERMISSIONS["patient:vital:create"]), validateSchema(createOrUpdatePatientVitalSchema), createPatientVitalHandler)
router.patch("/:patientId/vital/:id", AuthJWT, guard(PERMISSIONS["patient:vital:edit"]), validateSchema(createOrUpdatePatientVitalSchema), updatePatientVitalHandler)
router.delete("/:patientId/vital/:id", AuthJWT, guard(PERMISSIONS["patient:vital:delete"]), validateSchema(deletePatientEntitySchema), deletePatientVitalHandler)

// patient HISTORY
router.post("/:patientId/history", AuthJWT, guard(PERMISSIONS["patient:history:create"]), validateSchema(createOrUpdatePatientHistorySchema), createPatientHistoryHandler)
router.patch("/:patientId/history/:id", AuthJWT, guard(PERMISSIONS["patient:history:edit"]), validateSchema(createOrUpdatePatientHistorySchema), updatePatientHistoryHandler)
router.delete("/:patientId/history/:id", AuthJWT, guard(PERMISSIONS["patient:history:delete"]), validateSchema(deletePatientEntitySchema), deletePatientHistoryHandler)

// EXAMINATION
router.post("/:patientId/examination", AuthJWT, guard(PERMISSIONS["patient:examination:create"]), validateSchema(createOrUpdatePatientexaminationSchema), createPatientExaminationHandler)
router.patch("/:patientId/examination/:id", AuthJWT, guard(PERMISSIONS["patient:examination:edit"]), validateSchema(createOrUpdatePatientexaminationSchema), updatePatientExaminationHandler)
router.delete("/:patientId/examination/:id", AuthJWT, guard(PERMISSIONS["patient:examination:delete"]), validateSchema(deletePatientEntitySchema), deletePatientExaminationHandler)


// PAYMENT
router.post("/:patientId/payment", AuthJWT, guard(PERMISSIONS["patient:payment:create"]), validateSchema(createOrUpdatePatientPaymentSchema), createPatientPaymentHandler)
router.patch("/:patientId/payment/:id", AuthJWT, guard(PERMISSIONS["patient:payment:edit"]), validateSchema(createOrUpdatePatientPaymentSchema), updatePatientPayemntHandler)
router.delete("/:patientId/payment/:id", AuthJWT, guard(PERMISSIONS["patient:payment:delete"]), validateSchema(deletePatientEntitySchema), deletePatientPaymentHandler)


// ALLERGY
router.post("/:patientId/allergy", AuthJWT, guard(PERMISSIONS["patient:allergy:create"]), validateSchema(createOrUpdatePatientAllergySchema), createPatientAllergyHandler)
router.patch("/:patientId/allergy/:id", AuthJWT, guard(PERMISSIONS["patient:allergy:edit"]), validateSchema(createOrUpdatePatientAllergySchema), updatePatientAllergyHandler)
router.delete("/:patientId/allergy/:id", AuthJWT, guard(PERMISSIONS["patient:allergy:delete"]), validateSchema(deletePatientEntitySchema), deletePatientAllergyHandler)

// DIAGNOSIS
router.post("/:patientId/diagnosis", AuthJWT, guard(PERMISSIONS["patient:diagnosis:create"]), validateSchema(createOrUpdatePatientDiagnosisSchema), createPatientDiagnosisHandler)
router.patch("/:patientId/diagnosis/:id", AuthJWT, guard(PERMISSIONS["patient:diagnosis:edit"]), validateSchema(createOrUpdatePatientDiagnosisSchema), updatePatientDiagnosisHandler)
router.delete("/:patientId/diagnosis/:id", AuthJWT, guard(PERMISSIONS["patient:diagnosis:delete"]), validateSchema(deletePatientEntitySchema), deletePatientDiagnosisHandler)
router.get("/:patientId/diagnosis/:diagnosisId", AuthJWT, guard(PERMISSIONS["patient:diagnosis:view"]), validateSchema(getPatientDiagnosisByIdSchema), getPatientDiagnosisHandler)


// TREATMENT PLAN
router.post("/diagnosis/:diagnosisId/plan", AuthJWT, guard(PERMISSIONS["patient:plan:create"]), validateSchema(createOrUpdatePatientPlanSchema), createPatientPlanHandler)
router.patch("/diagnosis/:diagnosisId/plan/:id", AuthJWT, guard(PERMISSIONS["patient:plan:edit"]), validateSchema(createOrUpdatePatientPlanSchema), updatePatientPlanHandler)
router.patch("/diagnosis/:diagnosisId/plan/:id/refill", AuthJWT, guard(PERMISSIONS["patient:plan:edit"]), validateSchema(createOrUpdatePatientPlanSchema), refillPatientPlanHandler)
router.delete("/diagnosis/:diagnosisId/plan/:id", AuthJWT, guard(PERMISSIONS["patient:plan:delete"]), validateSchema(deletePatientPlanSchema), deletePatientPlanHandler)
router.get("/diagnosis/:diagnosisId/plan/:id", AuthJWT, guard(PERMISSIONS["patient:plan:view"]), validateSchema(getPatientPlanByIdSchema), getPatientPlanHandler)



export default router
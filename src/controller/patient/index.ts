import { createPatientHandler } from "./create.patient.controller";
import { updatePatientHandler } from "./update.patinet.controller";
import { deletePatientHandler } from "./delete.patient.controller";
import { updatePatientTeethHandler } from "./pull-out-teeth.patinet.controller"
import { getPatientByIdHandler } from "./get-by-id.patient.controller";
import { getPatientsHandler } from "./get.patient.controller"


import { createPatientVitalHandler } from "./vital/create.vital.controller";
import { updatePatientVitalHandler } from "./vital/update.vital.controller";
import { deletePatientVitalHandler } from "./vital/delete.vital.controller";

import { createPatientPaymentHandler } from "./payment/create.payment.controller";
import { updatePatientPayemntHandler } from "./payment/update.payment.controller";
import { deletePatientPaymentHandler } from "./payment/delete.payment.controller";

import { createPatientHistoryHandler } from "./history/create.history.controller";
import { updatePatientHistoryHandler } from "./history/update.history.controller";
import { deletePatientHistoryHandler } from "./history/delete.history.controller";

import { createPatientExaminationHandler } from "./examination/create.examination.controller";
import { updatePatientExaminationHandler } from "./examination/update.examination.controller";
import { deletePatientExaminationHandler } from "./examination/delete.examination.controller";


import { createPatientDiagnosisHandler } from "./diagnosis/create.diagnosis.controller";
import { updatePatientDiagnosisHandler } from "./diagnosis/update.diagnosis.controller";
import { deletePatientDiagnosisHandler } from "./diagnosis/delete.diagnosis.controller";
import { getPatientDiagnosisHandler } from "./diagnosis/get-id.diagnosis.controller";





import { createPatientAllergyHandler } from "./allergy/create.allergy.controller";
import { updatePatientAllergyHandler } from "./allergy/update.allergy.controller";
import { deletePatientAllergyHandler } from "./allergy/delete.allergy.controller";
import { createPatientPlanHandler } from "./diagnosis/plan/create.plan.controller";
import { updatePatientPlanHandler } from "./diagnosis/plan/update.plan.controller";
import { deletePatientPlanHandler } from "./diagnosis/plan/delete.plan.controller";
import { getPatientPlanHandler } from "./diagnosis/plan/get-id.plan.controller";
import { refillPatientPlanHandler } from "./diagnosis/plan/refill.plan.controller";
import { updatePatientPinHandler } from "./pin-unpin.patient.controller";
import { getNewPatientsHandler } from "./get-new.patient.controller";
import { getAssignedPatientsHandler } from "./get-assigned.patient.controller";
import { assignDocForPatientHandler } from "./assign-doc.patient.controller";




export {
    getPatientsHandler,
    assignDocForPatientHandler,
    getPatientByIdHandler,
    updatePatientTeethHandler,
    deletePatientHandler,
    updatePatientHandler,
    createPatientHandler,
    getPatientDiagnosisHandler,
    updatePatientPinHandler,
    deletePatientPaymentHandler,
    updatePatientPayemntHandler,
    createPatientPaymentHandler,
    deletePatientVitalHandler,
    updatePatientVitalHandler,
    getNewPatientsHandler,

    createPatientVitalHandler,
    createPatientDiagnosisHandler,
    updatePatientDiagnosisHandler,
    deletePatientDiagnosisHandler,
    refillPatientPlanHandler,
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

    getAssignedPatientsHandler
}
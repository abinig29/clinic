import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getPatientbyId } from '../../service/patient.service';
import { IUserMessage } from '../../middleware/auth';
import { z } from 'zod';
import { getPatientByIdSchema } from '../../validation/patient.validation';
import BadRequestError from '../../errors/badRequest.errors';
import { ErrorCode } from '../../errors/custom.errors';



//@desc get patient basic info by id
//@method GET  /patient/:id
//@access private
const getPatientByIdHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof getPatientByIdSchema>["params"]>, res: Response) => {

    const branchId = req.headers['x-branch-id'] as string
    if (!branchId) throw new BadRequestError("Havent found any branch", ErrorCode.NO_PERMISSION)

    const permission = req.userData.permission.permissions
    const gratedALl = req.userData.permission.grantAll
    const includeOption = [
        permission.includes("patient:history:view") && "PatientHistory",
        permission.includes("patient:vital:view") && "PatientVital",
        permission.includes("patient:examination:view") && "PatientExamination",
        permission.includes("patient:diagnosis:view") && "PatientDiagnosis",
        permission.includes("patient:plan:view") && "PatientPlan",
        permission.includes("patient:payment:view") && "PatientPayment",
        permission.includes("patient:allergy:view") && "PatientAllergy",
        permission.includes("appointment:view") && "Appointment",

    ]
    const superAdminIncludeOption = [
        "PatientHistory",
        "PatientVital",
        "PatientExamination",
        "PatientDiagnosis",
        "PatientPayment",
        "PatientPlan",
        "PatientAllergy",
        "Appointment"
    ]

    const patients = await getPatientbyId(req.params.id, gratedALl ? superAdminIncludeOption : includeOption, branchId)
    res.status(200).json({
        success: true,
        data: patients,
    })
})

export { getPatientByIdHandler };


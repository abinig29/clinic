import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../errors/custom.errors";
import { updatePatientPinInput, updatePatientPinSchema } from "../../validation/patient.validation";
import { getPatientbyId, unpinPatiens, updatePatient } from "../../service/patient.service";
import { getUserByRole } from "../../service/user.service";
import BadRequestError from "../../errors/badRequest.errors";




//@desc update patinet
//@method PATCH   /patinet/:id/pin
//@access private
export const updatePatientPinHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updatePatientPinSchema>["params"], {}, updatePatientPinInput>, res: Response) => {
    const patientId = req.params.id
    const pinned = req.body.pinned
    const patient = await getPatientbyId(patientId)
    if (!patient) throw new NotFoundError('Patient Not Found', ErrorCode.PATIENT_NOT_FOUND)

    // TO DO add DOC_ADMIN first
    const docAdmin = await getUserByRole("DOC_ADMIN")
    if (!docAdmin) throw new BadRequestError('Doctor Admin Was Not Found', ErrorCode.ADMIN_NOT_FOUND)

    if (pinned) await unpinPatiens(docAdmin?.id)
    const updatedPatient = await updatePatient(patientId, { pinned })
    res.status(200).json({
        message: `Patient ${pinned ? "PInned" : "Unpinned"}  sucessfully`,
        sucess: true,
        body: updatedPatient
    })
})
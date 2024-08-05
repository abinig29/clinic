import { PatientAllergy, PatientDiagnosis, PatientExamination, PatientHistory, PatientPayment, PatientVital } from "@prisma/client";
import { prisma } from "../config/prisma";

type UpdatePatientEntityParams<T> = {
    patientId: string;
    entityId: string;
    updatedFields: Partial<T>;
};

export async function updatePatientEntity<T>(
    entityType: string,
    { patientId, entityId, updatedFields }: UpdatePatientEntityParams<T>
): Promise<any> {
    return await prisma.patient.update({
        where: { id: patientId },
        data: {
            [entityType]: {
                update: {
                    where: { id: entityId },
                    data: updatedFields
                }
            }
        },
        include: {
            [entityType]: true
        }
    });
}

type DeletePatientEntityParams = {
    patientId: string;
    entityId: string;
};

export async function deletePatientEntity(entityType: string, { patientId, entityId }: DeletePatientEntityParams) {
    return await prisma.patient.update({
        where: { id: patientId },
        data: {
            [entityType]: {
                deleteMany: {
                    id: entityId
                }
            }
        },
    });
}




export const savePatienExamination = async (PatientExamination: Partial<PatientExamination>, createdBy: string, patientId: string) => {
    return await prisma.patient.update({
        where: {
            id: patientId
        },
        data: {
            PatientExamination: {
                create: {
                    intraOralIntro: PatientExamination?.intraOralIntro,
                    intraOralSummary: PatientExamination?.intraOralSummary,
                    intraOralTeeth: PatientExamination.intraOralTeeth,
                    intraOralImages: PatientExamination?.intraOralImages,
                    extraOralIntro: PatientExamination?.extraOralIntro,
                    extraOralSummary: PatientExamination?.extraOralSummary,
                    extraOralImages: PatientExamination.extraOralImages,
                    registerById: createdBy,
                }
            }

        },
        include: {
            PatientExamination: true
        }
    })
}



export const savePatienPayment = async (payment: Partial<PatientPayment>, createdBy: string, patientId: string) => {
    return await prisma.patient.update({
        where: {
            id: patientId
        },
        data: {
            PatientPayment: {
                create: {
                    amount: payment?.amount,
                    paymentType: payment?.paymentType,
                    registerById: createdBy
                }
            },
        },
        include: {
            PatientPayment: true
        }
    })
}



export const savePatienAllergy = async (allergy: Partial<PatientAllergy>, createdBy: string, patientId: string) => {
    return await prisma.patient.update({
        where: {
            id: patientId
        },
        data: {
            PatientAllergy: {
                create: {
                    name: allergy?.name,
                    level: allergy?.level,
                    registerById: createdBy
                }
            }

        },
        include: {
            PatientAllergy: true
        }
    })
}


export const savePatienVital = async (PatientVital: Partial<PatientVital>, createdBy: string, patientId: string) => {
    return await prisma.patient.update({
        where: {
            id: patientId
        },
        data: {
            PatientVital: {
                create: {
                    bp: PatientVital?.bp,
                    weight: PatientVital?.weight,
                    temp: PatientVital.temp,
                    hr: PatientVital?.hr,
                    registerById: createdBy,
                }
            }

        },
        include: {
            PatientVital: true
        }
    })
}


export const savePatientHistory = async (patientHistory: Partial<PatientHistory>, createdBy: string, patientId: string) => {
    return await prisma.patient.update({
        where: {
            id: patientId
        },
        data: {
            PatientHistory: {
                create: {
                    chiefCompliant: patientHistory?.chiefCompliant,
                    historyPresentIllness: patientHistory?.historyPresentIllness,
                    pastMedicalHistory: patientHistory.pastMedicalHistory,
                    pastDenatlHistory: patientHistory?.pastDenatlHistory,
                    registerById: createdBy,
                }
            }

        }
    })
}
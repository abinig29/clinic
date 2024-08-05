import { PatientDiagnosis } from "@prisma/client";
import { prisma } from "../config/prisma";

type UpdatePatientEntityWithLogParams = {
    patientId: string;
    entityId: string;
    doctorId: string
    updatedFields: Partial<PatientDiagnosis>;
};

export async function updatePatientDiagnosis({ patientId, entityId, updatedFields, doctorId }: UpdatePatientEntityWithLogParams
) {
    return await prisma.patient.update({
        where: { id: patientId },
        data: {
            PatientDiagnosis: {
                update: {
                    where: { id: entityId },
                    data: {
                        ...updatedFields,
                        PatientDiagnosisLog: {
                            create: {
                                log: "Updated this diagnosis",
                                doctorId
                            }
                        }
                    }
                },

            }
        },
        include: {
            PatientDiagnosis: true
        }
    });
}



export const getDiagnosisById = async (diagnosisId: string) => {
    return await prisma.patientDiagnosis.findUnique({
        where: { id: diagnosisId }
    })

}
export const getPatientDiagnosisById = async (diagnosisId: string, patientId: string) => {
    console.log(diagnosisId, patientId)
    const patient = await prisma.patient.findFirst({
        where: {
            id: patientId,
            PatientDiagnosis: {
                some: {
                    id: diagnosisId
                }
            }
        },
        include: {
            PatientDiagnosis: {
                include: {
                    PatientDiagnosisLog: {
                        include: {
                            doctor: {
                                select: {
                                    profile: {
                                        select: {
                                            fullName: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    PatientPlan: true

                },

            },
        }
    });

    return patient?.PatientDiagnosis;
}

export const savePatienDiagnosis = async (PatientDiagnosis: Partial<PatientDiagnosis>, createdBy: string, patientId: string) => {
    return await prisma.patient.update({
        where: {
            id: patientId
        },
        data: {
            PatientDiagnosis: {
                create: {
                    name: PatientDiagnosis?.name,
                    summary: PatientDiagnosis?.summary,
                    status: PatientDiagnosis.status,
                    PatientDiagnosisLog: {
                        create: {
                            log: "created this diagnosis",
                            doctorId: createdBy
                        }
                    }
                }
            }
        },
        include: {
            PatientDiagnosis: true
        }
    })
}
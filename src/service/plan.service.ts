import { PatientPlan } from "@prisma/client"
import { prisma } from "../config/prisma"

export const savePatienPlan = async (PatientPlan: Partial<PatientPlan>, createdBy: string, diagnosisId: string, patientId: string) => {
    // console.log(PatientPlan, createdBy, diagnosisId)
    return await prisma.patientDiagnosis.update({
        where: {
            id: diagnosisId
        },
        data: {
            PatientPlan: {
                create: {
                    name: PatientPlan?.name,
                    summary: PatientPlan?.summary,
                    status: "Pending",
                    patientId,
                    PatientPlanLog: {
                        create: {
                            log: "created this diagnosis",
                            doctorId: createdBy
                        }
                    }
                }
            }
        },
        include: {
            PatientPlan: true
        }
    })
}

type UpdatePatientEntityWithLogParams = {
    diagnosisId: string;
    entityId: string;
    doctorId: string
    updatedFields: Partial<PatientPlan>;
    log?: string
};

export async function updatePatientPlan({ diagnosisId, entityId, updatedFields, doctorId, log }: UpdatePatientEntityWithLogParams
) {
    let logMessage = log ?? "Updated this tratemnt plan"
    if (updatedFields?.status) logMessage = `Changed the status of the plan to ${updatedFields?.status} `
    else if (updatedFields?.duaration && updatedFields?.dosage) logMessage = `Changed the duration of this traatment to ${updatedFields?.duaration} and the dosage to ${updatedFields?.duaration}`
    else {
        if (updatedFields?.dosage) logMessage = `Change the dosage of this traatment to ${updatedFields?.dosage}`
        if (updatedFields?.duaration) logMessage = `Change the duration of this traatment to ${updatedFields?.duaration}`
    }

    return await prisma.patientDiagnosis.update({
        where: { id: diagnosisId },
        data: {
            PatientPlan: {
                update: {
                    where: { id: entityId },
                    data: {
                        ...updatedFields,
                        PatientPlanLog: {
                            create: {
                                log: logMessage,
                                doctorId
                            }
                        }
                    }
                },
            }
        },
        include: {
            PatientPlan: true
        }
    });
}

export async function deletePatientPlan(patientId: string, entityId: string) {
    return await prisma.patientDiagnosis.update({
        where: { id: patientId },
        data: {
            PatientPlan: {
                deleteMany: {
                    id: entityId
                }
            }
        },
    });
}

export const getPatientPlanById = async (diagnosisId: string, planId: string) => {
    const diagnosis = await prisma.patientDiagnosis.findFirst({
        where: {
            id: diagnosisId,
            PatientPlan: {
                some: {
                    id: planId
                }
            }
        },
        include: {
            PatientPlan: {
                include: {
                    PatientPlanLog: {
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
                    diagnosis: true

                },

            },
        }
    });
    return diagnosis?.PatientPlan;
}


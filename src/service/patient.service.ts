import { Patient, PatientAllergy, PatientDiagnosis, PatientExamination, PatientHistory, PatientPayment, PatientPlan, PatientVital } from "@prisma/client"
import { prisma } from "../config/prisma"
import { getBranchById } from "./branch.service"
import NotFoundError from "../errors/notFound.errors"
import { ErrorCode } from "../errors/custom.errors"
import { getPatientsInput } from "../validation/patient.validation"


export const savePatient = async ({ branchId, patient, createdBy }: { patient: Partial<Patient>, branchId: string, createdBy: string }) => {
    const branch = await getBranchById(branchId)
    if (!branch || !branchId) throw new NotFoundError("Branch not found", ErrorCode.BRANCH_NOT_FOUND)
    if (branch.startMedicalNumber) {
        const lastPatient = await getLastPatient()
        patient.medicalRecordNumber = lastPatient?.medicalRecordNumber ? lastPatient?.medicalRecordNumber : branch?.startMedicalNumber
    }
    const updatedBranch = await prisma.branch.update({
        where: { id: branchId },
        data: {
            Patient: {
                create: {
                    fullName: patient?.fullName,
                    phoneNumber: patient?.phoneNumber,
                    medicalRecordNumber: patient.medicalRecordNumber,
                    age: patient?.age,
                    gender: patient?.gender,
                    address: patient?.address,
                    fixedPrice: patient.fixedPrice,
                    insuranceCompanyName: patient?.insuranceCompanyName,
                    insuranceNumber: patient?.insuranceNumber,
                    registerById: createdBy,
                    emergencyContactName: patient?.emergencyContactName,
                    emergencyContactPhone: patient?.emergencyContactPhone,
                    emergencyContactAddress: patient?.emergencyContactAddress,

                    // TO DO add doctor admin here
                    // PatientDoctor: {
                    //     create: {
                    //         doctorId: ""
                    //     }
                    // }
                }
            }

        },
        include: {
            Patient: true
        }
    }
    )
    return updatedBranch?.Patient
}

export const getLastPatient = async () => {
    const patients = await prisma.patient.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    return patients?.length && patients[0]
}

export const updatePatient = async (patientId: string, updatedFields: Partial<Patient>) => {
    const updatedUser = await prisma.patient.update({
        where: { id: patientId },
        data: updatedFields,
    });
    return updatedUser
}

export const unpinPatiens = async (doctorId: string) => {
    const today = new Date().toString().split("T")[0]
    const updatedUserId = await prisma.appointment.findMany({
        where: {
            doctorId: doctorId,
            date: new Date(today),
            patient: {
                pinned: true
            }
        },
        select: {
            patientId: true
        }
    });
    const userID = updatedUserId?.map(a => a.patientId)
    const updatePatients = await prisma.patient.updateMany({
        where: {
            id: {
                in: userID
            }
        },
        data: {
            pinned: false
        }
    })
    return updatePatients
}
export const deletePatient = async (id: string) => {
    return await prisma.patient.delete({ where: { id } });
};

export const getPaginatedPatients = async (queryParams: getPatientsInput, branchId: string) => {
    const page = queryParams.page ? parseInt(queryParams.page, 10) : 1;
    const limit = queryParams.limit ? parseInt(queryParams.limit, 10) : 10;
    const offset = (page - 1) * limit;
    const orderBy = queryParams.sortOrder ?? "createdAt"
    const orderDirection = queryParams?.sortOrder ?? "desc"

    const query: Record<string, any> = { branchId };
    if (queryParams?.search) {
        query["OR"] = [
            {
                fullName: {
                    contains: queryParams?.search
                },
            },
            {
                phoneNumber: {
                    contains: queryParams?.search
                },
            },
        ]
    }
    const patients = await prisma.patient.findMany({
        include: {
            Appointment: {
                where: {
                    status: "COMPLETED"
                },
                select: {
                    id: true,
                    date: true,
                },
                orderBy: {
                    date: 'desc'
                },
                take: 1
            }
        },
        where: query,
        skip: offset,
        take: Number(limit),
        orderBy: { [orderBy]: orderDirection as 'asc' | 'desc' },
    });



    const totalCount = await prisma.patient.count();
    const totalPages = Math.ceil(totalCount / Number(limit));
    return { currentPage: Number(page), totalCount, totalPages, patients }

}

export const getPatientbyId = async (patientId: string, includeProperties: string[] = [], branchId?: string): Promise<Patient | null> => {
    let includeObject = {};
    if (includeProperties && includeProperties.length > 0) {
        includeProperties.forEach(property => {
            includeObject[property] = true;
        });
    }
    const patient = await prisma.patient.findUnique({
        where: {
            id: patientId,
            branchId,
        },
        include: includeObject
        //  
    });

    return patient;
}



export const getNewPatients = async (branchId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const patients = await prisma.patient.findMany({
        where: {
            createdAt: {
                gte: today,
                lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            },
            branchId,
        }
    });
    return patients
}

export const assignDoc = async (patientId: string, doctorId: string) => {

    const updatedPatient = await prisma.patient.update({
        where: {
            id: patientId
        },
        data: {
            PatientDoctor: {
                create: {
                    doctorId: doctorId
                }
            }
        },
        include: {
            PatientDoctor: true
        }
    })
    return updatedPatient

}



export const getAssignedPatients = async (docId: string) => {
    const patients = await prisma.patient.findMany({
        where: {
            PatientDoctor: {
                some: {
                    doctorId: docId
                }
            }
        }
    })
    return patients

}
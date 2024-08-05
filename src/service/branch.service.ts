import { Branch } from "@prisma/client"
import { prisma } from "../config/prisma"

export const createBranch = async (branch: Partial<Branch>, clinicId: string) => {
    return await prisma.branch.create({
        data: {
            name: branch?.name,
            phoneNumber: branch?.phoneNumber,
            email: branch?.email,
            address: branch?.address,
            clinicId,
            startMedicalNumber: branch.startMedicalNumber
        }
    })
}

export const getBranchById = async (branchId: string) => {
    return await prisma.branch.findUnique({ where: { id: branchId } })
}


export const getBranches = async () => {
    return await prisma.branch.findMany({})
}

export const deleteBranch = async (id: string) => {
    return await prisma.branch.delete({ where: { id } });
};




export const updateBranch = async (branchId: string, updatedFields: Partial<Branch>) => {
    return await prisma.branch.update({
        where: { id: branchId },
        data: updatedFields
    })
}
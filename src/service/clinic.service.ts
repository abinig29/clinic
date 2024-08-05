import { Clinic } from "@prisma/client"
import { prisma } from "../config/prisma"
import NotFoundError from "../errors/notFound.errors"
import { ErrorCode } from "../errors/custom.errors"


export const createClinic = async ({ clinic, ownerId }: { clinic: Partial<Clinic>, ownerId: string }) => {
    return await prisma.clinic.create({
        data: {
            name: clinic?.name,
            phoneNumber: clinic?.phoneNumber,
            ownerId,
            email: clinic?.email,
            socialMedia: clinic?.socialMedia,
            description: clinic?.description,
            services: clinic?.services
        }
    })
}


export const getClinic = async () => {
    return await prisma.clinic.findFirst()
}

export const updateClinic = async (clicnicId: string, updatedFields: Partial<Clinic>) => {
    return await prisma.clinic.update({
        where: { id: clicnicId },
        data: updatedFields
    })
}

export const deleteClinic = async (clinicId: string, ownerId: string) => {
    return await prisma.clinic.delete({ where: { id: clinicId, ownerId } })
}



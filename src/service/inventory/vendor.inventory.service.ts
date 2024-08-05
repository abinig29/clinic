
import { Vendor } from "@prisma/client"
import { prisma } from "../../config/prisma"




export const savevendor = async (vendor: Partial<Vendor>) => {
    return await prisma.vendor.create({
        data: {
            name: vendor?.name,
            address: vendor?.address,
            contact:vendor?.contact,
            email:vendor?.email,
        },
    })

}

export const updatevendor = async (vendorId: string, updatedFields: Partial<Vendor>) => {
    return await prisma.vendor.update({
        where: { id: vendorId },
        data: updatedFields,
    });

}


export const getvendorById = async (vendorId: string) => {
    return await prisma.vendor.findMany({
        where: {
            id: vendorId
        }
    })
}

export const deletevendor = async (id: string) => {
    return await prisma.vendor.delete({ where: { id } });
};


export const getvendors = async () => {
    return await prisma.vendor.findMany({})
}

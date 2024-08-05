import { Store } from "@prisma/client"
import { prisma } from "../../config/prisma"




export const saveStore = async (store: Partial<Store>) => {
    return await prisma.store.create({
        data: {
            name: store?.name,
            location: store?.location
        },
    })

}

export const updateStore = async (StoreId: string, updatedFields: Partial<Store>) => {
    return await prisma.store.update({
        where: { id: StoreId },
        data: updatedFields,
    });

}


export const getStoreById = async (StoreId: string) => {
    return await prisma.store.findMany({
        where: {
            id: StoreId
        }
    })
}

export const deleteStore = async (id: string) => {
    return await prisma.store.delete({ where: { id } });
};


export const getStores = async () => {
    return await prisma.store.findMany({})
}

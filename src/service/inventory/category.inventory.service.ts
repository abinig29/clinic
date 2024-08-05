import { InventoryItemCategory } from "@prisma/client"
import { prisma } from "../../config/prisma"


export const saveCategory = async (category: Partial<InventoryItemCategory>) => {
    return await prisma.inventoryItemCategory.create({
        data: {
            name: category?.name,
            description: category?.description,
            img: category?.img,
        },
    })

}

export const updateCategory = async (categoryId: string, updatedFields: Partial<InventoryItemCategory>) => {
    return await prisma.inventoryItemCategory.update({
        where: { id: categoryId },
        data: updatedFields,
    });

}


export const getCategoryById = async (categoryId: string) => {
    return await prisma.inventoryItemCategory.findMany({
        where: {
            id: categoryId
        }
    })
}

export const deleteCategory = async (id: string) => {
    return await prisma.inventoryItemCategory.delete({ where: { id } });
};


export const getCategorys = async () => {
    return await prisma.inventoryItemCategory.findMany({})
}

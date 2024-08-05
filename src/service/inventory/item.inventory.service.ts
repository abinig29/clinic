import { InventoryItem } from "@prisma/client"
import { prisma } from "../../config/prisma"
import NotFoundError from "../../errors/notFound.errors"
import { ErrorCode } from "../../errors/custom.errors"
import BadRequestError from "../../errors/badRequest.errors"


export const saveInventoryItem = async (item: Partial<InventoryItem>) => {
    return await prisma.inventoryItem.create({
        data: {
            name: item?.name,
            description: item?.description,
            price: item?.price,
            underStockThreshold: item?.underStockThreshold,
            overStockThreshold: item?.overStockThreshold,
            store: { connect: { id: item?.storeId, } },
            inventoryItemCategory: { connect: { id: item?.inventoryItemCategoryId } },
            vendor: { connect: { id: item?.vendorId } }
        },
    })

}
export const addInventory = async (productId: string, quantity: number, storeId: string, userId: string) => {
    const inventoryItem = await prisma.inventoryItem.findUnique({
        where: { id: productId },
        select: { quantity: true, overStockThreshold: true }
    });

    if (!inventoryItem) {
        throw new NotFoundError(`Product with ID ${productId} not found.`, ErrorCode.ITEM_NOT_FOUND);
    }
    const newQuantity = inventoryItem.quantity + quantity;

    if (newQuantity > inventoryItem?.overStockThreshold) {
        //   TO DO send notification to the super admin 
    }
    let transaction = undefined
    try {
        transaction = await prisma.$executeRaw`BEGIN`;
        const log = await prisma.inventoryLog.create({
            data: {
                inventoryItem: { connect: { id: productId } },
                quantity: quantity,
                action: 'ADD',
                user: { connect: { id: userId } },
                store: { connect: { id: storeId } }
            }
        });

        await prisma.inventoryItem.update({
            where: { id: productId },
            data: { quantity: newQuantity },

        });
        await prisma.$executeRaw`COMMIT`;

        return log
    } catch (error) {
        if (transaction) {
            await prisma.$executeRaw`ROLLBACK`;
        }
    }


}

export const takeInventory = async (productId: string, quantity: number, storeId: string, userId: string) => {
    const inventoryItem = await prisma.inventoryItem.findUnique({
        where: { id: productId },
        select: { quantity: true, underStockThreshold: true }
    });

    if (!inventoryItem) {
        throw new NotFoundError(`Product with ID ${productId} not found.`, ErrorCode.ITEM_NOT_FOUND);
    }
    const newQuantity = inventoryItem.quantity - quantity;
    if (newQuantity < 0) throw new BadRequestError("Have No Sufficent Inventory Item", ErrorCode.NOT_ENOUGH_ITEM_FOUND)
    if (newQuantity < inventoryItem?.underStockThreshold) {
        //   TO DO send notification to the super admin 
    }
    let transaction = undefined
    try {
        transaction = await prisma.$executeRaw`BEGIN`;
        const log = await prisma.inventoryLog.create({
            data: {
                inventoryItem: { connect: { id: productId } },
                quantity: quantity,
                action: "REMOVE",
                user: { connect: { id: userId } },
                store: { connect: { id: storeId } }
            }
        });

        await prisma.inventoryItem.update({
            where: { id: productId },
            data: { quantity: newQuantity },

        });
        await prisma.$executeRaw`COMMIT`;
        return log
    } catch (error) {
        if (transaction) {
            await prisma.$executeRaw`ROLLBACK`;
        }
    }


}

export const getInventoryItemyId = async (itemId: string) => {
    return await prisma.inventoryItem.findMany({
        where: {
            id: itemId
        }
    })
}

export const updateItem = async (StoreId: string, updatedFields: Partial<InventoryItem>) => {
    return await prisma.store.update({
        where: { id: StoreId },
        data: updatedFields,
    });

}

export const deleteInventory = async (id: string) => {
    return await prisma.inventoryItem.delete({ where: { id } });
};

export const getPaginatedInventoryItems = async (queryParams: any, storeId: string) => {
    const page = queryParams.page ? parseInt(queryParams.page, 10) : 1;
    const limit = queryParams.limit ? parseInt(queryParams.limit, 10) : 10;
    const offset = (page - 1) * limit;
    const orderBy = queryParams.sortOrder ?? "createdAt"
    const orderDirection = queryParams?.sortOrder ?? "desc"

    const query: Record<string, any> = { storeId };
    // TO DO inventory search functionality

    // if (queryParams?.search) {
    //     query["OR"] = [
    //         {
    //             fullName: {
    //                 contains: queryParams?.search
    //             },
    //         },
    //         {
    //             phoneNumber: {
    //                 contains: queryParams?.search
    //             },
    //         },
    //     ]
    // }
    const items = await prisma.inventoryItem.findMany({
        include: {
            inventoryItemCategory: true
        },
        where: query,
        skip: offset,
        take: Number(limit),
        orderBy: { [orderBy]: orderDirection as 'asc' | 'desc' },
    });



    const totalCount = await prisma.patient.count();
    const totalPages = Math.ceil(totalCount / Number(limit));
    return { currentPage: Number(page), totalCount, totalPages, items }

}

export const getInventoryItembyId = async (itemId: string) => {

    const inventory = await prisma.inventoryItem.findUnique({
        where: {
            id: itemId,
        },
        include: {
            inventoryItemCategory: true,
            inventoryLogs: {
                include: {
                    user: {
                        select: {
                            profile: {
                                select: {
                                    fullName: true
                                }
                            }
                        }
                    },

                }
            }
        }
        //  
    });
    return inventory
}
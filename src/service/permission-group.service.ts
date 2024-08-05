import { Role } from "@prisma/client";
import { prisma } from "../config/prisma";


export const savePermissionGroup = async (name: string, permissions: string[]) => {
    const newToken = await prisma.role.create({
        data: {
            name,
            permissions,
        },
    });
    return newToken

};
export const getAllPermissionGroups = async () => {
    return await prisma.role.findMany({
        where: { grantAll: false }
    })
}

export const getPermissionGroupById = async (id: string) => {
    const permissionGroup = await prisma.role.findUnique({ where: { id } });
    return permissionGroup;
};

export const deletePermissionGroup = async (id: string) => {
    return await prisma.role.delete({ where: { id } });
};

export const updatePermissionGroup = async (permissionGroupId: string, updatedFields: Partial<Role>) => {
    const updatedUser = await prisma.role.update({
        where: { id: permissionGroupId },
        data: updatedFields,
    });
    return updatedUser
}


import { WorkSpace } from "@prisma/client";
import { prisma } from "../config/prisma";

export const saveWorkspace = async (workspaceName: string, userIds: string[]) => {
    return await prisma.workSpace.create({
        data: {
            name: workspaceName,
            workspaceUser: {
                createMany: {
                    data: userIds?.map(id => ({ userId: id }))
                }
            }
        },
        include: {
            workspaceUser: true
        }
    })

}


export const updateWorkspace = async (workSpaceId: string, updatedFields: Partial<WorkSpace>) => {
    return await prisma.workSpace.update({
        where: { id: workSpaceId },
        data: updatedFields,
    });

}


export const getWorkspaceById = async (workSpaceId: string) => {
    return await prisma.workSpace.findMany({
        where: {
            id: workSpaceId
        }
    })
}

export const deleteWorkspace = async (id: string) => {
    return await prisma.workSpace.delete({ where: { id } });
};


export const getWorkspaces = async (userId: string) => {
    return await prisma.workSpace.findMany({
        where: {
            workspaceUser: {
                some: {
                    userId
                }
            }
        }
    })
}


export const kickOutUserToWorkspace = async (workSpaceId: string, userId: string) => {
    return await prisma.workSpace.update({
        where: {
            id: workSpaceId
        },
        data: {
            workspaceUser: {
                delete: {
                    id: userId
                }
            }
        },
        include: {
            workspaceUser: true
        }
    })
}

export const inviteUserToWorkspace = async (workSpaceId: string, userId: string) => {
    return await prisma.workSpace.update({
        where: {
            id: workSpaceId
        },
        data: {
            workspaceUser: {
                create: {
                    userId
                }
            }
        },
        include: {
            workspaceUser: true
        }
    })
}
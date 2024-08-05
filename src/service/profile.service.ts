import { Profile } from "@prisma/client"
import { prisma } from "../config/prisma"

export const getProfile = async (userId: string) => {
    const userWithProfile = await prisma.user.findFirst({
        where: { id: userId },
        include: { profile: true }
    })
    return userWithProfile?.profile
}

export const updateProfile = async (userId: string, updatedField: Partial<Profile>) => {
    const updatedUser = await prisma.user.update({
        where: { id: userId, },
        data: {
            profile: {
                update: {
                    data: updatedField
                }
            }
        },
        include: {
            profile: true
        }

    });
    return updatedUser;
}
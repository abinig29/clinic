import { LoginActivityLog, SecurityProfile, User } from "@prisma/client";
import { prisma } from "../config/prisma";

export const getAllLoginLog = async (userId: string) => {
    return await prisma.loginActivityLog.findMany({ where: { userId, } });
};


export const saveLoginAcitivy = async (activity: Partial<LoginActivityLog>, userId: string) => {
    return await prisma.loginActivityLog.create({
        data: {
            ipAddress: activity?.ipAddress,
            userAgent: activity?.userAgent,
            userId
        }
    })
}

export const clearLoginLog = async (userId: string) => {
    return await prisma.loginActivityLog.deleteMany({
        where: { userId }
    })
}

export const getSecurityProfile = async (userId: string) => {
    return await prisma.securityProfile.findFirst({ where: { userId } })
}

export const setFingerprintHash = async (userId: string, fingerprintHash: string) => {
    const securityProfile = await getSecurityProfile(userId)
    if (securityProfile) {
        return await prisma.securityProfile.update({
            where: {
                id: securityProfile?.id
            },
            data: {
                fingerprintHash,
            }
        })
    }
    else {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                SecurityProfile: {
                    create: {
                        fingerprintHash,
                    }
                }
            },
            include: {
                SecurityProfile: true
            }
        })
        return updatedUser?.SecurityProfile
    }

}


export const updateSaveLog = async (userId: string, saveActivityLog: boolean) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            SecurityProfile: {
                update: {
                    where: {
                        userId
                    },
                    data: {
                        saveActivityLog
                    }

                }
            }
        },
        include: {
            SecurityProfile: true
        }
    })
}



export const updatenotifyNewLogin = async (userId: string, notifyNewLogin: boolean) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            SecurityProfile: {
                update: {
                    where: {
                        userId
                    },
                    data: {
                        notifyOnNewBrowserLogin: notifyNewLogin
                    }
                }
            }
        },
        include: {
            SecurityProfile: true
        }
    })
}


export const softDeleteAccount = async (userId: string) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            SecurityProfile: {
                update: {
                    where: {
                        userId
                    },
                    data: {
                        softDeleted: true
                    }
                }
            }
        },
        include: {
            SecurityProfile: true
        }
    })
}



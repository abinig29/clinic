import { Permission, Profile, User } from "@prisma/client";
import { prisma } from "../config/prisma";
import ConflictError from "../errors/conflict.error";
import { ErrorCode } from "../errors/custom.errors";
import { has } from "config";

export const getUserByEmail = async ({ email, includePermission, includeProfile }:
    { email: string, includePermission?: boolean, includeProfile?: boolean },) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { phoneNumber: email },
            ],
            SecurityProfile: {
                softDeleted: false
            }
        },
        include: {
            profile: includeProfile ?? false,
            permission: includePermission ?? false
        }
    });
    return user;
};

export const getUserById = async (id: string, includePermission?: boolean,) => {
    const user = await prisma.user.findUnique(
        {
            where: {
                id, SecurityProfile: {
                    softDeleted: false
                }
            },
            include: {
                permission: true
            }
        },);
    return user;
};
export const getUserByIdNoSoftDelete = async (id: string,) => {
    return await prisma.user.findUnique(
        {
            where: {
                id,
            },
            include: {
                permission: true
            }
        },);
}
export const getUserByEmailOrPhone = async (emailOrPhone: string) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: emailOrPhone },
                { phoneNumber: emailOrPhone },
            ],
        },
        include: {
            SecurityProfile: true
        }
    });
    return user;
};

export const getUserByPhone = async ({ phone }: { phone: string }) => {
    const user = await prisma.user.findFirst({
        where: {
            phoneNumber: phone, SecurityProfile: {
                softDeleted: false
            }
        }
    });
    return user;
};



export const getUserByRole = async (role: string) => {
    const user = await prisma.user.findFirst({
        where: {
            role,
            SecurityProfile: {
                softDeleted: false
            }
        }
    });
    return user;
}



export const getUserWithAllIncluded = async ({ id, email, phone }: { id?: string, email?: string, phone?: string }, { excludeSecurity }: { excludeSecurity?: boolean }) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { id },
                { email },
                { phoneNumber: phone },
            ],
            SecurityProfile: {
                softDeleted: false
            }

        },
        select: {
            id: true,
            role: true,
            permission: true,
            profile: true,
            SecurityProfile: !excludeSecurity ?? true,
            password: false,
            email: true,
            phoneNumber: true,
            firstTimeLogin: true
        }
    });
    return user;


}




export const updateUser = async (userId: string, updatedFields: Partial<User>) => {
    console.log({ updatedFields })
    const updatedUser = await prisma.user.update({
        where: { id: userId, },
        data: updatedFields,
    });
    return updatedUser;
}
export const deleteUser = async (id: string, loggedin?: string) => {
    await prisma.user.delete(
        {
            where: {
                id,
                NOT: {
                    id: loggedin,
                },
            }
        }
    )
}
export const updateUserPermission = async ({ id, branchId, permissions, role }:
    { id?: string, role: string, branchId?: string[], permissions?: string[] }) => {
    const updatedUser = await prisma.user.update(
        {
            where: { id },
            data: {
                role,
                permission: {
                    update: {
                        permissions,
                        branchId
                    }
                }
            },
            include: {
                permission: true,
                profile: true
            }
        },

    )
    return updatedUser
}

export const updateActiveStatus = async (userId: string, softDeleted: boolean) => {
    const updatedUser = await prisma.user.update(
        {
            where: { id: userId },
            data: {
                SecurityProfile: {
                    update: {
                        softDeleted
                    }
                }
            },
            include: {
                permission: true,
                profile: true,
                SecurityProfile: true
            }
        },

    )
    return updatedUser
}


export const getAllUsers = async (branchId: string, queryParams: any, isActive?: boolean) => {
    const query: Record<string, any> = {
        permission: {
            branchId: {
                has: branchId
            }
        }
    };
    if (queryParams?.search) {
        query["OR"] = [
            {
                fullName: {
                    contains: queryParams?.search
                },
            },
            {
                phoneNumber: {
                    contains: queryParams?.search
                },
            },
        ]
    }
    if (queryParams?.role) {
        query["role"] = queryParams?.role
    }
    if (isActive) {
        query["SecurityProfile"] = {
            softDeleted: false
        }
    }


    const users = await prisma.user.findMany({
        where: {
            ...query,



        },
        select: {
            permission: true,
            SecurityProfile: true,
            profile: true,
            email: true,
            phoneNumber: true,
            role: true
        }

    });
    return users;
}



export const createUser = async (phone: string, role: string, user: Partial<User>, permission: Partial<Permission>, profile: Partial<Profile>) => {
    const existingUser = await getUserByPhone({ phone })
    if (existingUser) throw new ConflictError("User Already found", ErrorCode.USER_ALREADY_REGISTERED)
    return await prisma.user.create({
        data: {
            password: user?.password,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            role: role,
            permission: {
                create: {
                    branchId: permission?.branchId,
                    permissions: permission.permissions,
                    grantAll: permission?.grantAll ?? false
                }
            },
            profile: {
                create: {
                    fullName: profile?.fullName,
                    addresses: profile.addresses,
                    gender: profile.gender,
                    dateOfBirth: profile.dateOfBirth,
                    salary: profile.salary,
                    emernContact: profile.emernContact,
                    note: profile.note,
                    employmentStatus: profile.employmentStatus,
                    profileImg: profile?.profileImg
                }
            }
        },
        include: {
            permission: true,
            profile: true
        },

    })
}



export const getUsersById = async (userIds: string[]) => {
    return await prisma.user.findMany({
        where: {
            id: {
                in: userIds
            }
        }
    })
}
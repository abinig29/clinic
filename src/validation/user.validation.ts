import { EmploymentStatus } from "@prisma/client";
import { profile } from "console";
import { TypeOf, z, object, string } from "zod";

const getUsersSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional(),
        businessId: z.string().optional(),
        role: z.string().optional()
    })

});
const createUserSchema = z.object({
    body: object({
        user: object({
            email: string({ required_error: "Should have email" }).optional(),
            phoneNumber: string({ required_error: "Should have phone number" }).min(1, { message: 'Phone number should have at least 1 character' }),
            password: string().min(6, { message: 'password should have at least 6 character' }),
        }),
        profile: object({
            fullName: string({ required_error: "Should have full name" }).min(3, { message: 'full name should have at least 3 character' }),
            addresses: z.array(z.string().optional()).optional(),
            gender: z.enum(['M', "F"]),
            dateOfBirth: z.date().optional(),
            salary: z.number().optional(),
            emernContact: z.string().optional(),
            note: z.string().optional(),
            profileImg: z.string().optional(),
            employmentStatus: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'CASUAL'])
        }),
        permission: object({
            roleId: string(),
            branchId: z.array(z.string()),

        })


    })
})

const updateUserProfileSchema = z.object({
    body: object({
        fullName: string({ required_error: "Should have full name" }).min(3, { message: 'full name should have at least 3 character' }).optional(),
        addresses: z.array(z.string().optional()).optional(),
        gender: z.enum(['M', "F"]).optional(),
        dateOfBirth: z.date().optional(),
        salary: z.number().optional(),
        emernContact: z.string().optional(),
        note: z.string().optional(),
        profileImg: z.string().optional(),
        employmentStatus: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY', 'CASUAL']).optional()
    }),
    params: object({
        id: string()
    })
})


const changePermissionSchema = z.object({
    body: object({
        roleId: string().min(1, { message: 'First name should have at least 1 character' }).optional(),
        branchId: z.array(z.string().optional()).optional(),
    }),
    params: object({
        id: string()
    })
})

const deleteUserSchema = z.object({
    params: object({
        id: string()
    })
})

const changeActiveSchema = z.object({
    body: object({
        softDeleted: z.boolean()
    }),
    params: object({
        id: string()
    })
})








export { getUsersSchema, createUserSchema, changePermissionSchema, deleteUserSchema, changeActiveSchema, updateUserProfileSchema }

export type getUsersInput = TypeOf<typeof getUsersSchema>["query"];
export type createUserInput = TypeOf<typeof createUserSchema>["body"];
export type changePermissionInput = TypeOf<typeof changePermissionSchema>["body"];
export type changeActiveInput = TypeOf<typeof changeActiveSchema>["body"];
export type updateUserProfileInput = TypeOf<typeof updateUserProfileSchema>["body"];





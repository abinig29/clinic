import { TypeOf, z, object, string } from "zod";
import { ALL_PERMISSIONS } from "../config/permission";

const createPermissionGroupSchema = z.object({
    body: object({
        name: z.string({ required_error: 'name is required' }),
        permissions: z.array(z.enum(ALL_PERMISSIONS)),
    })
})

const deletePermissionGroupSchema = z.object({
    params: object({
        id: z.string().min(1)
    })
})

const updatePermissionGroupSchema = z.object({
    params: object({
        id: z.string().min(1)
    }),
    body: object({
        name: z.string().optional(),
        permissions: z.array(z.enum(ALL_PERMISSIONS)).optional(),
    })

})

export type createPermissionGroupInputType = TypeOf<typeof createPermissionGroupSchema>["body"]
export type updatePermissionGroupInputType = TypeOf<typeof updatePermissionGroupSchema>["body"]

export { createPermissionGroupSchema, deletePermissionGroupSchema, updatePermissionGroupSchema }
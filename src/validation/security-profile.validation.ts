import { TypeOf, z, object } from "zod";
const updateSaveLogSchema = z.object({
    body: object({
        saveLog: z.boolean()
    })
})

const updateNotifyNewLoginSchema = z.object({
    body: object({
        notify: z.boolean()
    })
})

export type updatSaveLogInput = TypeOf<typeof updateSaveLogSchema>["body"]
export type updatNotifyNewLoginInput = TypeOf<typeof updateNotifyNewLoginSchema>["body"]

export { updateSaveLogSchema, updateNotifyNewLoginSchema }
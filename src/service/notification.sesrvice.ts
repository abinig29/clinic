import { Notification } from "@prisma/client"
import { prisma } from "../config/prisma"

export const sendNotification = async (notification: Partial<Notification>) => {

    const notificationCreated = await prisma.notification.create({
        data: {
            title: notification.title,
            content: notification.content,
            recipientId: notification.recipientId
        }
    })
    return notificationCreated

}
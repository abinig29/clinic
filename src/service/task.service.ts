import { date } from "zod";
import { prisma } from "../config/prisma"
import { createTaskInput, updateTaskInput } from "../validation/task.validation"
import { sendNotification } from "./notification.sesrvice";

export const saveTask = async (userID: string, taskInput: createTaskInput) => {
    const lastTask = await prisma.task.findFirst({
        where: {
            status: taskInput.status,
            workSpaceId: taskInput?.workSpaceId
        },
        orderBy: {
            position: "desc",
        },
    });

    const newPosition = lastTask ? lastTask.position + 1 : 1;
    const dueDate = new Date(taskInput?.dueDate) ?? new Date()
    const priority = taskInput?.priority ?? "NO_PRIORITY"

    const task = await prisma.task.create({
        data: {
            dueDate,
            priority,
            assignedToId: taskInput?.assignedTo ?? userID,
            position: newPosition,
            title: taskInput?.title,
            description: taskInput?.description,
            status: taskInput?.status ?? "OPEN",
            createdById: userID,
            workSpaceId: taskInput?.workSpaceId
        }
    })
    if (taskInput?.assignedTo != userID)
        await sendNotification({
            recipientId: taskInput?.assignedTo,
            title: "New Task Assigned",
            content: `You have been assigned to task '${taskInput?.title}'`,
        })
    return task

}



export const updateTask = async (taskInput: updateTaskInput, taskId: string) => {
    const body: any = { ...taskInput }
    if (taskInput?.dueDate) body.dueDate = new Date(taskInput.dueDate)
    await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            ...body,
        }
    })


}
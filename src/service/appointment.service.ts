import { Appointment } from "@prisma/client";
import { prisma } from "../config/prisma";
import BadRequestError from "../errors/badRequest.errors";
import { ErrorCode } from "../errors/custom.errors";
import { getUserById } from "./user.service";
import NotFoundError from "../errors/notFound.errors";
import { getPatientbyId, unpinPatiens, updatePatient } from "./patient.service";
import { getBranchById } from "./branch.service";
import { getEndTimefromDate, getMinutesSinceMidnight } from "../utils/util";
import ConflictError from "../errors/conflict.error";
import { getAppointmentsInput } from "../validation/appointment.validation";
import { sendNotification } from "./notification.sesrvice";

export const getOverLappingAppointment = async ({ appointmentStart, appointmentEnd, doctorId, date }:
    { appointmentStart: string, appointmentEnd: string, doctorId: string, date: Date }) => {
    const startMinutes = getMinutesSinceMidnight(appointmentStart);
    const endMinutes = getMinutesSinceMidnight(appointmentEnd);

    return await prisma.appointment.findMany({
        where: {
            doctorId: doctorId,
            date: date,
            OR: [
                {
                    AND: [
                        { timeMinutes: { lte: endMinutes } }, // Appointment starts before or at the end of the range
                        { timeEndMinutes: { gte: startMinutes } } // Appointment ends after or at the start of the range
                    ]
                },
                {
                    AND: [
                        { timeMinutes: { lte: startMinutes } }, // Appointment starts before or at the start of the range
                        { timeEndMinutes: { gte: endMinutes } } // Appointment ends after or at the end of the range
                    ]
                },
                {
                    AND: [
                        { timeMinutes: { gte: startMinutes } }, // Appointment starts after or at the start of the range
                        { timeEndMinutes: { lte: endMinutes } } // Appointment ends before or at the end of the range
                    ]
                }
            ]
        }
    })
}


export async function createAppointment(appointmentData: Partial<Appointment>) {
    const { doctorId, date, time, duration, patientId, branchId } = appointmentData;
    const appointmentEnd = getEndTimefromDate(date, duration, time)
    const overlappingAppointments = await getOverLappingAppointment({ appointmentStart: time, appointmentEnd: appointmentEnd, doctorId, date })
    if (overlappingAppointments.length > 0) {
        throw new ConflictError('Doctor is already booked at the selected date and time.', ErrorCode.DOCTOR_ALREADY_BOOKED);
    }
    const timeMinutes = getMinutesSinceMidnight(time);
    const timeEndMinutes = getMinutesSinceMidnight(appointmentEnd)
    const appointment = await prisma.appointment.create({
        data: {
            doctorId,
            patientId,
            date,
            time,
            branchId,
            duration,
            timeMinutes,
            timeEndMinutes,
            status: "SCHEDULED"
        },
        include: {
            patient: true
        }

    });
    await sendNotification({
        recipientId: doctorId,
        title: "New Dental Appointment Scheduled",
        content: `${appointment?.patient?.fullName}  have new apointment in ${date} at ${time}`
    })

    return appointment

}


export const checkAppointmentPre = async ({ doctorId, patientId, branchId }: { doctorId: string, patientId: string, branchId: string }) => {
    const doctor = await getUserById(doctorId)
    if (!doctor) throw new NotFoundError("Doctor not found", ErrorCode.USER_NOT_FOUND)
    const patient = await getPatientbyId(patientId)
    if (!patient) throw new NotFoundError("Patient not found", ErrorCode.USER_NOT_FOUND)
    if (!branchId) throw new BadRequestError("Havent found any branch", ErrorCode.NO_PERMISSION)
    const branch = await getBranchById(branchId)
    if (!branch) throw new NotFoundError("Branch not found", ErrorCode.BRANCH_NOT_FOUND)
    return true
}
export const getAppointmentById = async (appointmentId: string) => {
    return await prisma.appointment.findUnique({ where: { id: appointmentId } })

}


export const updateAppointment = async (appointmentId: string, updatedFields: Partial<Appointment>) => {
    const { doctorId, date, time, duration } = updatedFields;
    const appointmentEnd = getEndTimefromDate(date, duration, time)

    const overlappingAppointments = await getOverLappingAppointment({ appointmentStart: time, appointmentEnd: appointmentEnd, doctorId, date })
    if (overlappingAppointments.length > 0) {
        throw new ConflictError('Doctor is already booked at the selected date and time.', ErrorCode.DOCTOR_ALREADY_BOOKED);
    }
    const timeMinutes = getMinutesSinceMidnight(time);
    const timeEndMinutes = getMinutesSinceMidnight(appointmentEnd)
    const appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
            ...updatedFields,
            timeMinutes,
            timeEndMinutes
        },
        include: {
            patient: true
        }
    })
    await sendNotification({
        recipientId: appointment?.doctorId,
        title: " Appointment Rescheduled",
        content: `Your Schedule For ${appointment?.patient?.fullName} Has Been REscheduled for ${appointment?.date}`,
    })
    return appointment
}



export const updateAppointmentStatus = async (appointmentId: string, updatedFields: Partial<Appointment>) => {
    const updatedAppointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: updatedFields,
        include: {
            patient: true,
            doctor: {
                select: {
                    profile: {
                        select: {
                            fullName: true
                        }
                    }
                }
            }
        }
    })

    if (updatedFields?.status === "STARTED") {
        let transaction = undefined
        try {
            transaction = await prisma.$executeRaw`BEGIN`;
            await unpinPatiens(updatedAppointment?.doctorId)
            await updatePatient(updatedAppointment?.patientId, { pinned: true })
            await prisma.$executeRaw`COMMIT`;
        } catch (error) {
            if (transaction) {
                await prisma.$executeRaw`ROLLBACK`;
            }
        }
    }
    else if (updatedFields?.status === "COMPLETED") {
        await updatePatient(updatedAppointment?.patientId, { pinned: false })
    }
    if (updatedFields?.status === "CANCELLED")
        await sendNotification({
            recipientId: updatedAppointment?.doctorId,
            title: " Appointment Schedule Cancellation",
            content: `Your Schedule For ${updatedAppointment?.patient?.fullName} Has Been Cancelled`,
        })
    return updatedAppointment
}



export const getAppointments = async (queryParams: getAppointmentsInput, branchId: string) => {
    const query: Record<string, any> = { branchId };
    if (queryParams?.doctorId) {
        query["doctorId"] = queryParams.doctorId
    }
    if (queryParams?.date) {
        query["date"] = new Date(queryParams.date)
    }
    else if (queryParams.startDate && queryParams.endDate) {
        query["date"] = {
            gte: new Date(queryParams.startDate),
            lte: new Date(queryParams.endDate),
        }
    }


    const appointments = await prisma.appointment.findMany({
        where: query,
        include: {
            doctor: {
                select: {
                    id: true,
                    profile: {
                        select: {
                            fullName: true
                        }
                    }
                }
            }
        },
        orderBy: {
            date: 'asc',
        },

    })
    const appointmentsGroupedByDoctors = () => appointments.reduce((acc: Record<string, any>, appointment) => {
        const doctorId = appointment.doctor.id;
        if (!acc[doctorId]) {
            acc[doctorId] = {
                doctor: appointment.doctor,
                appointments: [],
            };
        }
        acc[doctorId].appointments.push(appointment);
        return acc;
    }, {});

    return !queryParams?.doctorId ? appointmentsGroupedByDoctors() : appointments


}

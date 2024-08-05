import { Request } from "express";

export function generateVerificationCode(length: number) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); // generates a random digit (0-9)
    }
    return result;
}

export const extractTokenfromHeader = (req: Request) => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string;
    if (!authHeader?.startsWith("Bearer ")) {
        return false
    }
    return authHeader.split(" ")[1];
}

export function getMinutesSinceMidnight(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}



export const getEndTimefromDate = (date: Date, duration: number, time: string) => {
    const appointmentEnd = new Date(date);
    appointmentEnd.setHours(Number(time.split(':')[0]) + Math.floor(duration / 60));
    appointmentEnd.setMinutes(Number(time.split(':')[1]) + (duration % 60));

    const appointmentEndInRightFormat = (appointmentEnd.toTimeString().split(' ')[0]).split(':').slice(0, 2).join(':');
    return appointmentEndInRightFormat
}
import bcryptjs from 'bcryptjs'
export const hashPassowrd = async (password: string, saltLength?: number) => {
    const salt = await bcryptjs.genSalt(saltLength ?? 10)
    return await bcryptjs.hash(password, salt)
}
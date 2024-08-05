import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.string({ required_error: "Port number is required" }),
    NODE_ENV: z.enum(['development', "production", "test"]),
    DATABASE_URL: z.string({ required_error: "Db url is required" }),

    JWT_ACCESS_SECRET: z.string({ required_error: "Access secret is required" }).min(1),
    JWT_REFRESH_SECRET: z.string({ required_error: "Refresh secret is required" }).min(1),
    JWT_ACCESS_EXPIRATION_MINUTES: z.string(),
    JWT_REFRESH_EXPIRATION_DAYS: z.string(),

    VERIFICATION_CODE_EXP: z.string(),


    SMTP_HOST: z.string(),
    SMTP_PORT: z.string(),
    SMTP_SERVICE: z.string(),
    SMTP_MAIL: z.string(),
    SMTP_PASSWORD: z.string()
});

export type EnvConfig = z.infer<typeof envSchema>;


import dotenv from 'dotenv';
import { EnvConfig, envSchema } from '../validation/env.validation';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';
import { env } from 'process';
dotenv.config();


export const validateEnv = () => {
    try {
        const envVars: EnvConfig = envSchema.parse(process.env);
        return {
            port: +envVars.PORT,
            env: envVars.NODE_ENV,
            smtp: {
                host: envVars.SMTP_HOST,
                port: envVars.SMTP_PORT,
                service: envVars.SMTP_SERVICE,
                mail: envVars.SMTP_MAIL,
                password: envVars.SMTP_PASSWORD
            },
            jwt: {
                accessSecret: envVars.JWT_ACCESS_SECRET,
                refreshSecret: envVars.JWT_REFRESH_SECRET,
                accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
                refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
            },
            verificationCodeExpire: env.VERIFICATION_CODE_EXP
            // rateLimiter: {
            //     maxAttemptsPerDay: envVars.MAX_ATTEMPTS_PER_DAY,
            //     maxAttemptsByIpUsername: envVars.MAX_ATTEMPTS_BY_IP_USERNAME,
            //     maxAttemptsPerEmail: envVars.MAX_ATTEMPTS_PER_EMAIL,
            // },
        };
    } catch (error) {
        if (error instanceof ZodError) {
            logger.error('Validation failed:', error.errors);
        } else {
            logger.error('Error parsing environment variables:', error);
        }
    }

}

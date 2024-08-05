import { bootstrapExpress } from "./express";
import { logger } from '../utils/logger';
import { validateEnv } from "../config/config";

export const bootstrap = async (app) => {
    validateEnv()
    bootstrapExpress(app);
    logger.info('Express app initiated.');





};
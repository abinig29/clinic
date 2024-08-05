import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { logger } from "../utils/logger";

const validateSchema =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                next();
            } catch (e) {
                if (e instanceof ZodError) {
                    const errorMessage = e.errors.map(err => err.message).join(', ');
                    return res.status(422).json({ success: false, message: errorMessage });
                }
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
        };

export default validateSchema;
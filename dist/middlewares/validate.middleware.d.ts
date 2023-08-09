import Joi from "joi";
import { NextFunction, Request, Response } from "express";
export declare const validate: <T extends Joi.ObjectSchema<any>>(schema: T) => (req: Request, _res: Response, next: NextFunction) => Promise<void>;

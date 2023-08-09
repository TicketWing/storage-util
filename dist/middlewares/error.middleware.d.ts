import { Response } from "express";
import { CustomError } from "../utils/error.util";
export declare const errorMiddleware: (err: Error | CustomError, _req: any, res: Response) => void;

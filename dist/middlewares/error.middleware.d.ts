import { Response } from "express";
import { ErrorConstructor } from "../constructors/error.constructor";
export declare const errorMiddleware: (err: Error | ErrorConstructor, _req: any, res: Response) => void;

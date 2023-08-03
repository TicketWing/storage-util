export declare class CustomError extends Error {
    name: string;
    message: string;
    code: number;
    constructor(name: string, msg: string, code: number);
}

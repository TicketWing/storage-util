export declare class ResponseConstructor<T> {
    private success;
    private message;
    private data;
    constructor(success: boolean, message: string, data?: T | null);
    static success<T>(data: T): ResponseConstructor<T>;
    static error<T>(message: string): ResponseConstructor<T>;
}

export declare class ErrorHandler {
    private code;
    private name;
    constructor(name: string, code: number);
    handler<T>(promise: Promise<T>, msg: string): Promise<T>;
}

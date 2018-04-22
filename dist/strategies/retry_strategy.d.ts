/// <reference types="request" />
import { IRequestStrategy } from "../interface";
import { OptionsWithUri, Response } from "request";
export declare class RequestRetryStrategy implements IRequestStrategy {
    private _maxAttempts;
    private _retryDelay;
    constructor();
    constructor(maxAttempts: any);
    constructor(maxAttempts: any, _retryDelay: any);
    request(options: OptionsWithUri): Promise<Response>;
}

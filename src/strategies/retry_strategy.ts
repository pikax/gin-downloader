import {IRequestStrategy, IMangaRequest} from "../interface";
import {Options, OptionsWithUri, Response} from "request";

const requestRetry: any = require("requestretry");


// specific options for requestretry lib
const DefaultOptions = {
    retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError, // (default) retry on 5xx or network errors
    fullResponse: true
};


const maxAttempts = 20,
    retryDelay = 300;


// retries if the request fails
export class RequestRetryStrategy implements IRequestStrategy {

    constructor();
    constructor(maxAttempts);
    constructor(maxAttempts, _retryDelay);
    constructor(private _maxAttempts = maxAttempts, private _retryDelay = retryDelay) {
    }


    request(options: OptionsWithUri): Promise<Response> {
        const opts = {
            ...options,
            ...DefaultOptions,

            maxAttempts: this._maxAttempts,
            retryDelay: this._retryDelay,
        };

        return requestRetry(opts);
    }
}



/// <reference types="request" />
import { IRequestStrategy } from "../interface";
import { IMangaRequest, IMangaRequestFactory } from "../interface";
import { OptionsWithUri } from "request";
export declare class ConcurrentQueueRequestFactory implements IMangaRequestFactory {
    private _requestStrategy;
    private _queue;
    constructor(_requestStrategy: IRequestStrategy, _queue: {
        add: (f) => any;
    });
    request(options: OptionsWithUri): Promise<IMangaRequest>;
}

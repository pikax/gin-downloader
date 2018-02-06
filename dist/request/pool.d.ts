import { GinPoolConfig } from "./../config";
import { Lazy } from "./../util";
import { GinUrlOptions, RequestStrategy } from "./index";
export declare type GinPoolQueue = GinPoolConfig & {
    queue: QueuePool;
};
export interface ActivePool {
    id: number;
    uri: GinUrlOptions;
    item?: Lazy<Promise<any>>;
    isActive: boolean;
}
export declare type HistoryPool = ActivePool & {
    resolved?: Date;
    started?: Date;
    created: Date;
    failed?: boolean;
    error?: any;
};
export interface QueuePool {
    queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any>;
}
export declare function request(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any>;
export declare function getPool(uri: GinUrlOptions): GinPoolQueue;
export declare function rebuildPool(): void;
export declare class ConcurrentQueue implements QueuePool {
    private _config;
    private _currId;
    private _history;
    readonly history: HistoryPool[];
    private readonly _queue;
    constructor(_config: GinPoolConfig);
    queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any>;
    private getNextId();
}
export declare class IntervalLazy<T extends Promise<any>> extends Lazy<T> {
    private _requestInterval;
    resolved?: Date;
    started?: Date;
    created: Date;
    failed?: boolean;
    error?: any;
    append(lazy: Lazy<T>): Promise<IntervalLazy<T>>;
    constructor(_func: () => T, _requestInterval: number);
}
export declare class IntervalPool implements QueuePool {
    private _config;
    currentLazy: IntervalLazy<Promise<any>>;
    constructor(_config: GinPoolConfig);
    queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any>;
}

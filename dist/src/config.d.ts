/// <reference types="request" />
/**
 * Created by pikax on 16/07/2017.
 */
import { RequestStrategy, CoreOptions } from "src/request/index";
export interface GinPoolConfig {
    simultaneousRequests?: number;
    maxQueueSize?: number;
    safeQueueSize?: number;
    requestInterval?: number;
    match: RegExp;
}
export interface GinConfig {
    maxRetries?: number;
    timeout?: number;
    interval?: number;
    disableHttps?: boolean;
    pooling?: {
        [poolId: string]: GinPoolConfig;
    };
    sites?: {
        [key: string]: RequestStrategy;
    };
    request?: CoreOptions;
}
export declare class Config {
    private _use;
    private _config;
    readonly defaultConfig: GinConfig;
    readonly config: GinConfig;
    use: GinConfig;
    reset(): void;
    private buildConfig(conf?);
}
export declare const ginConfig: Config;
export default ginConfig;

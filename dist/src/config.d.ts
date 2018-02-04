/// <reference types="request" />
import { RequestStrategy, CoreOptions, RequestRetryStrategy, RequestCloudFlareStrategy } from "./request/index";
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
export interface IGinConfigFactory {
    config: GinConfig;
}
export declare class Config implements IGinConfigFactory {
    private _use;
    private _config;
    readonly defaultConfig: GinConfig;
    readonly config: GinConfig;
    use: GinConfig;
    reset(): void;
    private buildConfig(conf?);
}
export declare const ginConfig: Config;
export declare const retryStrategy: RequestRetryStrategy;
export declare const cloudflareStrategy: RequestCloudFlareStrategy;
export default ginConfig;

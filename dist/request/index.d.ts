/// <reference types="request" />
/**
 * Created by pikax on 16/07/2017.
 */
import { OptionsWithUrl } from "request";
export { Options, CoreOptions, OptionsWithUrl } from "request";
export declare type GinUrlOptions = string | OptionsWithUrl;
export interface RequestStrategy {
    request(options: GinUrlOptions): Promise<any>;
}
export declare const strategies: {
    retry: RequestStrategy;
    cloudflare: RequestStrategy;
};

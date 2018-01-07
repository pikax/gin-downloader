/// <reference types="request" />
import { OptionsWithUrl } from "request";
export declare type GinUrlOptions = string | OptionsWithUrl;
export interface RequestStrategy {
    request(options: GinUrlOptions): Promise<any>;
}
export { Options, CoreOptions, OptionsWithUrl } from "request";

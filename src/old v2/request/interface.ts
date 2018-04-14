
import {OptionsWithUrl} from "request";

export type GinUrlOptions = string | OptionsWithUrl;

export interface RequestStrategy {
  request(options: GinUrlOptions): Promise<any>;
}

export {Options, CoreOptions, OptionsWithUrl} from "request";

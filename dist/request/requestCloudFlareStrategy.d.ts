/// <reference types="request" />
import { OptionsWithUrl } from "request";
import { RequestStrategy } from "./interface";
export declare class RequestCloudFlareStrategy implements RequestStrategy {
    request(options: string | OptionsWithUrl): Promise<any>;
}

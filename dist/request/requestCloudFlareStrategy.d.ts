/// <reference types="request" />
/**
 * Created by pikax on 23/05/2017.
 */
import { OptionsWithUrl } from "request";
import { RequestStrategy } from "./index";
export declare class RequestCloudFlareStrategy implements RequestStrategy {
    request(options: string | OptionsWithUrl): Promise<any>;
}
export declare const strategy: RequestCloudFlareStrategy;
export default strategy;

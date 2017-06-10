/**
 * Created by pikax on 23/05/2017.
 */
import { OptionsWithUrl } from "request";
import { RequestStrategy } from "./headers";
export declare class RequestCloudFareStrategy implements RequestStrategy {
    request(options: string | OptionsWithUrl): Promise<any>;
}
export declare const strategy: RequestCloudFareStrategy;
export default strategy;

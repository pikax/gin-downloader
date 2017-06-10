import { RequestStrategy } from "./headers";
import { OptionsWithUrl } from "request";
export declare class RequestRetryStrategy implements RequestStrategy {
    request(options: string | OptionsWithUrl): Promise<any>;
}
export declare const strategy: RequestRetryStrategy;
export default strategy;

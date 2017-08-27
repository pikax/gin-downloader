import { GinUrlOptions, RequestStrategy } from "./index";
export declare class RequestRetryStrategy implements RequestStrategy {
    request(options: GinUrlOptions): Promise<any>;
}
export declare const strategy: RequestRetryStrategy;
export default strategy;

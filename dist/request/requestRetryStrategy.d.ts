import { GinUrlOptions, RequestStrategy } from "./interface";
export declare class RequestRetryStrategy implements RequestStrategy {
    request(options: GinUrlOptions): Promise<any>;
}

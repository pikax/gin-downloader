import config from "src/config";
import {GinUrlOptions, OptionsWithUrl, RequestStrategy} from "./index";
import {pick} from "lodash";

const requestRetry = require("requestretry");


// specific options for requestretry lib
const DefaultOptions = {
  retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError, // (default) retry on 5xx or network errors
  fullResponse: false, // To resolve the promise with the full response or just the body
};

export class RequestRetryStrategy implements RequestStrategy {
  request(options: GinUrlOptions): Promise<any> {
    let opts: OptionsWithUrl = <any>{...DefaultOptions, ... config.config.request, ...pick(config.config, "maxRetries", "timeout", "interval")};
    if (typeof options === "string") {
      opts.url = options;
    }
    else {
      opts = {...opts, ...options};
    }

    return requestRetry(opts);
  }
}

export const strategy = new RequestRetryStrategy();
export default strategy;


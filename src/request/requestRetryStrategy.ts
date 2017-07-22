import * as url from "url";
/**
 * Created by pikax on 23/05/2017.
 */


const requestRetry = require("requestretry");
import {RequestStrategy, OptionsWithUrl} from "./index";
import config from "./../config";



// specific options for requestretry lib
const DefaultOptions = {
  retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError, // (default) retry on 5xx or network errors
  fullResponse: false, // To resolve the promise with the full response or just the body
};

export class RequestRetryStrategy implements RequestStrategy {
  request(options: string | OptionsWithUrl): Promise<any> {
    let opts: OptionsWithUrl = <any>{...DefaultOptions, ... config.config};

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


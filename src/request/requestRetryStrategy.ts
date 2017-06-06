import * as url from "url";
/**
 * Created by pikax on 23/05/2017.
 */


const requestRetry = require("requestretry");
import {RequestStrategy} from "./headers";
import {OptionsWithUrl} from "request";


const MaxRetries = 50;
const Timeout = 20000;
const Interval = 30 + Timeout;



const DefaultOptions = {
  method: "GET",

  gzip: true,
  timeout: Timeout,
  followAllRedirects: true,
  jar: true,

  forever: true,
  // proxy: config.proxy, // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.

  // The below parameters are specific to request-retry
  maxAttempts: MaxRetries,   // (default) try N times
  retryDelay: Interval,  // (default) wait before trying again
  retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError, // (default) retry on 5xx or network errors
  fullResponse: false, // To resolve the promise with the full response or just the body
};

export class RequestRetryStrategy implements RequestStrategy {
  request(options: string | OptionsWithUrl): Promise<any> {
    let opts: OptionsWithUrl = <any>{...DefaultOptions};

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


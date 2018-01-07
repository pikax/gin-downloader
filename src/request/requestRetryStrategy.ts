import config, {IGinConfigFactory} from "./../config";
import {GinUrlOptions, OptionsWithUrl, RequestStrategy} from "./interface";
import {pick} from "lodash";

const requestRetry = require("requestretry");


// specific options for requestretry lib
const DefaultOptions = {
  retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError, // (default) retry on 5xx or network errors
  fullResponse: false, // To resolve the promise with the full response or just the body
};

let _config: IGinConfigFactory;
const getConfig = async () => {
  if (!_config) {
    _config = await import("../config").then(x => x.ginConfig);
  }
  return _config.config;
};



export class RequestRetryStrategy implements RequestStrategy {

  async request(options: GinUrlOptions): Promise<any> {
    const config = await getConfig();
    let opts: OptionsWithUrl = <any>{...DefaultOptions, ...config.request, ...pick(config, "maxRetries", "timeout", "interval")};
    if (typeof options === "string") {
      opts.url = options;
    }
    else {
      opts = {...opts, ...options};
    }


    // TODO find a better place for this
    if (config.disableHttps) {
      opts.url = opts.url.toString().replace("https", "http");
    }

    return await requestRetry(opts);
  }
}

//
// export const strategy = new RequestRetryStrategy();
// export default strategy;


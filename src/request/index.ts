/**
 * Created by pikax on 16/07/2017.
 */


import {Options, OptionsWithUrl} from "request";
import {strategy as cloudFlareStrategy} from "./requestCloudFlareStrategy";
import {strategy as retryStrategy} from "./requestRetryStrategy";

export {Options, CoreOptions, OptionsWithUrl} from "request";

//
// import {RequestRetryStrategy} from "./requestRetryStrategy";
// import {RequestCloudFlareStrategy} from "./requestCloudFareStrategy";


export type GinUrlOptions = string | OptionsWithUrl;


export interface RequestStrategy {
  request(options: GinUrlOptions): Promise<any>;
}

/*: {retry: RequestStrategy, cloudflare: RequestStrategy} */




export const strategies: {retry: RequestStrategy, cloudflare: RequestStrategy} = {
  retry: retryStrategy,
  cloudflare: cloudFlareStrategy,
};


//
// const s: {retry: RequestRetryStrategy, cloudflare: RequestCloudFlareStrategy} = {
//   retry: requestRetryStrategy,
//   cloudflare: requestCloudFareStrategy,
// };
//
//
// export const strategies = s;
//

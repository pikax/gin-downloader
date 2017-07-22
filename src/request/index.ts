/**
 * Created by pikax on 16/07/2017.
 */


import {Options} from "request";
export {Options, CoreOptions, OptionsWithUrl} from "request";

//
// import {RequestRetryStrategy} from "./requestRetryStrategy";
// import {RequestCloudFareStrategy} from "./requestCloudFareStrategy";


import requestRetryStrategy, {RequestRetryStrategy} from "./requestRetryStrategy";
import requestCloudFareStrategy, {RequestCloudFareStrategy} from "./requestCloudFareStrategy";


export interface RequestStrategy {
  request(options: string|Options): Promise<any>;
}

/*: {retry: RequestStrategy, cloudFare: RequestStrategy} */




export const strategies = {
  retry: new RequestRetryStrategy(),
  cloudFare: new RequestCloudFareStrategy(),
};


//
// const s: {retry: RequestRetryStrategy, cloudFare: RequestCloudFareStrategy} = {
//   retry: requestRetryStrategy,
//   cloudFare: requestCloudFareStrategy,
// };
//
//
// export const strategies = s;
//

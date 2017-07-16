/**
 * Created by pikax on 16/07/2017.
 */
import {Options} from "request";
import requestRetryStrategy from "./requestRetryStrategy";
import requestCloudFareStrategy from "./requestCloudFareStrategy";


export interface RequestStrategy {
  request(options: string|Options): Promise<any>;
}




export const strategies: {[key: string]: RequestStrategy} = {
  retry: requestRetryStrategy,
  cloudFare: requestCloudFareStrategy,
};

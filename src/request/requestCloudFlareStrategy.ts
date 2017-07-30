/**
 * Created by pikax on 23/05/2017.
 */

import {OptionsWithUrl} from "request";
const cloudscraper = require("cloudscraper");

import {RequestStrategy} from "./index";
import config from "./../config";



// specific options for cloudscraper lib
const DefaultOptions = {
  // none
  method: "GET"
};


export class RequestCloudFlareStrategy implements RequestStrategy {
  request(options: string | OptionsWithUrl): Promise<any> {
    let opts: OptionsWithUrl = <any>{...DefaultOptions, ...config.config};

    if (typeof options === "string") {
      opts.url = options;
    }
    else {
      opts = {...opts, ...options};
    }

    return new Promise((res, rej) => {
      let callback = (err: number, response: any, body: Buffer) => {
        if (err) {
          return rej(err);
        }
        return res(body);
      };

      if (opts.method === "POST") {
        cloudscraper.post(opts.url, opts.body, callback);
      }
      else {
        cloudscraper.request(opts, callback);
      }
    });
  }
}

export const strategy = new RequestCloudFlareStrategy();
export default strategy;

/**
 * Created by pikax on 23/05/2017.
 */

import {OptionsWithUrl} from "request";
const cloudscraper = require("cloudscraper");

import {RequestStrategy} from "./headers";


// const Timeout = 20000;


const DefaultOptions = {
  method: "GET",

  gzip: true,
  encoding: "",
  // timeout: Timeout,
  followAllRedirects: true,

  forever: true,
};


export class RequestCloudFareStrategy implements RequestStrategy {
  request(options: string | OptionsWithUrl): Promise<any> {
    let opts: OptionsWithUrl = <any>{...DefaultOptions};

    if (typeof options === "string") {
      opts.url = options;
    }
    else {
      opts = {...opts, ...options};
    }

    return new Promise((res, rej) => {
      let callback = (err: number, response: any, body: Buffer) => {
        // cloudscraper.request(opts, (err: number, response: any, body: Buffer) => {
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
    };
  }
}


export const strategy = new RequestCloudFareStrategy();

export default strategy;

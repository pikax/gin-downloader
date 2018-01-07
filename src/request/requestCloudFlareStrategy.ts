import {OptionsWithUrl} from "request";

const cloudscraper = require("cloudscraper");

import {RequestStrategy} from "./interface";

import {IGinConfigFactory} from "./../config";


// specific options for cloudscraper lib
const DefaultOptions = {
  // none
  method: "GET"
};


let _config: IGinConfigFactory;
const getConfig = async () => {
  if (!_config) {
    _config = await import("../config").then(x => x.ginConfig);
  }
  return _config.config;
};

export class RequestCloudFlareStrategy implements RequestStrategy {


  async request(options: string | OptionsWithUrl): Promise<any> {
    const config = await getConfig();
    let opts: OptionsWithUrl = <any>{...DefaultOptions, ...config.request};

    if (typeof options === "string") {
      opts.url = options;
    }
    else {
      opts = {...opts, ...options};
    }

    return await new Promise((res, rej) => {
      const callback = (err: number, response: any, body: Buffer) => {
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

//
// export const strategy = new RequestCloudFlareStrategy();
// export default strategy;

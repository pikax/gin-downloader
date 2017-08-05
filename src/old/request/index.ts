/**
 * Created by pikax on 23/05/2017.
 */


import {MangaXDoc} from "../declarations";
import {RequestStrategy} from "./headers";
import {OptionsWithUrl} from "request";
import {parseDoc} from "../common/helper";



const debug = require("debug")("gin-downloader:request");
const verbose = require("debug")("gin-downloader:request:verbose");
const error = require("debug")("gin-downloader:error");




export class GinRequest  {
  get headers(): {[id: string]: string} {
    return this._headers;
  }
  private _headers: {[id: string]: string} =  {
    "Accept-Charset": "utf-8;q=0.7,*;q=0.3",
    "Accept-Language": "en-US,en;q=0.8",
    "Connection": "keep-alive",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
    "Accept-Encoding": "gzip,deflate",
  };

  get strategy(): RequestStrategy {
    return this._strategy;
  }

  private _strategy: RequestStrategy;
  constructor(strategy: RequestStrategy) {
    if (!strategy) {
      throw new Error("Strategy is needed!");
    }
    this._strategy = strategy;
  }


  request(uri: string|OptionsWithUrl, method?: string, params?: any) {
    let opts: OptionsWithUrl = {url: "", method, body: params};


    if (typeof uri === "string") {
      opts.url = uri;
    }
    else {
      opts = {...opts, ...uri};

      opts.headers = {...this.headers, ...opts.headers};
    }

    return this.strategy.request(opts)
      .catch((err: any) => {
        error("request %s\nerror: %o", opts.url, err);
        throw err;
      });
  }


  getBytes(opts: string|OptionsWithUrl): Promise<any[]> {
    return this.request(opts, "GET");
  }

  getHtml(opts: string|OptionsWithUrl): Promise<string> {
    return this.getBytes(opts)
      .then(x => x.toString());
  }

  getDoc(opts: OptionsWithUrl|string): Promise<MangaXDoc> {
    return this.getHtml(opts).then(x => parseDoc(x, {location: (<any>opts).url || opts }));
  }




  postBytes(opts: string|OptionsWithUrl, params?: any) {
    return this.request(opts, "POST", params);
  }

  postHtml(opts: string|OptionsWithUrl, params?: any): Promise<string> {
    return this.postBytes(opts, params)
      .then(x => x.toString());
  }

  postDoc(opts: string|OptionsWithUrl, params?: any) {
    return this.postHtml(opts, params)
      .then(x => parseDoc(x, {location: (<any>opts).url || opts }));
  }


}




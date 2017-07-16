/**
 * Created by pikax on 16/07/2017.
 */
import {CoreOptions} from "request";
import {RequestStrategy, strategies} from "./request/index";

// import {RequestRetryStrategy} from "./request/requestRetryStrategy";
// import {RequestRetryStrategy} from "./request/requestRetryStrategy";



export interface GinConfig {

  maxRetries?: number;
  timeout?: number;
  interval?: number;

  sites?: {[key: string]: RequestStrategy};

  request?: CoreOptions;
}

const DefaultConfig: GinConfig = {
  maxRetries: 50,
  timeout: 10000,
  interval: 1000,


  sites: {
    batoto: strategies.retry,
    mangafox: strategies.retry,
    mangapanda: strategies.retry,
    mangahere: strategies.retry,

    kissmanga: strategies.cloudFare,
  },

  request: {
    jar: true,
    gzip: true,
    followAllRedirects: true,
    forever: true,
    headers: {
      "Accept-Charset": "utf-8;q=0.7,*;q=0.3",
      "Accept-Language": "en-US,en;q=0.8",
      "Connection": "keep-alive",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
      "Accept-Encoding": "gzip,deflate",
    }
  }
};

export class Config {
  private _use: GinConfig;
  private _config: GinConfig;


  get defaultConfig() { return DefaultConfig; }

  get config(): GinConfig { return this._config || (this._config = this.buildConfig()); }


  get use(): GinConfig {
    return this._use;
  }
  set use(use: GinConfig) {
    this._use = use;

    this._config = this.buildConfig(use);
  }

  private buildConfig(conf: GinConfig= {}) {
    let c: GinConfig = { ...DefaultConfig,
      ...conf,
    };

    if (conf.request) {
      c.request = {
        ...DefaultConfig.request,
        ...conf.request
      };
    }

    if (conf.sites) {
      c.sites = {
        ...DefaultConfig.sites,
        ...conf.sites
      };
    }

    return c;
  }
}

export const ginConfig = new Config()
export default ginConfig;





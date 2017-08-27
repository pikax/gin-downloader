/**
 * Created by pikax on 16/07/2017.
 */
import {RequestStrategy, Options, CoreOptions, strategies} from "./request/index";

// import {RequestRetryStrategy} from "./request/requestRetryStrategy";
// import {RequestRetryStrategy} from "./request/requestRetryStrategy";



export interface GinPoolConfig {
  simultaneousRequests?: number;
  maxQueueSize?: number; // after hitting this size the queue will wait until promise level go as much as safeQueueSize
  safeQueueSize?: number; //

  requestInterval?: number;



  //TODO add history max number

  match: RegExp;
}


//
// export interface GinSiteConfig {
//   strategy: RequestStrategy;
// }

export interface GinConfig {
  maxRetries?: number;
  timeout?: number;
  interval?: number;

  disableHttps?: boolean; // NOTE not sure, probably move to other place

  pooling?: {[poolId: string]: GinPoolConfig};

  sites?: {[key: string]: RequestStrategy};

  request?: CoreOptions;
}


/*TODO this shouldn't be a function, this should be a const only, but the default config is called by the strategies
* that means when we load the strategies module, it needs to load this one first but this uses strategies.
* */
const DefaultConfig: GinConfig = {
  maxRetries: 50,
  timeout: 10000,
  interval: 1000,

  pooling: {
    MangafoxSearch: {
        requestInterval: 5000,
        match: /mangafox\.me\/search\.php/
    },


    // NOTE this should be always the last one!
    "*": {
      simultaneousRequests: 30,
      maxQueueSize: 300,
      safeQueueSize: 50,
      match: /.*/,
    }
  },

  disableHttps: true,


  sites: {
    batoto: strategies.retry,
    mangafox: strategies.retry,
    mangapanda: strategies.retry,
    mangahere: strategies.retry,
    kissmanga: strategies.cloudflare,
  },

  request: {
    jar: true,
    gzip: true,
    followAllRedirects: true,
    forever: true,
    proxy: process.env.proxy,
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
  set use(use: Partial<GinConfig>) {
    this._use = use;

    this._config = this.buildConfig(use);
  }

  reset() {
    this._config = this.defaultConfig;
    this._use = null;
  }

  private buildConfig(conf: GinConfig= {}) {
    let c: GinConfig = { ...this.defaultConfig,
      ...conf,
    };

    if (conf.request) {
      c.request = {
        ...this.defaultConfig.request,
        ...conf.request
      };
    }

    if (conf.sites) {
      c.sites = {
        ...this.defaultConfig.sites,
        ...conf.sites
      };
    }
    return c;
  }
}

export const ginConfig = new Config();
export default ginConfig;





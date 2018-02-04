import {RequestStrategy, CoreOptions, GinUrlOptions, Options, OptionsWithUrl, RequestRetryStrategy, RequestCloudFlareStrategy} from "./request/index";
import {reqConfig} from "./request/config";


export interface GinPoolConfig {
  simultaneousRequests?: number;
  maxQueueSize?: number; // after hitting this size the queue will wait until promise level go as much as safeQueueSize
  safeQueueSize?: number; //

  requestInterval?: number;


  // TODO add history max number
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

  pooling?: { [poolId: string]: GinPoolConfig };

  sites?: { [key: string]: RequestStrategy };

  request?: CoreOptions;
}

export interface IGinConfigFactory {
  config: GinConfig;
}


export class Config implements IGinConfigFactory {
  private _use: GinConfig;
  private _config: GinConfig;


  get defaultConfig() {
    return DefaultConfig;
  }

  get config(): GinConfig {
    return this._config || (this._config = this.buildConfig());
  }


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

  private buildConfig(conf: GinConfig = {}) {
    let c: GinConfig = {
      ...this.defaultConfig,
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


export const retryStrategy = new RequestRetryStrategy();
export const cloudflareStrategy = new RequestCloudFlareStrategy();

const DefaultConfig: GinConfig = {
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
    batoto: cloudflareStrategy,
    mangafox: retryStrategy,
    mangapanda: retryStrategy,
    MangaHere: retryStrategy,
    kissmanga: cloudflareStrategy,
  },

  ...reqConfig,
} as any;

export default ginConfig;





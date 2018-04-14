const o = {
  maxRetries: 50,
  timeout: 10000,
  interval: 1000,

  disableHttps: false,

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

export let reqConfig = o;

//todo fix types
export function overrideOpts(opts: any) {
  reqConfig.request = {...reqConfig.request, ...opts.request};


  if (opts.maxRetries) {
    reqConfig.maxRetries = opts.maxRetries;
  }
  if (opts.timeout) {
    reqConfig.timeout = opts.timeout;
  }
  if (opts.interval) {
    reqConfig.interval = opts.interval;
  }


  return reqConfig;
}








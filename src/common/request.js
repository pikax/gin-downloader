/**
 * Created by david on 12/03/2017.
 */


const debug = require('debug')('gin-downloader:request');
const verbose = require('debug')('gin-downloader:request:verbose');
const error = require('debug')('gin-downloader:error');


import url from 'url';

import Promise from 'bluebird';
function bluebirdFactory(resolver){
  return new Promise(resolver);
}
const requestRetry = require('requestretry').defaults({  promiseFactory:bluebirdFactory});


const MaxRetries = 50;
const Timeout = 20000;
const Interval = 30 + Timeout;

const Headers = {
  'Accept-Charset': 'utf-8;q=0.7,*;q=0.3',
  'Accept-Language': 'en-US,en;q=0.8',
  'Connection':'keep-alive',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
  'Accept-Encoding': 'gzip,deflate',
};


export const getHtml = (requestedPath, params = null) =>{
  return getBytes(requestedPath,params)
    .then(x =>
      x.toString()
    );
};


//TODO setup configs in configs file
export const getBytes = (requestedPath, params)=> {
  verbose('Request: %s : %o',requestedPath,params);
  const uri = url.parse(requestedPath);
  let p = uri.pathname;

  //fix the path
  let paths = p.split('/').map(encodeURIComponent);

  let requestedUrl = uri.format().replace(p,paths.join('/'));

  debug('Requesting url %s',requestedUrl);

  let request = {
    method: 'GET',
    uri: requestedUrl,
    qs: params,
    headers: Headers,
    gzip: true,
    encoding: null,
    timeout: Timeout,
    followAllRedirects: true,
    forever: true,

    //proxy: config.proxy, // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.

    // The below parameters are specific to request-retry
    maxAttempts: MaxRetries,   // (default) try N times
    retryDelay: Interval,  // (default) wait before trying again
    retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError, // (default) retry on 5xx or network errors
    fullResponse: false, // To resolve the promise with the full response or just the body
  };

  verbose('Request obj: %o',request);

  return requestRetry(request)
    .catch((err)=> {
      error('request %s\nerror: %o',requestedPath,err);
      throw err;
    });
};



export default {
  getBytes,
  getHtml
};
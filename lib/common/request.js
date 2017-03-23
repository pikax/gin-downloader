'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBytes = exports.getHtml = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by david on 12/03/2017.
 */

var debug = require('debug')('gin-downloader:request');
var verbose = require('debug')('gin-downloader:request:verbose');
var error = require('debug')('gin-downloader:error');

function bluebirdFactory(resolver) {
  return new _bluebird2.default(resolver);
}
var requestRetry = require('requestretry').defaults({ promiseFactory: bluebirdFactory });

var MaxRetries = 50;
var Timeout = 20000;
var Interval = 30 + Timeout;

var Headers = {
  'Accept-Charset': 'utf-8;q=0.7,*;q=0.3',
  'Accept-Language': 'en-US,en;q=0.8',
  'Connection': 'keep-alive',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
  'Accept-Encoding': 'gzip,deflate'
};

var getHtml = exports.getHtml = function getHtml(requestedPath) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return getBytes(requestedPath, params).then(function (x) {
    return x.toString();
  });
};

//TODO setup configs in configs file
var getBytes = exports.getBytes = function getBytes(requestedPath, params) {
  verbose('Request: %s : %o', requestedPath, params);
  var uri = _url2.default.parse(requestedPath);
  var p = uri.pathname;

  //fix the path
  var paths = p.split('/').map(encodeURIComponent);

  var requestedUrl = uri.format().replace(p, paths.join('/'));

  debug('Requesting url %s', requestedUrl);

  var request = {
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
    maxAttempts: MaxRetries, // (default) try N times
    retryDelay: Interval, // (default) wait before trying again
    retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError, // (default) retry on 5xx or network errors
    fullResponse: false };

  verbose('Request obj: %o', request);

  return requestRetry(request).catch(function (err) {
    error('request %s\nerror: %o', requestedPath, err);
    throw err;
  });
};

exports.default = {
  getBytes: getBytes,
  getHtml: getHtml
};
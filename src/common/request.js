/**
 * Created by david on 12/03/2017.
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require('debug')('gin-downloader:request');
const verbose = require('debug')('gin-downloader:request:verbose');
const error = require('debug')('gin-downloader:error');
require("./declarations");
const url = require("url");
const Promise2 = require("bluebird");
function bluebirdFactory(resolver) {
    return new Promise2(resolver);
}
const requestRetry = require('requestretry').defaults({ promiseFactory: bluebirdFactory });
const MaxRetries = 50;
const Timeout = 20000;
const Interval = 30 + Timeout;
const Headers = {
    'Accept-Charset': 'utf-8;q=0.7,*;q=0.3',
    'Accept-Language': 'en-US,en;q=0.8',
    'Connection': 'keep-alive',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
    'Accept-Encoding': 'gzip,deflate',
};
exports.getHtml = (requestedPath, params = null) => __awaiter(this, void 0, void 0, function* () {
    let bytes = yield exports.getBytes(requestedPath, params);
    return bytes.toString();
});
//TODO setup configs in configs file
//TODO check this code, I dont remember this
exports.getBytes = (requestedPath, params) => {
    verbose('Request: %s : %o', requestedPath, params);
    const uri = url.parse(requestedPath);
    let p = uri.pathname;
    //fix the path
    let paths = p.split('/').map(encodeURIComponent);
    let requestedUrl = url.format(uri).replace(p, paths.join('/'));
    debug('Requesting url %s', requestedUrl);
    let request = {
        method: 'GET',
        uri: requestedUrl,
        qs: params,
        headers: Headers,
        gzip: true,
        encoding: '',
        timeout: Timeout,
        followAllRedirects: true,
        forever: true,
        //proxy: config.proxy, // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.
        // The below parameters are specific to request-retry
        maxAttempts: MaxRetries,
        retryDelay: Interval,
        retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError,
        fullResponse: false,
    };
    verbose('Request obj: %o', request);
    return requestRetry(request)
        .catch((err) => {
        error('request %s\nerror: %o', requestedPath, err);
        throw err;
    });
};
exports.default = {
    getBytes: exports.getBytes,
    getHtml: exports.getHtml
};
//# sourceMappingURL=request.js.map
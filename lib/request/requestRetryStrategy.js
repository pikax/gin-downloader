"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by pikax on 23/05/2017.
 */
var requestRetry = require("requestretry");
var MaxRetries = 50;
var Timeout = 20000;
var Interval = 30 + Timeout;
var DefaultOptions = {
    method: "GET",
    gzip: true,
    encoding: "",
    timeout: Timeout,
    followAllRedirects: true,
    jar: true,
    forever: true,
    // proxy: config.proxy, // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.
    // The below parameters are specific to request-retry
    maxAttempts: MaxRetries,
    retryDelay: Interval,
    retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError,
    fullResponse: false,
};
var RequestRetryStrategy = (function () {
    function RequestRetryStrategy() {
    }
    RequestRetryStrategy.prototype.request = function (options) {
        var opts = __assign({}, DefaultOptions);
        if (typeof options === "string") {
            opts.url = options;
        }
        else {
            opts = __assign({}, opts, options);
        }
        return requestRetry(opts);
    };
    return RequestRetryStrategy;
}());
exports.RequestRetryStrategy = RequestRetryStrategy;
exports.strategy = new RequestRetryStrategy();
exports.default = exports.strategy;
//# sourceMappingURL=requestRetryStrategy.js.map
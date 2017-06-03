"use strict";
/**
 * Created by pikax on 23/05/2017.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cloudscraper = require("cloudscraper");
// const Timeout = 20000;
var DefaultOptions = {
    method: "GET",
    jar: true,
    gzip: true,
    encoding: "",
    // timeout: Timeout,
    followAllRedirects: true,
    forever: true,
};
var RequestCloudFareStrategy = (function () {
    function RequestCloudFareStrategy() {
    }
    RequestCloudFareStrategy.prototype.request = function (options) {
        var opts = __assign({}, DefaultOptions);
        if (typeof options === "string") {
            opts.url = options;
        }
        else {
            opts = __assign({}, opts, options);
        }
        return new Promise(function (res, rej) {
            var callback = function (err, response, body) {
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
    };
    return RequestCloudFareStrategy;
}());
exports.RequestCloudFareStrategy = RequestCloudFareStrategy;
exports.strategy = new RequestCloudFareStrategy();
exports.default = exports.strategy;
//# sourceMappingURL=requestCloudFareStrategy.js.map
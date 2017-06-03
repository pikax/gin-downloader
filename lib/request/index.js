/**
 * Created by pikax on 23/05/2017.
 */
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
var helper_1 = require("../common/helper");
var debug = require("debug")("gin-downloader:request");
var verbose = require("debug")("gin-downloader:request:verbose");
var error = require("debug")("gin-downloader:error");
var GinRequest = (function () {
    function GinRequest(strategy) {
        this._headers = {
            "Accept-Charset": "utf-8;q=0.7,*;q=0.3",
            "Accept-Language": "en-US,en;q=0.8",
            "Connection": "keep-alive",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
            "Accept-Encoding": "gzip,deflate",
        };
        if (!strategy) {
            throw new Error("Strategy is needed!");
        }
        this._strategy = strategy;
    }
    Object.defineProperty(GinRequest.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GinRequest.prototype, "strategy", {
        get: function () {
            return this._strategy;
        },
        enumerable: true,
        configurable: true
    });
    GinRequest.prototype.request = function (uri, method, params) {
        var opts = { url: "" };
        if (typeof uri === "string") {
            opts.url = uri;
        }
        else {
            opts = __assign({}, opts, uri);
            opts.headers = __assign({}, this.headers, opts.headers);
        }
        if (method) {
            opts.method = method;
        }
        if (params) {
            opts.body = params;
        }
        return this.strategy.request(opts)
            .catch(function (err) {
            error("request %s\nerror: %o", opts.url, err);
            throw err;
        });
    };
    GinRequest.prototype.getBytes = function (opts) {
        return this.request(opts, "GET");
    };
    GinRequest.prototype.getHtml = function (opts) {
        return this.getBytes(opts)
            .then(function (x) { return x.toString(); });
    };
    GinRequest.prototype.getDoc = function (opts) {
        return this.getHtml(opts).then(function (x) { return helper_1.parseDoc(x, { location: opts.url || opts }); });
    };
    GinRequest.prototype.postBytes = function (opts, params) {
        return this.request(opts, "POST", params);
    };
    GinRequest.prototype.postHtml = function (opts, params) {
        return this.postBytes(opts, params)
            .then(function (x) { return x.toString(); });
    };
    GinRequest.prototype.postDoc = function (opts, params) {
        return this.postHtml(opts, params)
            .then(function (x) { return helper_1.parseDoc(x, { location: opts.url || opts }); });
    };
    return GinRequest;
}());
exports.GinRequest = GinRequest;
//# sourceMappingURL=index.js.map
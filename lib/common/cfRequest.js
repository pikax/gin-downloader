"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var debug = require("debug")("gin-downloader:request");
var verbose = require("debug")("gin-downloader:request:verbose");
var error = require("debug")("gin-downloader:error");
var cloudscraper = require("cloudscraper");
var Headers = {
    "Accept-Charset": "utf-8;q=0.7,*;q=0.3",
    "Accept-Language": "en-US,en;q=0.8",
    "Connection": "keep-alive",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
    "Accept-Encoding": "gzip,deflate",
};
exports.getHtml = function (requestedPath, params) { return __awaiter(_this, void 0, void 0, function () {
    var bytes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getBytes(requestedPath, params)];
            case 1:
                bytes = _a.sent();
                return [2 /*return*/, bytes.toString()];
        }
    });
}); };
exports.getBytes = function (requestedPath, params) {
    var request = {
        method: "GET",
        url: requestedPath,
        qs: params,
        headers: Headers,
        gzip: true,
        encoding: "",
        followAllRedirects: true,
        forever: true
        // proxy: config.proxy, // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.
    };
    return new Promise(function (res, rej) {
        cloudscraper.request(request, function (err, response, body) {
            if (err) {
                return rej(err);
            }
            return res(body);
        });
    });
};
exports.getDoc = function (requestedPath) {
    return exports.getHtml(requestedPath).then(function (x) { return helper_1.parseDoc(x, { location: requestedPath }); });
};
exports.request = {
    getBytes: exports.getBytes,
    getHtml: exports.getHtml,
    getDoc: exports.getDoc
};
exports.default = exports.request;
//# sourceMappingURL=cfRequest.js.map
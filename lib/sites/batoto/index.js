"use strict";
/**
 * Created by david on 24/03/2017.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var mangasite_1 = require("../../common/mangasite");
var parser_1 = require("./parser");
var config_1 = require("./config");
var names_1 = require("./names");
var declarations_1 = require("../../declarations");
var filter_1 = require("./filter");
var requestRetryStrategy_1 = require("../../request/requestRetryStrategy");
var Batoto = (function (_super) {
    __extends(Batoto, _super);
    function Batoto() {
        var _this = _super.call(this, config_1.config, new parser_1.Parser(), new names_1.Helper(), requestRetryStrategy_1.strategy) || this;
        _this._urlCache = {}; // provide a cache for resolved urls
        return _this;
    }
    Batoto.prototype.resolveMangaUrl = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, filterResults, page, results, result, _i, results_1, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._urlCache[name]) {
                            return [2 /*return*/, this._urlCache[name]];
                        }
                        filter = { search: { name: { name: name, condition: declarations_1.FilterCondition.EndsWith } } };
                        _a.label = 1;
                    case 1:
                        page = 0;
                        if (filterResults) {
                            page = filterResults.page + 1;
                        }
                        filter.page = page;
                        return [4 /*yield*/, this.filter(filter)];
                    case 2:
                        filterResults = _a.sent();
                        results = filterResults.results;
                        result = void 0;
                        for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                            obj = results_1[_i];
                            if (obj.name === name) {
                                result = obj.src;
                            }
                            this._urlCache[obj.name] = obj.src; // add to cache
                        }
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        _a.label = 3;
                    case 3:
                        if (filterResults.page < filterResults.total && filterResults.results.length > 0) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4: return [2 /*return*/, ""];
                }
            });
        });
    };
    Batoto.prototype.mangas = function (filter) {
        return this.filter(filter).then(function (x) { return x.results; });
    };
    Batoto.prototype.filter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var search, doc, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("filter mangas with: %o", filter);
                        search = filter_1.processFilter(filter);
                        return [4 /*yield*/, this.request.getDoc(search.src)];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, this.parser.filter(doc)];
                    case 2:
                        mangas = _a.sent();
                        this.debug("mangas: " + mangas.results.length);
                        return [2 /*return*/, mangas];
                }
            });
        });
    };
    Batoto.prototype.resolveChapterSource = function (name, chapter) {
        return __awaiter(this, void 0, void 0, function () {
            var src;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.resolveChapterSource.call(this, name, chapter)];
                    case 1:
                        src = _a.sent();
                        if (!src) {
                            return [2 /*return*/, src];
                        }
                        return [2 /*return*/, parser_1.Parser.convertChapterReaderUrl(src)];
                }
            });
        });
    };
    Batoto.prototype.buildChapterRequest = function (url) {
        var opts = _super.prototype.buildRequest.call(this, url);
        opts.headers = __assign({}, opts.headers, { Referer: "http://bato.to/reader" });
        return opts;
    };
    // buildLoginRequest(url: )
    Batoto.prototype.isLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, match;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request.getHtml("http://bato.to/search")];
                    case 1:
                        html = _a.sent();
                        match = html.match(/>Sign Out<\/a\>/m);
                        return [2 /*return*/, !!match];
                }
            });
        });
    };
    Batoto.prototype.logIn = function (user, pw, rememberMe) {
        if (rememberMe === void 0) { rememberMe = true; }
        return __awaiter(this, void 0, void 0, function () {
            var url, request, $, authKey, body, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://bato.to/forums/index.php?app=core&module=global&section=login&do=process";
                        request = this.buildRequest(url);
                        return [4 /*yield*/, this.request.getDoc(request)];
                    case 1:
                        $ = _a.sent();
                        authKey = $("#login > input[name='auth_key']").attr("value");
                        body = {
                            ips_username: user,
                            ips_password: pw,
                            referer: "https://bato.to/forums",
                            rememberMe: rememberMe ? 1 : 0,
                            auth_key: authKey,
                        };
                        request = __assign({}, request, { formData: body });
                        return [4 /*yield*/, this.request.postHtml(request)];
                    case 2:
                        html = _a.sent();
                        return [2 /*return*/, !!html.match(/<strong>You are now signed in<\/strong>/m)];
                }
            });
        });
    };
    return Batoto;
}(mangasite_1.MangaSite));
exports.Batoto = Batoto;
exports.manga = new Batoto();
exports.default = exports.manga;
//# sourceMappingURL=index.js.map
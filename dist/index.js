'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('lodash');
var cheerio = require('cheerio');
var url = require('url');

(function (gin) {
    var SITES;
    (function (SITES) {
        SITES["MANGAHERE"] = "MangaHere";
    })(SITES = gin.SITES || (gin.SITES = {}));
})(exports.gin || (exports.gin = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};









function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var o = {
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
var reqConfig = o;
//todo fix types

var cloudscraper = require("cloudscraper");
// specific options for cloudscraper lib
var DefaultOptions = {
    // none
    method: "GET"
};
// let _config: IGinConfigFactory;
// const getConfig = async () => {
//   if (!_config) {
//     // _config = require("../config").ginConfig;
//     _config = await import("../config").then(x => x.ginConfig);
//   }
//   return _config.config;
// };
var RequestCloudFlareStrategy = /** @class */ (function () {
    function RequestCloudFlareStrategy() {
    }
    RequestCloudFlareStrategy.prototype.request = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var opts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = __assign({}, DefaultOptions, reqConfig.request);
                        if (typeof options === "string") {
                            opts.url = options;
                        }
                        else {
                            opts = __assign({}, opts, options);
                        }
                        return [4 /*yield*/, new Promise(function (res, rej) {
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
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RequestCloudFlareStrategy;
}());

//
// export const strategy = new RequestCloudFlareStrategy();
// export default strategy;

var requestRetry = require("requestretry");
// specific options for requestretry lib
var DefaultOptions$1 = {
    retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError,
    fullResponse: false,
};
// let _config: IGinConfigFactory;
// const getConfig = async () => {
//   if (!_config) {
//     // _config = require("../config").ginConfig;
//     _config = await import("../config").then(x => x.ginConfig);
//   }
//   return _config.config;
// };
var RequestRetryStrategy = /** @class */ (function () {
    function RequestRetryStrategy() {
    }
    RequestRetryStrategy.prototype.request = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var config, opts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = reqConfig;
                        opts = __assign({}, DefaultOptions$1, config.request, lodash.pick(config, "maxRetries", "timeout", "interval"));
                        if (typeof options === "string") {
                            opts.url = options;
                        }
                        else {
                            opts = __assign({}, opts, options);
                        }
                        // TODO find a better place for this
                        if (config.disableHttps) {
                            opts.url = opts.url.toString().replace("https", "http");
                        }
                        return [4 /*yield*/, requestRetry(opts)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RequestRetryStrategy;
}());

//
// export const strategy = new RequestRetryStrategy();
// export default strategy;

var Config = /** @class */ (function () {
    function Config() {
    }
    Object.defineProperty(Config.prototype, "defaultConfig", {
        get: function () {
            return DefaultConfig;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "config", {
        get: function () {
            return this._config || (this._config = this.buildConfig());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "use", {
        get: function () {
            return this._use;
        },
        set: function (use) {
            this._use = use;
            this._config = this.buildConfig(use);
        },
        enumerable: true,
        configurable: true
    });
    Config.prototype.reset = function () {
        this._config = this.defaultConfig;
        this._use = null;
    };
    Config.prototype.buildConfig = function (conf) {
        if (conf === void 0) { conf = {}; }
        var c = __assign({}, this.defaultConfig, conf);
        if (conf.request) {
            c.request = __assign({}, this.defaultConfig.request, conf.request);
        }
        if (conf.sites) {
            c.sites = __assign({}, this.defaultConfig.sites, conf.sites);
        }
        return c;
    };
    return Config;
}());
var ginConfig = new Config();
var retryStrategy = new RequestRetryStrategy();
var cloudflareStrategy = new RequestCloudFlareStrategy();
var DefaultConfig = __assign({ pooling: {
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
    }, disableHttps: true, sites: {
        batoto: cloudflareStrategy,
        mangafox: retryStrategy,
        mangapanda: retryStrategy,
        MangaHere: retryStrategy,
        kissmanga: cloudflareStrategy,
    } }, reqConfig);

(function (Genre) {
    Genre["Action"] = "Action";
    Genre["Adult"] = "Adult";
    Genre["Adventure"] = "Adventure";
    Genre["AwardWinning"] = "Award Winning";
    Genre["Comedy"] = "Comedy";
    Genre["Comic"] = "Comic";
    Genre["Cooking"] = "Cooking";
    Genre["Demons"] = "Demons";
    Genre["Doujinshi"] = "Doujinshi";
    Genre["Drama"] = "Drama";
    Genre["Ecchi"] = "Ecchi";
    Genre["Fantasy"] = "Fantasy";
    Genre["FourKoma"] = "4-Koma";
    Genre["GenderBender"] = "Gender Bender";
    Genre["Harem"] = "Harem";
    Genre["Historical"] = "Historical";
    Genre["Horror"] = "Horror";
    Genre["Josei"] = "Josei";
    Genre["Lolicon"] = "Lolicon";
    Genre["Magic"] = "Magic";
    Genre["Manga"] = "Manga";
    Genre["Manhua"] = "Manhua";
    Genre["Manhwa"] = "Manhwa";
    Genre["MartialArts"] = "Martial Arts";
    Genre["Mature"] = "Mature";
    Genre["Mecha"] = "Mecha";
    Genre["Medical"] = "Medical";
    Genre["Military"] = "Military";
    Genre["Music"] = "Music";
    Genre["Mystery"] = "Mystery";
    Genre["Oneshot"] = "Oneshot";
    Genre["Psychological"] = "Psychological";
    Genre["Romance"] = "Romance";
    Genre["SchoolLife"] = "School Life";
    Genre["SciFi"] = "Sci-fi";
    Genre["Seinen"] = "Seinen";
    Genre["Shotacon"] = "Shotacon";
    Genre["Shoujo"] = "Shoujo";
    Genre["ShoujoAi"] = "Shoujo Ai";
    Genre["Shounen"] = "Shounen";
    Genre["ShounenAi"] = "Shounen Ai";
    Genre["SliceOfLife"] = "Slice of Life";
    Genre["Smut"] = "Smut";
    Genre["Sports"] = "Sports";
    Genre["Supernatural"] = "Supernatural";
    Genre["SuperPower"] = "SuperPower";
    Genre["Tragedy"] = "Tragedy";
    Genre["Vampire"] = "Vampire";
    Genre["Webtoon"] = "Webtoon";
    Genre["Yaoi"] = "Yaoi";
    Genre["Yuri"] = "Yuri";
    Genre["NoChapters"] = "[no chapters]";
})(exports.Genre || (exports.Genre = {}));

(function (Type) {
    Type["Manga"] = "Manga";
    Type["Manhwa"] = "Manhwa";
    Type["Manhua"] = "Manhua";
    Type["Comic"] = "Comic";
    Type["Artbook"] = "Artbook";
    Type["Other"] = "Other";
})(exports.Type || (exports.Type = {}));

(function (GenreCondition) {
    GenreCondition[GenreCondition["And"] = 0] = "And";
    GenreCondition[GenreCondition["Or"] = 1] = "Or";
})(exports.GenreCondition || (exports.GenreCondition = {}));

(function (FilterStatus) {
    FilterStatus["Ongoing"] = "Ongoing";
    FilterStatus["Complete"] = "Complete";
    FilterStatus["Cancelled"] = "Cancelled";
})(exports.FilterStatus || (exports.FilterStatus = {}));

(function (FilterCondition) {
    FilterCondition[FilterCondition["Equal"] = 0] = "Equal";
    FilterCondition[FilterCondition["Contains"] = 1] = "Contains";
    FilterCondition[FilterCondition["NotContains"] = 2] = "NotContains";
    FilterCondition[FilterCondition["StartsWith"] = 3] = "StartsWith";
    FilterCondition[FilterCondition["EndsWith"] = 4] = "EndsWith";
    FilterCondition[FilterCondition["Less"] = 5] = "Less";
    FilterCondition[FilterCondition["Greater"] = 6] = "Greater";
    FilterCondition[FilterCondition["LessThan"] = 7] = "LessThan";
    FilterCondition[FilterCondition["GreaterThan"] = 8] = "GreaterThan";
})(exports.FilterCondition || (exports.FilterCondition = {}));

var regexLastDigit = /\d+(\.\d{1,3})?$/;
var regexFirstDigit = /\d+(\.\d{1,3})?/;
String.prototype.lastDigit = function () {
    var match = this.match(regexLastDigit);
    if (!match) {
        return null;
    }
    return +match[0];
};
String.prototype.firstDigit = function () {
    var match = this.match(regexFirstDigit);
    if (!match) {
        return null;
    }
    return +match[0];
};
String.prototype.leftTrim = function () {
    return this.replace(/^\s+/, "");
};
String.prototype.decodeEscapeSequence = function () {
    return this.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
        return String.fromCharCode(parseInt(arguments[1], 16));
    });
};
function promiseSetTimeout(ms) {
    return new Promise((function (resolve) { return setTimeout(resolve, ms); }));
}

var Lazy = /** @class */ (function () {
    function Lazy(_func) {
        this._func = _func;
    }
    Object.defineProperty(Lazy.prototype, "value", {
        get: function () {
            return this._value || (this._value = this._func());
        },
        enumerable: true,
        configurable: true
    });
    return Lazy;
}());
var parseDoc = function (source, params) {
    if (params === void 0) { params = undefined; }
    var doc = cheerio.load(source);
    doc.location = params && params.location;
    return doc;
};
var sanitize = function (children) { return children.filter(function (x) { return x.type !== "text"; }); };

var procFilter = function (condition, def) {
    var search = (def && def.search) || {};
    if (typeof condition === "string") {
        search.name = {
            name: condition
        };
        return { search: search };
    }
    else {
        var nc = (condition && condition.name && { name: condition.name }) || undefined;
        var ns = (condition && condition.search) || undefined;
        search = __assign({ name: nc }, search, ns);
        if (search) {
            var genre = search.genre, name = search.name, author = search.author, artist = search.artist, released = search.released, rating = search.rating;
            if (Array.isArray(genre)) {
                var inGenres = genre;
                search.genre = {
                    inGenres: inGenres,
                    condition: exports.GenreCondition.And,
                };
            }
            if (typeof name === "string") {
                search.name = {
                    name: name
                };
            }
            if (typeof author === "string") {
                search.author = {
                    name: author
                };
            }
            if (typeof artist === "string") {
                search.artist = {
                    name: artist
                };
            }
            if (typeof released === "number") {
                search.released = {
                    value: released
                };
            }
            if (typeof rating === "number") {
                search.rating = {
                    from: rating
                };
            }
        }
    }
    //
    // if (filter.name) {
    //   filter.name = sanitizeName(filter.name);
    // }
    // if (filter.search && filter.search.name) {
    //   const name = filter.search.name;
    //
    //   if (typeof name !== "string") {
    //     name.name = sanitizeName(name.name);
    //   }
    // }
    return __assign({}, condition, { search: search });
};
/*NOTE not sure*/




/*ending*/

var Queue = require("promise-queue");
var TICK = 33;
var pools;
function request(uri, strategy) {
    var pool;
    if (!ginConfig.config.pooling || !(pool = getPool(uri))) {
        return strategy.request(uri);
    }
    return pool.queue.queue(uri, strategy);
}
function getPool(uri) {
    pools = pools || buildPool();
    var url$$1 = isOptionsWithUrl(uri)
        ? uri.url.toString()
        : uri;
    return pools.find(function (x) { return !!url$$1.match(x.match); });
}
function isOptionsWithUrl(uri) {
    return uri.url !== undefined;
}

function buildPool() {
    var pooling = ginConfig.config.pooling;
    var pools = [];
    for (var p in pooling) {
        var pool = pooling[p];
        var queue = void 0;
        if (pool.requestInterval) {
            queue = new IntervalPool(pool);
        }
        else {
            if (pool.simultaneousRequests) {
                queue = new ConcurrentQueue(pool);
            }
            else {
                throw new Error("unknown pool type");
            }
        }
        pools.push(__assign({}, pool, { queue: queue }));
    }
    return pools;
}
//
// export class IntervalPool implements QueuePool {
//   private _currId: number = 0;
//
//   private _active: ActivePool;
//   // private _history: {[id: string]: HistoryPool} = {};
//   private _history = new Map<number, HistoryPool>();
//
//   get history(): HistoryPool[] {
//     return Array.from(this._history.values());
//   } // copy list
//
//
//   get isActive(): boolean {
//     return !!this._active;
//   }
//
//
//   private set active(value: ActivePool) {
//     // const h = this._history[this._active.id];
//     // h.resolved = true;
//     this._active = value;
//   }
//
//
//   constructor(private _config: GinPoolConfig) {
//   }
//
//
//   queue(uri: GinUrlOptions, strategy: RequestStrategy): Promise<any> {
//     let id = this.getNextId();
//     const last = this._history.get(id - 1);
//     const history: HistoryPool = {
//       id,
//       uri,
//       isActive: true,
//       created: new Date(),
//     };
//     this._history.set(id, history);
//
//     let lazy = new Lazy(async () => {
//       try {
//         history.started = new Date();
//         return await strategy.request(uri);
//       }
//       finally {
//         history.resolved = new Date();
//       }
//     });
//
//     if (last) {
//       lazy = history.item = this.waitForLast(last, lazy);
//     }
//
//     return this.execItem(id, lazy);
//   }
//
//   private async execItem(id: number, lazy: Lazy<Promise<any>>) {
//     const h = this._history.get(id);
//
//     try {
//       this.active = {
//         id,
//         uri: h.uri,
//         isActive: true,
//       };
//       h.item = lazy;
//       return await lazy.value.catch(x => {
//         throw h.error = x;
//       });
//     }
//     finally {
//       h.failed = true;
//       h.isActive = false;
//       this.active = null;
//     }
//   }
//
//   private waitForLast(last: HistoryPool, lazy: Lazy<Promise<any>>): Lazy<Promise<any>> {
//     const {requestInterval} = this._config;
//     return new Lazy(async () => {
//       while (last.isActive) {
//         await last.item.value // just wait until the last finish or fails, if it fails we should ignore the exception
//           .catch((e) => e);
//       }
//       const dt = last.resolved;
//       const passedTime = Date.now() - dt.getTime();
//
//       const missing = requestInterval - passedTime;
//
//       if (missing > 0) {
//         await promiseSetTimeout(missing);
//       }
//       return await lazy.value;
//     });
//   }
//
//   private getNextId() {
//     return this._currId++;
//   }
// }
var ConcurrentQueue = /** @class */ (function () {
    function ConcurrentQueue(_config) {
        this._config = _config;
        this._currId = 0;
        this._history = new Map();
        this._queue = new Queue(_config.simultaneousRequests);
    }
    Object.defineProperty(ConcurrentQueue.prototype, "history", {
        get: function () {
            return Array.from(this._history.values());
        } // copy list
        ,
        enumerable: true,
        configurable: true
    });
    ConcurrentQueue.prototype.queue = function (uri, strategy) {
        return __awaiter(this, void 0, void 0, function () {
            var lazy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._queue.getQueueLength() > this._config.maxQueueSize)) return [3 /*break*/, 3];
                        _a.label = 1;
                    case 1:
                        if (!(this._queue.getQueueLength() < this._config.safeQueueSize)) return [3 /*break*/, 3];
                        return [4 /*yield*/, promiseSetTimeout(TICK)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        lazy = new Lazy(function () { return strategy.request(uri); });
                        return [2 /*return*/, this._queue.add(function () { return lazy.value; })];
                }
            });
        });
    };
    // async exec(lazy: Lazy<Promise<any>>, history: HistoryPool) {
    //   try {
    //     history.item = lazy;
    //     return await lazy.value.catch(x => {
    //       throw history.error = x;
    //     });
    //   }
    //   finally {
    //     history.failed = true;
    //     history.isActive = false;
    //   }
    // }
    ConcurrentQueue.prototype.getNextId = function () {
        return this._currId++;
    };
    return ConcurrentQueue;
}());
var IntervalLazy = /** @class */ (function (_super) {
    __extends(IntervalLazy, _super);
    // appendNew(func : ()=>T){
    //   return new IntervalLazy(async ()=>{
    //
    //     while(thi)
    //     if(!this.started){
    //
    //     }
    //
    //
    //
    //
    //
    //   });
    // }
    function IntervalLazy(_func, _requestInterval) {
        var _this = _super.call(this, function () {
            _this.started = new Date();
            try {
                var result = _func();
                if (result instanceof Promise) {
                    result.then(function (x) {
                        _this.resolved = new Date();
                        return x;
                    }).catch(function (x) {
                        _this.resolved = new Date();
                        _this.error = x;
                        _this.failed = true;
                    });
                }
                else {
                    _this.resolved = new Date();
                }
                return result;
            }
            catch (e) {
                _this.resolved = new Date();
                _this.error = e;
                _this.failed = true;
            }
        }) || this;
        _this._requestInterval = _requestInterval;
        _this.created = new Date();
        return _this;
    }
    IntervalLazy.prototype.append = function (lazy) {
        return __awaiter(this, void 0, void 0, function () {
            var pValue, w_1, w;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pValue = null;
                        _a.label = 1;
                    case 1:
                        if (!!this.resolved) return [3 /*break*/, 6];
                        w_1 = (this.created.getMilliseconds() + this._requestInterval) - Date.now();
                        if (!(w_1 > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, promiseSetTimeout(w_1)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        pValue = this.value;
                        return [4 /*yield*/, pValue];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 1];
                    case 6:
                        w = (this.resolved.getMilliseconds() + this._requestInterval) - Date.now();
                        if (!(w > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, promiseSetTimeout(w)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return IntervalLazy;
}(Lazy));
var IntervalPool = /** @class */ (function () {
    // history: HistoryPool[]; //TODO remove
    function IntervalPool(_config) {
        this._config = _config;
    }
    IntervalPool.prototype.queue = function (uri, strategy) {
        return __awaiter(this, void 0, void 0, function () {
            var prev, current, w, p, e_1, w2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prev = this.currentLazy;
                        current = new IntervalLazy(function () { return strategy.request(uri); }, this._config.requestInterval);
                        this.currentLazy = current;
                        if (!prev) return [3 /*break*/, 10];
                        w = (prev.created.getTime() + this._config.requestInterval) - Date.now();
                        if (!(w > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, promiseSetTimeout(w)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!!prev.started) return [3 /*break*/, 4];
                        return [4 /*yield*/, promiseSetTimeout(TICK)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        p = prev.value;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, p];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        w2 = (prev.resolved.getTime() + this._config.requestInterval) - Date.now();
                        if (!(w2 > 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, promiseSetTimeout(w2)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, current.value];
                    case 11: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return IntervalPool;
}());

var debug = require("debug");
var MangaSite = /** @class */ (function () {
    function MangaSite(sitename, config, parser, nameHelper) {
        this.sitename = sitename;
        this.debug = debug("gin-downloader:" + config.name);
        this.verbose = debug("gin-downloader:" + config.name + ":verbose");
        this.error = debug("gin-downloader:" + config.name + ":error");
        this._config = config;
        this._nameHelper = nameHelper;
        this._parser = parser;
    }
    Object.defineProperty(MangaSite.prototype, "parser", {
        get: function () {
            return this._parser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaSite.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaSite.prototype, "nameHelper", {
        get: function () {
            return this._nameHelper;
        },
        enumerable: true,
        configurable: true
    });
    MangaSite.prototype.mangas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opts, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("getting mangas");
                        opts = this.buildMangasRequest(this.config.mangas_url);
                        return [4 /*yield*/, this.getDoc(opts)
                                .then(this.parser.mangas)];
                    case 1:
                        mangas = _a.sent();
                        this.debug("mangas: " + mangas.length);
                        return [2 /*return*/, mangas];
                }
            });
        });
    };
    MangaSite.prototype.filter = function (filter) {
        throw new Error("Method not implemented.");
    };
    MangaSite.prototype.latest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var opts, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("getting latest");
                        opts = this.buildLatestRequest(this.config.latest_url);
                        return [4 /*yield*/, this.getDoc(opts).then(this.parser.latest)];
                    case 1:
                        mangas = _a.sent();
                        this.verbose("got " + mangas.length + " chapters");
                        return [2 /*return*/, mangas];
                }
            });
        });
    };
    MangaSite.prototype.info = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var src, opts, info, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            throw new Error("Please provide a name");
                        }
                        this.debug("getting info for " + name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.resolveMangaUrl(name)];
                    case 2:
                        src = _a.sent();
                        opts = this.buildInfoRequest(src);
                        return [4 /*yield*/, this.getDoc(opts).then(this.parser.info)];
                    case 3:
                        info = _a.sent();
                        this.verbose("info:%o", info);
                        this.debug("got info for " + name);
                        return [2 /*return*/, info];
                    case 4:
                        e_1 = _a.sent();
                        this.error("%o", e_1);
                        throw new Error(name + " not found!");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.chapters = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var src, opts, chapters, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            throw new Error("Please provide a name");
                        }
                        this.debug("getting chapters for " + name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.resolveMangaUrl(name)];
                    case 2:
                        src = _a.sent();
                        opts = this.buildInfoRequest(src);
                        return [4 /*yield*/, this.getDoc(opts).then(this.parser.chapters)];
                    case 3:
                        chapters = _a.sent();
                        this.verbose("chapters:%o", chapters);
                        this.debug("got chapters for " + name);
                        return [2 /*return*/, chapters];
                    case 4:
                        e_2 = _a.sent();
                        this.error("%o", e_2);
                        throw new Error(name + " not found!");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.infoChapters = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var src, opts, doc, info, chapters, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            throw new Error("Please provide a name");
                        }
                        this.debug("getting info & chapters for " + name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.resolveMangaUrl(name)];
                    case 2:
                        src = _a.sent();
                        opts = this.buildInfoRequest(src);
                        return [4 /*yield*/, this.getDoc(opts)];
                    case 3:
                        doc = _a.sent();
                        return [4 /*yield*/, this.parser.info(doc)];
                    case 4:
                        info = _a.sent();
                        return [4 /*yield*/, this.parser.chapters(doc)];
                    case 5:
                        chapters = _a.sent();
                        this.verbose("info:%o\nchapters:%o", chapters);
                        this.debug("got info & chapters for " + name);
                        return [2 /*return*/, __assign({}, info, { chapters: chapters })];
                    case 6:
                        e_3 = _a.sent();
                        this.error("%o", e_3);
                        throw new Error(name + " not found!");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.infoChaptersByUrl = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, doc, info, chapters, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("getting info & chapters for " + src);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        opts = this.buildInfoRequest(src);
                        return [4 /*yield*/, this.getDoc(opts)];
                    case 2:
                        doc = _a.sent();
                        return [4 /*yield*/, this.parser.info(doc)];
                    case 3:
                        info = _a.sent();
                        return [4 /*yield*/, this.parser.chapters(doc)];
                    case 4:
                        chapters = _a.sent();
                        this.verbose("info:%o\nchapters:%o", chapters);
                        this.debug("got info & chapters for " + src);
                        return [2 /*return*/, __assign({}, info, { chapters: chapters })];
                    case 5:
                        e_4 = _a.sent();
                        this.error("%o", e_4);
                        throw new Error(src + " not found!");
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.images = function (name, chapter) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chap, opts, paths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            throw new Error("Please provide a name");
                        }
                        if (!chapter) {
                            throw new Error("Please provide a chapter");
                        }
                        this.debug("getting images for %s : %s", name, chapter);
                        return [4 /*yield*/, this.resolveChapterSource(name, chapter)];
                    case 1:
                        chap = _a.sent();
                        opts = this.buildChapterRequest(chap);
                        return [4 /*yield*/, this.getDoc(opts).then(this.parser.imagesPaths)];
                    case 2:
                        paths = _a.sent();
                        return [2 /*return*/, paths.map(function (x) { return _this.processImagePath(_this.buildImagePathsRequest(x)); })];
                }
            });
        });
    };
    MangaSite.prototype.imagesByUrl = function (url$$1) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var opts, paths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = this.buildChapterRequest(url$$1);
                        return [4 /*yield*/, this.getDoc(opts).then(this.parser.imagesPaths)];
                    case 1:
                        paths = _a.sent();
                        return [2 /*return*/, paths.map(function (x) { return _this.processImagePath(_this.buildImagePathsRequest(x)); })];
                }
            });
        });
    };
    MangaSite.prototype.resolveMangaUrl = function (name) {
        return this.nameHelper.resolveUrl(name);
    };
    MangaSite.prototype.buildRequest = function (url$$1) {
        // todo add authentication headers
        return { url: url$$1 };
    };
    MangaSite.prototype.buildMangasRequest = function (url$$1) {
        return this.buildRequest(url$$1);
    };
    MangaSite.prototype.buildLatestRequest = function (url$$1) {
        return this.buildRequest(url$$1);
    };
    MangaSite.prototype.buildInfoRequest = function (url$$1) {
        return this.buildRequest(url$$1);
    };
    MangaSite.prototype.buildChapterRequest = function (url$$1) {
        return this.buildRequest(url$$1);
    };
    MangaSite.prototype.buildImagePathsRequest = function (url$$1) {
        return this.buildChapterRequest(url$$1);
    };
    MangaSite.prototype.getStrategy = function () {
        var strategy = ginConfig.config.sites[this.sitename];
        if (!strategy) {
            throw new Error("strategy not found for " + this.sitename);
        }
        return strategy;
    };
    MangaSite.prototype.getHtml = function (url$$1) {
        var strategy = this.getStrategy();
        return request(url$$1, strategy)
            .then(function (x) { return x.toString(); });
    };
    MangaSite.prototype.getDoc = function (url$$1) {
        return this.getHtml(url$$1).then(function (x) { return parseDoc(x, { location: url$$1.url || url$$1 }); });
    };
    MangaSite.prototype.postHtml = function (url$$1, params) {
        var o = url$$1;
        if (typeof url$$1 === "string") {
            o = { url: url$$1 };
        }
        var strategy = this.getStrategy();
        return request(__assign({}, o, { method: "POST", body: params }), strategy)
            .then(function (x) { return x.toString(); });
    };
    MangaSite.prototype.postDoc = function (url$$1, params) {
        return this.postHtml(url$$1, params)
            .then(function (x) { return parseDoc(x, { location: url$$1.url || url$$1 }); });
    };
    MangaSite.prototype.resolveChapterSource = function (name, chapter) {
        return __awaiter(this, void 0, void 0, function () {
            var chapters, c, _i, chapters_1, chap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chapters(name)];
                    case 1:
                        chapters = _a.sent();
                        c = chapter.toString();
                        for (_i = 0, chapters_1 = chapters; _i < chapters_1.length; _i++) {
                            chap = chapters_1[_i];
                            if (chap.chap_number === c) {
                                this.verbose("filtered chapters %o", chap);
                                return [2 /*return*/, chap.src];
                            }
                        }
                        throw new Error("Chapter not found");
                }
            });
        });
    };
    MangaSite.prototype.processImagePath = function (opts) {
        var _this = this;
        return new Lazy(function () { return __awaiter(_this, void 0, void 0, function () {
            var image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHtml(opts).then(this.parser.image)];
                    case 1:
                        image = _a.sent();
                        return [2 /*return*/, {
                                name: url.parse(image).pathname.split("/").reverse()[0],
                                src: image
                            }];
                }
            });
        }); });
    };
    return MangaSite;
}());

/**
 * Created by rodriguesc on 03/03/2017.
 */
var site = "http://www.mangahere.cc";
var config = {
    name: "MangaHere",
    site: site,
    mangas_url: url.resolve(site, "/mangalist/"),
    latest_url: url.resolve(site, "/latest/")
};
var debug$1 = require("debug")("gin-downloader:mangahere");
var verbose = require("debug")("gin-downloader:mangahere:verbose");
var error = require("debug")("gin-downloader:mangahere:error");
verbose("using %O", config);

var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var mangas = [];
        $(".manga_info").each(function (i, el) {
            mangas[i] = {
                name: el.lastChild.nodeValue,
                src: el.attribs["href"],
            };
        });
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        $(".manga_updates > dl").each(function (i, el) {
            var divChildren = sanitize(el.children);
            var aManga = divChildren[0].children.find(function (x) { return x.name === "a"; });
            // console.log(aManga)
            // let mangaUrl = aManga.attribs.href;
            var mangaName = aManga.lastChild.nodeValue;
            var date = divChildren[0].children.find(function (x) { return x.name === "span"; }).lastChild.nodeValue;
            var dts = sanitize(divChildren.slice(1));
            for (var _i = 0, dts_1 = dts; _i < dts_1.length; _i++) {
                var dt = dts_1[_i];
                var a = dt.children.find(function (x) { return x.name === "a"; });
                var src = a.attribs.href;
                var title = a.lastChild.nodeValue;
                var chapNumber = title.lastDigit();
                chapters.push({
                    name: mangaName,
                    src: src,
                    chap_number: chapNumber.toString(),
                    dateAdded: date
                });
            }
        });
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var image = $("img.img").attr("src");
        var title = $("div.title > h3").text().slice(5, -7);
        var li = [];
        $(".detail_topText > li").each(function (i, el) {
            li[i] = el;
        });
        //todo fix synonyms
        var synonyms = li[2].lastChild.nodeValue.split("; ").map(function (title) { return ({
            title: title,
            language: 'en'
        }); });
        var genres = li[3].lastChild.nodeValue.split(", ");
        var authors = li[4].children.filter(function (x) { return x.name === "a"; }).map(function (x) { return x.lastChild.nodeValue; });
        var artists = li[5].children.filter(function (x) { return x.name === "a"; }).map(function (x) { return x.lastChild.nodeValue; });
        var status = li[6].children[0].next.nodeValue.trim() === "Ongoing"
            ? exports.FilterStatus.Ongoing
            : exports.FilterStatus.Complete;
        var synopsis = li.reverse()[0].children.reverse().find(function (x) { return x.name == "p"; }).children[0].nodeValue;
        var licensed = false;
        if ($("#main > article > div > div.manga_detail > div.detail_list > div > strong").length > 0) {
            licensed = true;
        }
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
            licensed: licensed
        };
    };
    Parser.prototype.chapters = function ($) {
        var chapters = [];
        var licensed = false;
        if ($("#main > article > div > div.manga_detail > div.detail_list > div > strong").length > 0) {
            licensed = true;
        }
        $("span.left > a").each(function (i, el) {
            var span = el.parent;
            var li = span.parent;
            var date = sanitize(li.children).reverse()[0].lastChild.nodeValue;
            var a = el;
            chapters.push(__assign({}, Parser.parseChapter(a, span, date), { licensed: licensed }));
        });
        return chapters;
    };
    Parser.parseChapter = function (a, span, date) {
        var aText = a.lastChild.nodeValue.trim();
        var name = (span && span.lastChild.nodeValue) || aText;
        var href = a.attribs.href;
        return {
            chap_number: aText.lastDigit().toString(),
            name: name,
            src: url.resolve(config.site, href),
            dateAdded: date
        };
    };
    Parser.prototype.imagesPaths = function ($) {
        var paths = [];
        var licensed = $("body > section > div.mangaread_error > div.mt10.color_ff00.mb10.center").text();
        if (licensed && licensed.indexOf("It's not available in MangaHere.") >= 0) {
            // throw new LicencedError(licensed);
            throw new Error("Not licenced"); //TODO change to a better error
        }
        $("body > section.readpage_top > div.go_page.clearfix > span > select > option").each(function (i, el) {
            paths[i] = url.resolve($.location, "" + el.attribs.value);
        });
        return paths;
    };
    Parser.prototype.image = function (html) {
        var __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
        var __img__ = /src=".*\?token[^"]*/gmi;
        var m = html.match(__imgID__);
        if (!m || m.length === 0) {
            error("first image regex failed using\nhtml:%s", html);
            throw new Error("Image not found");
        }
        m = m[0].match(__img__);
        if (!m || m.length === 0) {
            error("second image regex failed using\nhtml:%s", html);
            throw new Error("Image not found");
        }
        return m[0].slice(5);
    };
    Parser.prototype.filter = function ($) {
        var mangas = [];
        $("a.manga_info").each(function (i, el) {
            mangas[i] = {
                name: el.lastChild.nodeValue,
                src: el.attribs.href
            };
        });
        var page = 1;
        var query = url.parse($.location).query;
        if (query) {
            var m = query.toString().match(/page=(\d+)/g);
            if (m) {
                page = +m[1];
            }
        }
        var lastPageElement = $("div.next-page > a").slice(-2, -1);
        var lastPage = 1;
        if (lastPageElement && lastPageElement[0]) {
            lastPage = +lastPageElement.text();
        }
        return {
            results: mangas,
            page: page,
            total: lastPage
        };
    };
    return Parser;
}());

/**
 * Created by david on 19/03/2017.
 */
var noCase = require("no-case");
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        var n = name.replace(/[^\x00-\x7F]/g, "_");
        return noCase(n.toLowerCase(), null, "_");
    };
    Helper.prototype.resolveUrl = function (name) {
        return url.resolve(config.site + "/manga/", this.toName(name) + "/");
    };
    return Helper;
}());

var Supported = {};
Supported[exports.Genre.Action] = exports.Genre.Action;
Supported[exports.Genre.Adult] = exports.Genre.Adult;
Supported[exports.Genre.Adventure] = exports.Genre.Adventure;
Supported[exports.Genre.Comedy] = exports.Genre.Comedy;
Supported[exports.Genre.Doujinshi] = exports.Genre.Doujinshi;
Supported[exports.Genre.Drama] = exports.Genre.Drama;
Supported[exports.Genre.Ecchi] = exports.Genre.Ecchi;
Supported[exports.Genre.Fantasy] = exports.Genre.Fantasy;
Supported[exports.Genre.GenderBender] = exports.Genre.GenderBender;
Supported[exports.Genre.Harem] = exports.Genre.Harem;
Supported[exports.Genre.Historical] = exports.Genre.Historical;
Supported[exports.Genre.Horror] = exports.Genre.Horror;
Supported[exports.Genre.Josei] = exports.Genre.Josei;
Supported[exports.Genre.Lolicon] = exports.Genre.Lolicon;
Supported[exports.Genre.MartialArts] = exports.Genre.MartialArts;
Supported[exports.Genre.Mature] = exports.Genre.Mature;
Supported[exports.Genre.Mecha] = exports.Genre.Mecha;
Supported[exports.Genre.Mystery] = exports.Genre.Mystery;
Supported[exports.Genre.Oneshot] = exports.Genre.Oneshot;
Supported[exports.Genre.Psychological] = exports.Genre.Psychological;
Supported[exports.Genre.Romance] = exports.Genre.Romance;
Supported[exports.Genre.SchoolLife] = exports.Genre.SchoolLife;
Supported[exports.Genre.SciFi] = exports.Genre.SciFi;
Supported[exports.Genre.Seinen] = exports.Genre.Seinen;
Supported[exports.Genre.Shotacon] = exports.Genre.Shotacon;
Supported[exports.Genre.Shoujo] = exports.Genre.Shoujo;
Supported[exports.Genre.ShoujoAi] = exports.Genre.ShoujoAi;
Supported[exports.Genre.Shounen] = exports.Genre.Shounen;
Supported[exports.Genre.ShounenAi] = exports.Genre.ShounenAi;
Supported[exports.Genre.SliceOfLife] = exports.Genre.SliceOfLife;
Supported[exports.Genre.Smut] = exports.Genre.Smut;
Supported[exports.Genre.Sports] = exports.Genre.Sports;
Supported[exports.Genre.Supernatural] = exports.Genre.Supernatural;
Supported[exports.Genre.Tragedy] = exports.Genre.Tragedy;
Supported[exports.Genre.Yaoi] = exports.Genre.Yaoi;
Supported[exports.Genre.Yuri] = exports.Genre.Yuri;
var correctName = {};
correctName[exports.Genre.Adult] = exports.Genre.Adult;
correctName[exports.Genre.Action] = exports.Genre.Action;
correctName[exports.Genre.Adventure] = exports.Genre.Adventure;
correctName[exports.Genre.Comedy] = exports.Genre.Comedy;
correctName[exports.Genre.Doujinshi] = exports.Genre.Doujinshi;
correctName[exports.Genre.Drama] = exports.Genre.Drama;
correctName[exports.Genre.Ecchi] = exports.Genre.Ecchi;
correctName[exports.Genre.Fantasy] = exports.Genre.Fantasy;
correctName[exports.Genre.GenderBender] = "Gender Bender";
correctName[exports.Genre.Harem] = exports.Genre.Harem;
correctName[exports.Genre.Historical] = exports.Genre.Historical;
correctName[exports.Genre.Horror] = exports.Genre.Horror;
correctName[exports.Genre.Josei] = exports.Genre.Josei;
correctName[exports.Genre.Lolicon] = exports.Genre.Lolicon;
correctName[exports.Genre.MartialArts] = "Martial Arts";
correctName[exports.Genre.Mature] = exports.Genre.Mature;
correctName[exports.Genre.Mecha] = exports.Genre.Mecha;
correctName[exports.Genre.Mystery] = exports.Genre.Mystery;
correctName[exports.Genre.Oneshot] = "One Shot";
correctName[exports.Genre.Psychological] = exports.Genre.Psychological;
correctName[exports.Genre.Romance] = exports.Genre.Romance;
correctName[exports.Genre.SchoolLife] = exports.Genre.SchoolLife;
correctName[exports.Genre.SciFi] = "Sci-fi";
correctName[exports.Genre.Seinen] = exports.Genre.Seinen;
correctName[exports.Genre.Shotacon] = exports.Genre.Shotacon;
correctName[exports.Genre.Shoujo] = exports.Genre.Shoujo;
correctName[exports.Genre.ShoujoAi] = "Shoujo Ai";
correctName[exports.Genre.Shounen] = exports.Genre.Shounen;
correctName[exports.Genre.ShounenAi] = "Shounen Ai";
correctName[exports.Genre.SliceOfLife] = "Slice of Life";
correctName[exports.Genre.Smut] = exports.Genre.Smut;
correctName[exports.Genre.Sports] = exports.Genre.Sports;
correctName[exports.Genre.Supernatural] = exports.Genre.Supernatural;
correctName[exports.Genre.Tragedy] = exports.Genre.Tragedy;
correctName[exports.Genre.Yaoi] = exports.Genre.Yaoi;
correctName[exports.Genre.Yuri] = exports.Genre.Yuri;
var processFilter = function (mangafilter) {
    var filter = procFilter(mangafilter);
    var search = filter.search, page = filter.page;
    var filterType = null;
    var filterName = filter.search.name && filter.search.name.name || filter.search.name;
    var filterAuthor = null;
    var filterArtist = null;
    var filterReleased = null;
    var status = null;
    var methodName = "cw";
    var methodAuthor = "cw";
    var methodArtist = "cw";
    var methodReleased = "eq";
    var inGenres = [];
    var outGenres = [];
    if (search) {
        var name = search.name, author_1 = search.author, artist_1 = search.artist, rating = search.rating, released = search.released, type_1 = search.type, genre = search.genre;
        filterType = resolveType(type_1) || filterType;
        if (name) {
            methodName = searchMethod(name.condition) || methodName;
        }
        if (search.status) {
            status = resolveStatus(search.status) || status;
        }
        if (author_1) {
            filterAuthor = author_1.name || filterAuthor;
            methodAuthor = searchMethod(author_1.condition) || methodAuthor;
        }
        if (artist_1) {
            filterArtist = artist_1.name || filterArtist;
            methodArtist = searchMethod(artist_1.condition) || methodArtist;
        }
        if (released) {
            filterReleased = released.value || filterReleased;
            methodReleased = searchMethod(released.condition) || methodReleased;
        }
        if (genre) {
            inGenres = genre.inGenres;
            outGenres = genre.outGenres;
        }
    }
    var type = "direction=" + (filterType || "");
    var nameMethod = "name_method=" + methodName; // NOTE name search set to contains
    var mangaName = "name=" + (filterName || "");
    var authorMethod = "author_method=" + methodAuthor;
    var author = "author=" + (filterAuthor || "");
    var artistMethod = "artist_method=" + methodArtist;
    var artist = "artist=" + (filterArtist || "");
    var genreFilter = lodash.map(Supported, function (x) { return "genres%5B" + correctName[x].replace(/ /g, "+") + "%5D=" + inOutGenre(x, inGenres, outGenres); }).join("&");
    var releaseMethod = "released_method=" + methodReleased;
    var release = "released=" + (filterReleased || "");
    var completed = "is_completed=" + (status || "");
    var advopts = "advopts=1"; // NOTE not sure what is this
    if (page) {
        advopts += "&page=" + page;
    }
    return {
        src: url.resolve(config.site, "/search.php?" + [nameMethod, mangaName,
            type,
            authorMethod, author,
            artistMethod, artist,
            genreFilter,
            releaseMethod, release,
            completed, advopts].join("&"))
    };
};
function resolveType(type) {
    switch (type) {
        case exports.Type.Manga:
            return "rl";
        case exports.Type.Manhwa:
            return "lr";
        default:
            return null;
    }
}
function resolveStatus(status) {
    switch (status) {
        case exports.FilterStatus.Ongoing:
            return 0;
        case exports.FilterStatus.Complete:
            return 1;
        default:
            return null;
    }
}
function searchMethod(condition) {
    switch (condition) {
        case exports.FilterCondition.Contains:
            return "cw";
        case exports.FilterCondition.StartsWith:
            return "bw";
        case exports.FilterCondition.EndsWith:
            return "ew";
        case exports.FilterCondition.Equal:
            return "eq";
        case exports.FilterCondition.LessThan:
            return "lt";
        case exports.FilterCondition.GreaterThan:
            return "gt";
        default:
            return "cw";
    }
}
function inOutGenre(genre, inGenre, outGenre) {
    if (inGenre && inGenre.indexOf(genre) > -1) {
        return 1;
    }
    if (outGenre && outGenre.indexOf(genre) > -1) {
        return 2;
    }
    return 0;
}

var SITES = exports.gin.SITES;
var MangaHere = /** @class */ (function (_super) {
    __extends(MangaHere, _super);
    function MangaHere() {
        return _super.call(this, SITES.MANGAHERE, config, new Parser(), new Helper()) || this;
    }
    MangaHere.prototype.filter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var search, doc, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("filter mangas with: %o", filter);
                        search = processFilter(filter);
                        return [4 /*yield*/, this.getDoc(search.src)];
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
    return MangaHere;
}(MangaSite));
var mangahere = new MangaHere();

// import {manga as mangafox} from "./sites/mangafox/index";
// import {manga as mangahere} from "./sites/mangahere/index";
// import {manga as mangapanda} from "./sites/mangapanda/index";
// import {manga as kissmanga} from "./sites/kissmanga/index";
// export {manga as batoto} from "./sites/batoto/index";

// export {SuperChapter, SuperObject} from "./super_obj";
// export {ginConfig} from "./config";
// export {parseDoc} from "./util";
//
// export {RequestCloudFlareStrategy, RequestRetryStrategy} from "./request/index";
// export {request} from "./request/pool";
// export const gin = {
//   // mangafox,
//   // mangahere,
//   // mangapanda,
//   // kissmanga,
//   batoto,
// };
//
// import {LoginSite, Site} from "src/interface";
//
// const enum sites {
//   mangafox = "mangafox",
//   mangapanga = "mangapanga",
//   mangahere = "mangahere",
//   kissmanga = "kissmanga",
//   batoto = "batoto",
// }
//
// export class GinDownloader {
//   private _mangafox: Site;
//   private _mangapanga: Site;
//   private _mangahere: Site;
//   private _kissmanga: Site;
//   private _batoto: Site;
//
//   private static resolveSite(site: sites)  {
//     return require(`./sites/${site}/index`).default;
//   }
//
//   get mangafox(): Site{
//     return this._mangafox || (this._mangafox = GinDownloader.resolveSite(sites.mangafox));
//   }
//   get mangapanga(): Site{
//     return this._mangapanga || (this._mangapanga = GinDownloader.resolveSite(sites.mangapanga));
//   }
//   get mangahere(): Site{
//     return this._mangahere || (this._mangahere = GinDownloader.resolveSite(sites.mangahere));
//   }
//   get kissmanga(): Site{
//     return this._kissmanga || (this._kissmanga = GinDownloader.resolveSite(sites.kissmanga));
//   }
//   get batoto(): LoginSite {
//     return this._batoto || (this._batoto = GinDownloader.resolveSite(sites.batoto));
//   }
//
// }
//
//
// const gin = new GinDownloader();
// export default gin;

exports.mangahere = mangahere;

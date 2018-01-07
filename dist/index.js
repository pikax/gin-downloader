'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash = require('lodash');
var cheerio = require('cheerio');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

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
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
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

/**
 * Created by pikax on 08/07/2017.
 */
var Genre;
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
})(Genre || (Genre = {}));
var Type;
(function (Type) {
    Type["Manga"] = "Manga";
    Type["Manhwa"] = "Manhwa";
    Type["Manhua"] = "Manhua";
    Type["Comic"] = "Comic";
    Type["Artbook"] = "Artbook";
    Type["Other"] = "Other";
})(Type || (Type = {}));
var FilterCondition;
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
})(FilterCondition || (FilterCondition = {}));
var GenreCondition;
(function (GenreCondition) {
    GenreCondition[GenreCondition["And"] = 0] = "And";
    GenreCondition[GenreCondition["Or"] = 1] = "Or";
})(GenreCondition || (GenreCondition = {}));
var FilterStatus;
(function (FilterStatus) {
    FilterStatus["Ongoing"] = "Ongoing";
    FilterStatus["Complete"] = "Complete";
    FilterStatus["Cancelled"] = "Cancelled";
})(FilterStatus || (FilterStatus = {}));

/**
 * Created by pikax on 23/05/2017.
 */
var cloudscraper = require("cloudscraper");
// specific options for cloudscraper lib
var DefaultOptions = {
    // none
    method: "GET"
};
var RequestCloudFlareStrategy = /** @class */ (function () {
    function RequestCloudFlareStrategy() {
    }
    RequestCloudFlareStrategy.prototype.request = function (options) {
        var opts = __assign({}, DefaultOptions, ginConfig.config.request);
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
    return RequestCloudFlareStrategy;
}());
var strategy = new RequestCloudFlareStrategy();

var requestRetry = require("requestretry");
// specific options for requestretry lib
var DefaultOptions$1 = {
    retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError,
    fullResponse: false,
};
var RequestRetryStrategy = /** @class */ (function () {
    function RequestRetryStrategy() {
    }
    RequestRetryStrategy.prototype.request = function (options) {
        var opts = __assign({}, DefaultOptions$1, ginConfig.config.request, lodash.pick(ginConfig.config, "maxRetries", "timeout", "interval"));
        if (typeof options === "string") {
            opts.url = options;
        }
        else {
            opts = __assign({}, opts, options);
        }
        //TODO find a better place for this
        if (ginConfig.config.disableHttps) {
            opts.url = opts.url.toString().replace("https", "http");
        }
        return requestRetry(opts);
    };
    return RequestRetryStrategy;
}());
var strategy$2 = new RequestRetryStrategy();

/**
 * Created by pikax on 16/07/2017.
 */
/*: {retry: RequestStrategy, cloudflare: RequestStrategy} */
var strategies = {
    retry: strategy$2,
    cloudflare: strategy,
};
//
// const s: {retry: RequestRetryStrategy, cloudflare: RequestCloudFlareStrategy} = {
//   retry: requestRetryStrategy,
//   cloudflare: requestCloudFareStrategy,
// };
//
//
// export const strategies = s;
//

/**
 * Created by pikax on 16/07/2017.
 */
/*TODO this shouldn't be a function, this should be a const only, but the default config is called by the strategies
* that means when we load the strategies module, it needs to load this one first but this uses strategies.
* */
var DefaultConfig = {
    maxRetries: 50,
    timeout: 10000,
    interval: 1000,
    pooling: {
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
    },
    disableHttps: true,
    sites: {
        batoto: strategies.retry,
        mangafox: strategies.retry,
        mangapanda: strategies.retry,
        mangahere: strategies.retry,
        kissmanga: strategies.cloudflare,
    },
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
var Config = /** @class */ (function () {
    function Config() {
    }
    Object.defineProperty(Config.prototype, "defaultConfig", {
        get: function () { return DefaultConfig; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "config", {
        get: function () { return this._config || (this._config = this.buildConfig()); },
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
    return new Promise((function (resolve$$1) { return setTimeout(resolve$$1, ms); }));
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
            var genre = search.genre, name_1 = search.name, author = search.author, artist = search.artist, released = search.released, rating = search.rating;
            if (Array.isArray(genre)) {
                var defGenre = def && def.search && def.search.genre;
                search.genre = __assign({}, defGenre, { inGenres: genre });
            }
            if (typeof name_1 === "string") {
                search.name = {
                    name: name_1
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
    function MangaSite(config$$1, parser, nameHelper) {
        this.debug = debug("gin-downloader:" + config$$1.name);
        this.verbose = debug("gin-downloader:" + config$$1.name + ":verbose");
        this.error = debug("gin-downloader:" + config$$1.name + ":error");
        this._config = config$$1;
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
 * Created by rodriguesc on 24/03/2017.
 */
var site = "https://bato.to/";
var config$1 = {
    name: "Batoto",
    site: site,
    mangas_url: url.resolve(site, "/search_ajax"),
    latest_url: url.resolve(site, "/"),
};
var debug$1 = require("debug")("gin-downloader:batoto");
var verbose = require("debug")("gin-downloader:batoto:verbose");
var error = require("debug")("gin-downloader:batoto:error");
verbose("using %O", config$1);

var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        if (!name) {
            return name;
        }
        if (name.endsWith("?!")) {
            return name.slice(0, -1);
        }
        if (name === "enígmә") {
            return "Enigma";
        }
        if (name === "Pietà") {
            return "Pieta";
        }
        return name;
    };
    Helper.prototype.resolveUrl = function (name) {
        return config$1.site + "Manga/" + this.toName(name);
    };
    return Helper;
}());
var helper = new Helper();

var ordered = [
    Genre.Action,
    Genre.Adventure,
    Genre.Comedy,
    Genre.Mystery,
    Genre.Psychological,
    Genre.Romance,
    Genre.SchoolLife,
    Genre.SciFi,
    Genre.Doujinshi,
    Genre.Drama,
    Genre.Ecchi,
    Genre.Fantasy,
    Genre.GenderBender,
    Genre.ShoujoAi,
    Genre.Harem,
    Genre.ShounenAi,
    Genre.Historical,
    Genre.SliceOfLife,
    Genre.Horror,
    Genre.Smut,
    Genre.Sports,
    Genre.Supernatural,
    Genre.MartialArts,
    Genre.Tragedy,
    Genre.Yaoi,
    Genre.Mecha,
    Genre.Yuri,
    Genre.Seinen,
    Genre.Shounen,
    Genre.Josei,
    Genre.Shoujo,
    Genre.Webtoon,
    Genre.Music,
    Genre.Oneshot,
    Genre.AwardWinning,
    Genre.FourKoma,
    Genre.Cooking,
    Genre.Medical,
    Genre.NoChapters,
];
var dic = {};
dic[Genre.Action] = "1";
dic[Genre.Adventure] = "2";
dic[Genre.Comedy] = "3";
dic[Genre.Mystery] = "4";
dic[Genre.Psychological] = "5";
dic[Genre.Romance] = "6";
dic[Genre.SchoolLife] = "7";
dic[Genre.SciFi] = "8";
dic[Genre.Doujinshi] = "9";
dic[Genre.Drama] = "10";
dic[Genre.Ecchi] = "12";
dic[Genre.Fantasy] = "13";
dic[Genre.GenderBender] = "15";
dic[Genre.ShoujoAi] = "16";
dic[Genre.Harem] = "17";
dic[Genre.ShounenAi] = "19";
dic[Genre.Historical] = "20";
dic[Genre.SliceOfLife] = "21";
dic[Genre.Horror] = "22";
dic[Genre.Smut] = "23";
dic[Genre.Sports] = "25";
dic[Genre.Supernatural] = "26";
dic[Genre.MartialArts] = "27";
dic[Genre.Tragedy] = "28";
dic[Genre.Yaoi] = "29";
dic[Genre.Mecha] = "30";
dic[Genre.Yuri] = "31";
dic[Genre.Seinen] = "32";
dic[Genre.Shounen] = "33";
dic[Genre.Josei] = "34";
dic[Genre.Shoujo] = "35";
dic[Genre.Webtoon] = "36";
dic[Genre.Music] = "37";
dic[Genre.Oneshot] = "38";
dic[Genre.AwardWinning] = "39";
dic[Genre.FourKoma] = "40";
dic[Genre.Cooking] = "41";
dic[Genre.Medical] = "42";
dic[Genre.NoChapters] = "44";
var processFilter = function (mangafilter) {
    var filter = procFilter(mangafilter);
    var search = filter.search;
    var fauthor = null;
    var fstatus = null;
    var ftype = null;
    var fname = "";
    var nameCondition = "";
    var authorCondition = null;
    var genreCondition = null;
    var fmature = "y";
    var fratingFrom = 0;
    var fratingTo = 5;
    var genres = null;
    var outGenres = null;
    if (search) {
        var nameFilter = search.name;
        if (nameFilter) {
            fname = nameFilter.name;
            nameCondition = resolveCondition(nameFilter.condition); // not support equals just Starts|Ends|Contains
        }
        var authorFilter = search.author || search.artist;
        if (authorFilter) {
            fauthor = authorFilter.name;
            authorCondition = resolveCondition(authorFilter.condition);
        }
        var statusFilter = search.status;
        if (statusFilter) {
            fstatus = resolveStatus(statusFilter);
        }
        var genreFilter_1 = search.genre;
        if (genreFilter_1) {
            genres = genreFilter_1.inGenres;
            outGenres = genreFilter_1.outGenres;
            genreCondition = resolveGenreCondition(genreFilter_1.condition);
        }
        var type_1 = search.type, mature_1 = search.mature, rating = search.rating;
        if (type_1) {
            ftype = resolveType(type_1);
        }
        fmature = util.isNullOrUndefined(mature_1) || mature_1 ? "y" : "n";
        if (rating) {
            fratingFrom = rating.from || 0;
            fratingTo = rating.to || 5;
        }
    }
    var mangaName = helper.toName(fname);
    var name_cond = nameCondition;
    var artist_name = fauthor;
    var artist_name_cond = authorCondition;
    var genreFilter = ordered.map(function (x) { return inOutGenre(x, genres, outGenres); }).filter(function (x) { return x !== ""; }).join(";");
    var genre_cond = genreCondition || "genre_cond=and"; // todo change me
    var status = fstatus;
    var type = ftype;
    var p = filter.page || 1;
    var rating_low = fratingFrom || 0; // 0~5
    var rating_high = fratingTo || 5; // 0~5
    var mature = fmature || "y"; // n == false
    return {
        src: config$1.mangas_url,
        qs: {
            name: mangaName,
            name_cond: name_cond,
            artist_name: artist_name,
            artist_name_cond: artist_name_cond,
            genres: genreFilter,
            genre_cond: genre_cond,
            status: status,
            type: type,
            mature: mature,
            rating_low: rating_low,
            rating_high: rating_high,
            p: p
        }
    };
};
function resolveType(type) {
    switch (type) {
        case Type.Manga:
            return "jp";
        case Type.Manhwa:
            return "kr";
        case Type.Manhua:
            return "cn";
        case Type.Artbook:
            return "ar";
        case Type.Other:
            return "ot";
        default:
            throw new Error("Unknown type");
    }
}
function resolveCondition(condition) {
    switch (condition) {
        case FilterCondition.Contains:
            return "c";
        case FilterCondition.EndsWith:
            return "e";
        case FilterCondition.StartsWith:
            return "s";
        case FilterCondition.Equal:// not supported for name
            return "is";
        default:
            return "c";
    }
}
function resolveGenreCondition(condition) {
    switch (condition) {
        case GenreCondition.And:
            return "and";
        case GenreCondition.Or:
            return "or";
        default:
            return "and";
    }
}
function resolveStatus(status) {
    switch (status) {
        case FilterStatus.Ongoing:
            return "i";
        case FilterStatus.Complete:
            return "c";
        default:
            return null;
    }
}
function inOutGenre(genre, inGenre, outGenre) {
    if (inGenre && inGenre.indexOf(genre) > -1) {
        return "i" + dic[genre];
    }
    if (outGenre && outGenre.indexOf(genre) > -1) {
        return "e" + dic[genre];
    }
    return "";
}

var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var rows = $("tr[id^='comic_rowo']");
        var mangas = [];
        rows.each(function (i, e) {
            // note this performance can be improved, is taking around 72ms to resolve 30 items, libxml could handle that
            // in 10ms, if we don't use the $() it can reach around those speeds, 72ms is not that much
            var td = $(e).prev();
            mangas[i] = {
                name: td.find("td > strong > a").text().slice(1),
                src: td.find("td > strong > a").attr("href"),
                status: td.find("td > strong > a > img").attr("src").indexOf("book_open") > 0 ? "Open" : "Closed",
                mature: td.find("td > img").eq(1).attr("alt") === "Mature",
            };
        });
        // console.log(mangas);
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        var $trs = [];
        $("#content > div > div.category_block.block_wrap > table > tbody > tr").slice(1).each(function (i, el) {
            $trs[i] = el;
        });
        for (var i = 0; i < $trs.length; ++i) {
            var header = $trs[i];
            var ha = lodash.last(sanitize(header.children)).children
                .find(function (x) { return x && x.attribs && x.attribs.href && x.attribs.href.startsWith("http"); });
            // let mangaUrl = ha.attribs.href;
            var mangaName = ha.lastChild.nodeValue;
            var row = header.attribs.class.slice(0, 4);
            var tr = void 0;
            while ((tr = $trs[++i]) && (tr.attribs && tr.attribs.class.startsWith(row))) {
                var tds = sanitize(tr.children).reverse(); // reversed
                var date = tds[0].lastChild.nodeValue.trim(); // date
                var sTd = tds[1].children.find(function (x) { return x.name === "a"; }); // scanlator
                var lTd = tds[2].children.find(function (x) { return x.name === "div"; }); // lang
                var cTd = tds[3].children.find(function (x) { return x.name === "a"; }); // chapter
                //
                // if(i>9){
                //   console.log($trs[i]);
                //   console.log(mangaName);
                //   console.log(mangaUrl);
                // }
                var cname = cTd.lastChild.nodeValue;
                var src = cTd.attribs.href;
                var lang = lTd.attribs.title;
                var scanlator = sTd.lastChild.nodeValue;
                chapters[i] = {
                    name: mangaName,
                    chap_number: Parser.extractChapterNumber(cname).toString(),
                    volume: Parser.extractVolumeNumber(cname),
                    src: Parser.convertChapterReaderUrl(src),
                    language: lang,
                    scanlator: scanlator,
                    dateAdded: date
                };
            }
            --i;
        }
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var $content = $("#content");
        var $ipsBox = $content.find("div.ipsBox");
        var $ipbTable = $ipsBox.find(".ipb_table");
        var $tr = $ipbTable.find("tr > td");
        var title = $("h1.ipsType_pagetitle").text().trim();
        var image = $ipsBox.find("img").attr("src");
        var synonyms = $tr.eq(1).children("span").map(function (i, e) { return e.lastChild && e.lastChild.nodeValue.slice(1); }).get().filter(function (x) { return x; });
        var authors = $tr.eq(3).children("a").map(function (i, e) { return e.lastChild && e.lastChild.nodeValue; }).get().filter(function (x) { return x; });
        var artists = $tr.eq(5).children("a").map(function (i, e) { return e.lastChild && e.lastChild.nodeValue; }).get().filter(function (x) { return x; });
        var genres = $tr.eq(7).children("a").map(function (i, e) { return e.lastChild.lastChild; }).filter(function (x, e) { return !!e; }).map(function (i, e) { return e.nodeValue.slice(1); }).get();
        var synopsis = $tr.eq(13).text();
        var type = Parser.resolveMangaType($tr.eq(9).text().trim()); // TODO curate this result, Manga (Japanese)
        var status = $tr.eq(11).text().trim();
        var mature = $content.find("div:nth-child(4) > div > div.ipsBox > div:nth-child(3)").length > 0;
        return {
            image: image,
            title: title,
            synonyms: synonyms.map(Parser.resolveSynonyms),
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
            type: type,
            mature: mature,
        };
    };
    Parser.resolveSynonyms = function (title) {
        var reg = /\(\w+\)$/;
        var language = "English";
        var m = title.match(reg);
        if (m) {
            language = m[0].slice(1, -1);
        }
        return { title: title, language: language };
    };
    Parser.resolveMangaType = function (tp) {
        switch (tp) {
            case "Manga (Japanese)":
                return Type.Manga;
            case "Manhwa (Korean)":
                return Type.Manhwa;
            case "Manhua (Chinese)":
                return Type.Manhwa;
            case "Artbook":
                return Type.Artbook;
            case "Other":
                return Type.Other;
            default:
                throw new Error("Unknown manga type: " + tp);
        }
    };
    Parser.prototype.chapters = function ($) {
        var chapters = [];
        $(".chapter_row")
            .each(function (i, e) {
            var children = e.children.filter(function (x) { return x.type === "tag"; });
            var eTitle = children[0];
            var eLanguage = children[1];
            var eGroup = children[2];
            var eDate = children[4];
            // const fullTitle = eTitle.next.childNodes[1].lastChild.nodeValue.slice(1);
            var a = eTitle.childNodes.find(function (x) { return x.name === "a"; });
            var fullTitle = a.lastChild.nodeValue.slice(1);
            var src = Parser.convertChapterReaderUrl(a.attribs.href);
            var name = Parser.extractChapterName(fullTitle);
            var chap_number = Parser.extractChapterNumber(fullTitle).toString();
            var volume = Parser.extractVolumeNumber(fullTitle);
            var language = eLanguage.lastChild.attribs.title;
            var scanlator = eGroup.childNodes.find(function (x) { return x.name === "a"; }).lastChild.nodeValue;
            var dateAdded = eDate.lastChild.nodeValue;
            chapters[i] = {
                chap_number: chap_number,
                volume: volume,
                src: src,
                name: name,
                language: language,
                scanlator: scanlator,
                dateAdded: dateAdded,
            };
        });
        return chapters;
    };
    Parser.prototype.imagesPaths = function ($) {
        var paths = [];
        $("#page_select").eq(1).children().each(function (i, e) { return paths[i] = Parser.convertChapterReaderUrl(e.attribs["value"]); });
        return paths;
    };
    Parser.convertChapterReaderUrl = function (src) {
        if (src.startsWith(url.resolve(config$1.site, "/areader"))) {
            return src;
        }
        var idNumber = src.split("#")[1];
        var pg = 1;
        var pgMatch = /_\d+$/.exec(idNumber);
        if (pgMatch) {
            pg = +pgMatch[0].slice(1);
            idNumber = idNumber.replace(pgMatch[0], "");
        }
        return url.resolve(config$1.site, "/areader?id=" + idNumber + "&p=" + pg);
    };
    Parser.prototype.image = function (html) {
        var regex = /(?:id="comic_page".*)((http|https):\/\/img\.bato\.to\/comics\/[^"]*)/gm;
        var m = regex.exec(html); // get the first match
        if (!m) {
            error("image regex failed using:\nhtml:%s", html);
            throw new Error("Image not found");
        }
        return m[1];
    };
    Parser.prototype.filter = function ($) {
        var results = this.mangas($);
        var next = $(".input_submit");
        var location = $.location;
        var matches = location.match(/\d+$/); // get page | &p=11
        var match = matches && +matches[0];
        return {
            results: results,
            page: match || 1,
            total: (next.length && 99999) || +match || 1
        };
    };
    Parser.extractChapterNumber = function (text) {
        var match = text.match(/Ch\.\d+(\.\d{1,3})?/);
        return match && match[0] && +match[0].slice(3);
    };
    Parser.extractVolumeNumber = function (text) {
        var match = text.match(/Vol\.\d+/);
        return match && match[0] && match[0].slice(4);
    };
    Parser.extractChapterName = function (text) {
        var index = text.indexOf(":");
        return (index > 0 && text.slice(index + 2)) || text;
    };
    return Parser;
}());
var parser = new Parser();

var Batoto = /** @class */ (function (_super) {
    __extends(Batoto, _super);
    function Batoto() {
        var _this = _super.call(this, config$1, new Parser(), new Helper()) || this;
        _this.sitename = "batoto";
        _this._urlCache = {}; // provide a cache for resolved urls
        return _this;
    }
    Batoto.prototype.resolveMangaUrl = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, filterResults, page, results, result, _i, results_1, obj, n;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._urlCache[name]) {
                            return [2 /*return*/, this._urlCache[name]];
                        }
                        filter = { search: { name: { name: name, condition: FilterCondition.Contains } } };
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
                        this.debug("filtered results: %o", results);
                        result = void 0;
                        // console.log(results);
                        for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                            obj = results_1[_i];
                            n = obj.name.leftTrim();
                            if (n === name) {
                                result = obj.src;
                            }
                            else if (n.startsWith(name) && n === name + " (" + lodash.capitalize(lodash.deburr(name.replace("ә", "a"))) + ")") {
                                result = obj.src;
                            }
                            else if (n.endsWith("(" + lodash.deburr(name.replace("ә", "a")) + ")")) {
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
                        search = processFilter(filter);
                        return [4 /*yield*/, this.getDoc({ url: search.src, qs: search.qs })];
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
                        return [2 /*return*/, Parser.convertChapterReaderUrl(src)];
                }
            });
        });
    };
    Batoto.prototype.buildChapterRequest = function (url$$1) {
        var opts = _super.prototype.buildRequest.call(this, url$$1);
        opts.headers = __assign({}, opts.headers, { Referer: "http://bato.to/reader" });
        return opts;
    };
    // buildLoginRequest(url: )
    Batoto.prototype.isLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, match;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHtml("http://bato.to/search")];
                    case 1:
                        html = _a.sent();
                        match = html.match(/>Sign Out<\/a>/m);
                        return [2 /*return*/, !!match];
                }
            });
        });
    };
    Batoto.prototype.login = function (user, pw, rememberMe) {
        if (rememberMe === void 0) { rememberMe = true; }
        return __awaiter(this, void 0, void 0, function () {
            var url$$1, request, $, authKey, body, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url$$1 = "https://bato.to/forums/index.php?app=core&module=global&section=login&do=process";
                        request = this.buildRequest(url$$1);
                        return [4 /*yield*/, this.getDoc(request)];
                    case 1:
                        $ = _a.sent();
                        authKey = $("#login > input[name='auth_key']").attr("value");
                        body = {
                            auth_key: authKey,
                            ips_username: user,
                            ips_password: pw,
                            rememberMe: rememberMe ? 1 : 0,
                        };
                        request.headers = {
                            "Content-Type": "application/x-www-form-urlencoded",
                        };
                        return [4 /*yield*/, this.postHtml(request, querystring.stringify(body))];
                    case 2:
                        html = _a.sent();
                        return [2 /*return*/, !!html.match(new RegExp("Welcome, " + user, "g"))];
                }
            });
        });
    };
    return Batoto;
}(MangaSite));
var manga = new Batoto();

var SuperObject = /** @class */ (function () {
    function SuperObject(name, site, url$$1) {
        this.name = name;
        this.site = site;
        this.url = url$$1;
    }
    Object.defineProperty(SuperObject.prototype, "chapters", {
        get: function () {
            return this._chapters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperObject.prototype, "info", {
        get: function () {
            return __assign({}, this._info);
        },
        enumerable: true,
        configurable: true
    });
    SuperObject.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var p, info, chapters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = this.url
                            ? this.site.infoChaptersByUrl(this.url)
                            : this.site.infoChapters(this.name);
                        return [4 /*yield*/, p];
                    case 1:
                        info = _a.sent();
                        chapters = info.chapters.map(function (x) { return _this.toSuperChapter(x); });
                        this._chapters = chapters;
                        return [2 /*return*/, this._info = info];
                }
            });
        });
    };
    SuperObject.prototype.toSuperChapter = function (chapter) {
        var c = new SuperChapter(this, chapter);
        return c;
    };
    return SuperObject;
}());
var SuperChapter = /** @class */ (function () {
    function SuperChapter(master, _source) {
        this.master = master;
        this._source = _source;
    }
    Object.defineProperty(SuperChapter.prototype, "images", {
        get: function () {
            return this._images;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperChapter.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    SuperChapter.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this._images;
                        if (_a) return [3 /*break*/, 2];
                        _b = this;
                        return [4 /*yield*/, this.master.site.imagesByUrl(this._source.src)];
                    case 1:
                        _a = (_b._images = _c.sent());
                        _c.label = 2;
                    case 2: return [2 /*return*/, _a];
                }
            });
        });
    };
    return SuperChapter;
}());

// import {manga as mangafox} from "./sites/mangafox/index";
// import {manga as mangahere} from "./sites/mangahere/index";
// import {manga as mangapanda} from "./sites/mangapanda/index";
// import {manga as kissmanga} from "./sites/kissmanga/index";

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

exports.batoto = manga;
exports.SuperChapter = SuperChapter;
exports.SuperObject = SuperObject;
exports.ginConfig = ginConfig;
exports.parseDoc = parseDoc;
exports.strategies = strategies;
exports.request = request;
//# sourceMappingURL=index.js.map

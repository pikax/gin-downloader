'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var url = require('url');
var cheerio = require('cheerio');

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

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

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

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

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
(function (MangaSite) {
    MangaSite["MangaHere"] = "mangahere";
})(exports.MangaSite || (exports.MangaSite = {}));

// TODO add logger and log
var MangaHereFilter = /** @class */ (function () {
    function MangaHereFilter(dependencies) {
        this._genreSite = dependencies.genre;
    }
    MangaHereFilter.prototype.process = function (filter) {
        var _this = this;
        var search = filter.search, page = filter.page;
        var filterType = null;
        var filterName = filter.search.name && filter.search.name.name || filter.search.name;
        var filterAuthor = null;
        var filterArtist = null;
        var filterReleased = null;
        var status = "";
        var methodName = "cw";
        var methodAuthor = "cw";
        var methodArtist = "cw";
        var methodReleased = "eq";
        var inGenres = [];
        var outGenres = [];
        if (search) {
            var name = search.name, author_1 = search.author, artist_1 = search.artist, released = search.released, type_1 = search.type, genre = search.genre;
            filterType = resolveType(type_1) || filterType;
            if (name) {
                methodName = searchMethod(name.condition);
            }
            if (search.status) {
                status = resolveStatus(search.status);
            }
            if (author_1) {
                filterAuthor = author_1.name;
                methodAuthor = searchMethod(author_1.condition);
            }
            if (artist_1) {
                filterArtist = artist_1.name;
                methodArtist = searchMethod(artist_1.condition);
            }
            if (released) {
                filterReleased = released.value;
                methodReleased = yearSearchMethod(released.condition);
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
        var genreFilter = this._genreSite.supported().map(function (x) { return "genres%5B" + _this._genreSite.toSiteGenre(x).replace(/ /g, "+") + "%5D=" + inOutGenre(x, inGenres, outGenres); }).join("&");
        var releaseMethod = "released_method=" + methodReleased;
        var release = "released=" + (filterReleased || "");
        var completed = "is_completed=" + status;
        var advopts = "advopts=1"; // NOTE not sure what is this
        if (page) {
            advopts += "&page=" + page;
        }
        return {
            src: "/search.php?" + [type, nameMethod,
                mangaName,
                authorMethod, author,
                artistMethod, artist,
                genreFilter,
                releaseMethod, release,
                completed, advopts].join("&")
        };
    };
    return MangaHereFilter;
}());
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
            return "0";
        case exports.FilterStatus.Complete:
            return "1";
        default:
            return "";
    }
}
function yearSearchMethod(condition) {
    switch (condition) {
        case exports.FilterCondition.LessThan:
            return "lt";
        case exports.FilterCondition.GreaterThan:
            return "gt";
        case exports.FilterCondition.Equal:
        default:
            return "eq";
    }
}
function searchMethod(condition) {
    // switch (condition) {
    //     case FilterCondition.Contains:
    //         return "cw";
    //     case FilterCondition.StartsWith:
    //         return "bw";
    //     case FilterCondition.EndsWith:
    //         return "ew";
    //     case FilterCondition.Equal:
    //         return "eq";
    //     case FilterCondition.LessThan:
    //         return "lt";
    //     case FilterCondition.GreaterThan:
    //         return "gt";
    //     default:
    //         return "cw";
    // }
    switch (condition) {
        case exports.FilterCondition.StartsWith:
            return "bw";
        case exports.FilterCondition.EndsWith:
            return "ew";
        case exports.FilterCondition.Contains:
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

var supported = (_a = {},
    _a[exports.Genre.Action] = exports.Genre.Action,
    _a[exports.Genre.Adventure] = exports.Genre.Adventure,
    _a[exports.Genre.Comedy] = exports.Genre.Comedy,
    _a[exports.Genre.Doujinshi] = exports.Genre.Doujinshi,
    _a[exports.Genre.Drama] = exports.Genre.Drama,
    _a[exports.Genre.Ecchi] = exports.Genre.Ecchi,
    _a[exports.Genre.Fantasy] = exports.Genre.Fantasy,
    _a[exports.Genre.GenderBender] = exports.Genre.GenderBender,
    _a[exports.Genre.Harem] = exports.Genre.Harem,
    _a[exports.Genre.Historical] = exports.Genre.Historical,
    _a[exports.Genre.Horror] = exports.Genre.Horror,
    _a[exports.Genre.Josei] = exports.Genre.Josei,
    _a[exports.Genre.MartialArts] = exports.Genre.MartialArts,
    _a[exports.Genre.Mature] = exports.Genre.Mature,
    _a[exports.Genre.Mecha] = exports.Genre.Mecha,
    _a[exports.Genre.Mystery] = exports.Genre.Mystery,
    _a[exports.Genre.Oneshot] = exports.Genre.Oneshot,
    _a[exports.Genre.Psychological] = exports.Genre.Psychological,
    _a[exports.Genre.Romance] = exports.Genre.Romance,
    _a[exports.Genre.SchoolLife] = exports.Genre.SchoolLife,
    _a[exports.Genre.SciFi] = exports.Genre.SciFi,
    _a[exports.Genre.Seinen] = exports.Genre.Seinen,
    _a[exports.Genre.Shoujo] = exports.Genre.Shoujo,
    _a[exports.Genre.ShoujoAi] = exports.Genre.ShoujoAi,
    _a[exports.Genre.Shounen] = exports.Genre.Shounen,
    _a[exports.Genre.ShounenAi] = exports.Genre.ShounenAi,
    _a[exports.Genre.SliceOfLife] = exports.Genre.SliceOfLife,
    _a[exports.Genre.Sports] = exports.Genre.Sports,
    _a[exports.Genre.Supernatural] = exports.Genre.Supernatural,
    _a[exports.Genre.Tragedy] = exports.Genre.Tragedy,
    _a[exports.Genre.Yaoi] = exports.Genre.Yaoi,
    _a[exports.Genre.Yuri] = exports.Genre.Yuri,
    _a);
var ginGenres = (_b = {},
    _b[exports.Genre.Action] = exports.Genre.Action,
    _b[exports.Genre.Adventure] = exports.Genre.Adventure,
    _b[exports.Genre.Comedy] = exports.Genre.Comedy,
    _b[exports.Genre.Doujinshi] = exports.Genre.Doujinshi,
    _b[exports.Genre.Drama] = exports.Genre.Drama,
    _b[exports.Genre.Ecchi] = exports.Genre.Ecchi,
    _b[exports.Genre.Fantasy] = exports.Genre.Fantasy,
    _b[exports.Genre.GenderBender] = exports.Genre.GenderBender,
    _b[exports.Genre.Harem] = exports.Genre.Harem,
    _b[exports.Genre.Historical] = exports.Genre.Historical,
    _b[exports.Genre.Horror] = exports.Genre.Horror,
    _b[exports.Genre.Josei] = exports.Genre.Josei,
    _b[exports.Genre.MartialArts] = exports.Genre.MartialArts,
    _b[exports.Genre.Mature] = exports.Genre.Mature,
    _b[exports.Genre.Mecha] = exports.Genre.Mecha,
    _b[exports.Genre.Mystery] = exports.Genre.Mystery,
    _b[exports.Genre.Oneshot] = "One Shot",
    _b[exports.Genre.Psychological] = exports.Genre.Psychological,
    _b[exports.Genre.Romance] = exports.Genre.Romance,
    _b[exports.Genre.SchoolLife] = exports.Genre.SchoolLife,
    _b[exports.Genre.SciFi] = exports.Genre.SciFi,
    _b[exports.Genre.Seinen] = exports.Genre.Seinen,
    _b[exports.Genre.Shoujo] = exports.Genre.Shoujo,
    _b[exports.Genre.ShoujoAi] = exports.Genre.ShoujoAi,
    _b[exports.Genre.Shounen] = exports.Genre.Shounen,
    _b[exports.Genre.ShounenAi] = exports.Genre.ShounenAi,
    _b[exports.Genre.SliceOfLife] = exports.Genre.SliceOfLife,
    _b[exports.Genre.Sports] = exports.Genre.Sports,
    _b[exports.Genre.Supernatural] = exports.Genre.Supernatural,
    _b[exports.Genre.Tragedy] = exports.Genre.Tragedy,
    _b[exports.Genre.Yaoi] = exports.Genre.Yaoi,
    _b[exports.Genre.Yuri] = exports.Genre.Yuri,
    _b);
var mangaHereGenres = Object.keys(ginGenres)
    .map(function (k) { return ({ k: k, v: ginGenres[k] }); })
    .reduce(function (c, v) {
    c[v.v] = v.k;
    return c;
}, {});
var MangaHereGenre = /** @class */ (function () {
    function MangaHereGenre() {
        this._site = mangaHereGenres;
        this._gin = ginGenres;
        this._supported = supported;
    }
    MangaHereGenre.prototype.fromSiteGenre = function (genre) {
        return this._site[genre];
    };
    MangaHereGenre.prototype.toSiteGenre = function (genre) {
        return this._gin[genre];
    };
    MangaHereGenre.prototype.isSupported = function (genre) {
        return !!this._supported[genre];
    };
    MangaHereGenre.prototype.supported = function () {
        return Object.keys(this._gin);
    };
    return MangaHereGenre;
}());
var _a, _b;

var project = "gin-downloader";
var loggerFactory = function (site) { return ({
    debug: require("debug")([project, site].join(":")),
    verbose: require("debug")([project, site, "verbose"].join(":")),
    error: require("debug")([project, site, "error"].join(":"))
}); };

var mangahereLogger = loggerFactory(exports.MangaSite.MangaHere);

var MangaHereVisitor = /** @class */ (function () {
    function MangaHereVisitor(dependencies) {
        this._config = dependencies.config;
    }
    MangaHereVisitor.prototype.latest = function () {
        var total, latest, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    total = 100;
                    latest = this._config.latestUrl;
                    return [4 /*yield*/, {
                            href: latest,
                            page: 1,
                            total: total
                        }];
                case 1:
                    _a.sent();
                    i = 2;
                    _a.label = 2;
                case 2:
                    if (!(i <= total)) return [3 /*break*/, 5];
                    return [4 /*yield*/, {
                            href: url.resolve(this._config.latestUrl, i.toString()),
                            page: i,
                            total: total
                        }];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    ++i;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    };
    MangaHereVisitor.prototype.mangas = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, {
                        href: this._config.mangasUrl,
                        page: 1,
                        total: 1
                    }];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    return MangaHereVisitor;
}());

var MangaHereConfig = /** @class */ (function () {
    function MangaHereConfig() {
    }
    Object.defineProperty(MangaHereConfig.prototype, "name", {
        get: function () {
            return "MangaHere";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaHereConfig.prototype, "site", {
        get: function () {
            return "http://www.mangahere.cc";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaHereConfig.prototype, "mangasUrl", {
        get: function () {
            return url.resolve(this.site, "/mangalist/");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaHereConfig.prototype, "latestUrl", {
        get: function () {
            return url.resolve(this.site, "/latest/");
        },
        enumerable: true,
        configurable: true
    });
    return MangaHereConfig;
}());

/* LicencedError */
function LicencedError(mangaSite, mangaName) {
    var instance = new Error(mangaSite + " has '" + mangaName + "' licenced.");
    instance.mangaSite = mangaSite;
    instance.mangaName = mangaName;
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, LicencedError);
    }
    return instance;
}
LicencedError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
if (Object.setPrototypeOf) {
    Object.setPrototypeOf(LicencedError, Error);
}
else {
    // LicencedError.__proto__ = Error;
}
/* /LicencedError */
/* ImageNotFoundError */
function ImageNotFoundError(mangaSite, uri, errorId) {
    var instance = new Error("Image not found: " + errorId);
    instance.mangaSite = mangaSite;
    instance.errorId = errorId;
    instance.uri = uri;
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, ImageNotFoundError);
    }
    return instance;
}
ImageNotFoundError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ImageNotFoundError, Error);
}
else {
    // ImageNotFoundError.__proto__ = Error;
}
/* /LicencedError */

var regexLastDigit = /\d+(\.\d{1,3})?$/;
var regexFirstDigit = /\d+(\.\d{1,3})?/;
var lastDigit = function (s) {
    var match = s.match(regexLastDigit);
    if (!match) { // can't be to smart if the last digit is 0
        return null;
    }
    return +match[0];
};
var firstDigit = function (s) {
    var match = s.match(regexFirstDigit);
    if (!match) { // can't be to smart if the last digit is 0
        return null;
    }
    return +match[0];
};
var leftTrim = function (s) {
    return s.replace(/^\s+/, "");
};
String.prototype.lastDigit = function () {
    return lastDigit(this);
};
String.prototype.firstDigit = function () {
    return firstDigit(this);
};
String.prototype.leftTrim = function () {
    return leftTrim(this);
};
String.prototype.decodeEscapeSequence = function () {
    return this.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
        return String.fromCharCode(parseInt(arguments[1], 16));
    });
};
String.prototype.getMatches = function (regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(this)) {
        matches.push(match[index]);
    }
    return matches;
};

var sanitizeChildren = function (children) { return children.filter(function (x) { return x.type !== "text"; }); };

var MangaHereParser = /** @class */ (function () {
    function MangaHereParser(dependencies) {
        this._logger = dependencies.logger;
        this._config = dependencies.config;
        this._genreSite = dependencies.genre;
    }
    MangaHereParser.prototype.mangas = function (mangaRequest) {
        var $, uri, html, elements, elements_1, elements_1_1, item, result, e_1_1, e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $ = mangaRequest.$, uri = mangaRequest.uri, html = mangaRequest.html;
                    this._logger.debug("parsing mangas:\n\turl:%s", uri);
                    this._logger.verbose("parsing mangas:\n\turl:%s\n\thtml:\n%s", uri, html);
                    elements = $(".manga_info").toArray();
                    this._logger.debug("processing %d elements", elements.length);
                    this._logger.verbose("processing elements:\n%j", elements);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    elements_1 = __values(elements), elements_1_1 = elements_1.next();
                    _b.label = 2;
                case 2:
                    if (!!elements_1_1.done) return [3 /*break*/, 5];
                    item = elements_1_1.value;
                    this._logger.verbose("processing element: %j", item);
                    result = {
                        name: item.lastChild.nodeValue,
                        src: url.resolve(this._config.site, item.attribs["href"]),
                    };
                    this._logger.debug("processed with: %o", result);
                    this._logger.verbose("element %j converted to %o", result);
                    return [4 /*yield*/, result];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    elements_1_1 = elements_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    };
    MangaHereParser.prototype.latest = function (mangaRequest) {
        var $, uri, html, elements, elements_2, elements_2_1, item, divChildren, aManga, mangaSrc, mangaName, date, dts, dts_1, dts_1_1, dt, a, src, title, chapNumber, result, e_2_1, e_3_1, e_3, _a, e_2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    $ = mangaRequest.$, uri = mangaRequest.uri, html = mangaRequest.html;
                    this._logger.debug("parsing latest:\n\turl:%s", uri);
                    this._logger.verbose("parsing latest:\n\turl:%s\n\thtml:\n%s", uri, html);
                    elements = $(".manga_updates > dl").toArray();
                    this._logger.debug("processing %d elements", elements.length);
                    this._logger.verbose("processing elements:\n%j", elements);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 12, 13, 14]);
                    elements_2 = __values(elements), elements_2_1 = elements_2.next();
                    _c.label = 2;
                case 2:
                    if (!!elements_2_1.done) return [3 /*break*/, 11];
                    item = elements_2_1.value;
                    this._logger.verbose("processing element: %j", item);
                    divChildren = sanitizeChildren(item.children);
                    aManga = divChildren[0].children.find(function (x) { return x.name === "a"; });
                    mangaSrc = url.resolve(this._config.site, aManga.attribs.href);
                    mangaName = aManga.lastChild.nodeValue;
                    date = divChildren[0].children.find(function (x) { return x.name === "span"; }).lastChild.nodeValue;
                    dts = sanitizeChildren(divChildren.slice(1));
                    this._logger.debug("found [%s] with [%d] chapters", mangaName, dts.length);
                    this._logger.verbose("found [%s] with [%d] chapters", mangaName, dts.length);
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 8, 9, 10]);
                    dts_1 = __values(dts), dts_1_1 = dts_1.next();
                    _c.label = 4;
                case 4:
                    if (!!dts_1_1.done) return [3 /*break*/, 7];
                    dt = dts_1_1.value;
                    this._logger.verbose("processing child element: %j", dt);
                    a = dt.children.find(function (x) { return x.name === "a"; });
                    src = url.resolve(this._config.site, a.attribs.href);
                    title = a.lastChild.nodeValue;
                    chapNumber = lastDigit(title);
                    result = {
                        name: mangaName,
                        src: src,
                        chap_number: chapNumber.toString(),
                        dateAdded: date,
                        mangaSrc: mangaSrc,
                    };
                    this._logger.debug("processed [%s] with: %o", mangaName, result);
                    this._logger.verbose("element %j converted to %o", dt, result);
                    return [4 /*yield*/, result];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    dts_1_1 = dts_1.next();
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_2_1 = _c.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (dts_1_1 && !dts_1_1.done && (_b = dts_1.return)) _b.call(dts_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 10:
                    elements_2_1 = elements_2.next();
                    return [3 /*break*/, 2];
                case 11: return [3 /*break*/, 14];
                case 12:
                    e_3_1 = _c.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 14];
                case 13:
                    try {
                        if (elements_2_1 && !elements_2_1.done && (_a = elements_2.return)) _a.call(elements_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    };
    MangaHereParser.prototype.info = function (mangaRequest) {
        var _this = this;
        var $ = mangaRequest.$, uri = mangaRequest.uri, html = mangaRequest.html;
        this._logger.debug("parsing manga:\n\turl:%s", uri);
        this._logger.verbose("parsing manga:\n\turl:%s\n\thtml:\n%s", uri, html);
        var image = $("img.img").attr("src");
        var title = $("div.title > h3").text().slice(5, -7);
        var li = $(".detail_topText > li").toArray();
        var synonyms = li[2].lastChild.nodeValue.split("; ").map(resolveSynonym);
        var genres = li[3].lastChild.nodeValue.split(", ").map(function (x) { return _this._genreSite.fromSiteGenre(x); });
        var authors = li[4].children.filter(function (x) { return x.name === "a"; }).map(function (x) { return x.lastChild.nodeValue; });
        var artists = li[5].children.filter(function (x) { return x.name === "a"; }).map(function (x) { return x.lastChild.nodeValue; });
        var status = li[6].children[0].next.nodeValue.trim() === "Ongoing"
            ? exports.FilterStatus.Ongoing
            : exports.FilterStatus.Complete;
        var synopsis = li.reverse()[0].children.reverse().find(function (x) { return x.name === "p"; }).children[0].nodeValue;
        var licensed = $("#main > article > div > div.manga_detail > div.detail_list > div > strong").length > 0;
        var result = {
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
        this._logger.debug("processed with: %o", result);
        this._logger.verbose("element %j converted to %o", result);
        return result;
    };
    MangaHereParser.prototype.chapters = function (mangaRequest) {
        var $, uri, html, elements, elements_3, elements_3_1, item, span, li, liChildren, a, date, aText, name, href, chap_number, result, e_4_1, e_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $ = mangaRequest.$, uri = mangaRequest.uri, html = mangaRequest.html;
                    this._logger.debug("parsing chapter:\n\turl:%s", uri);
                    this._logger.verbose("parsing chapter:\n\turl:%s\n\thtml:\n%s", uri, html);
                    elements = $("span.left > a").toArray();
                    this._logger.debug("processing %d elements", elements.length);
                    this._logger.verbose("processing elements:\n%j", elements);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    elements_3 = __values(elements), elements_3_1 = elements_3.next();
                    _b.label = 2;
                case 2:
                    if (!!elements_3_1.done) return [3 /*break*/, 5];
                    item = elements_3_1.value;
                    this._logger.verbose("processing element: %j", item);
                    span = item.parent;
                    li = span.parent;
                    liChildren = sanitizeChildren(li.children);
                    a = item;
                    date = liChildren[liChildren.length - 1].lastChild.nodeValue;
                    aText = a.lastChild.nodeValue.trim();
                    name = (span && span.lastChild.nodeValue) || aText;
                    href = a.attribs.href;
                    chap_number = aText.lastDigit().toString();
                    result = {
                        chap_number: chap_number,
                        name: name,
                        src: url.resolve(this._config.site, href),
                        dateAdded: date
                    };
                    this._logger.debug("processed with: %o", result);
                    this._logger.verbose("element %j converted to %o", item, result);
                    return [4 /*yield*/, result];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    elements_3_1 = elements_3.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (elements_3_1 && !elements_3_1.done && (_a = elements_3.return)) _a.call(elements_3);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    };
    MangaHereParser.prototype.imagesPaths = function (mangaRequest) {
        var $, uri, html, licensed, elements, elements_4, elements_4_1, item, src, name, result, e_5_1, e_5, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    $ = mangaRequest.$, uri = mangaRequest.uri, html = mangaRequest.html;
                    this._logger.debug("parsing images paths:\n\turl:%s", uri);
                    this._logger.verbose("parsing images paths:\n\turl:%s\n\thtml:\n%s", uri, html);
                    licensed = $("body > section > div.mangaread_error > div.mt10.color_ff00.mb10.center > strong").text();
                    if (licensed) {
                        this._logger.debug("Is licensed %s", licensed);
                        this._logger.verbose("Is licensed %s", licensed);
                        throw LicencedError(this._config.name, licensed);
                    }
                    elements = $("body > section.readpage_top > div.go_page.clearfix > span > select > option").toArray();
                    this._logger.debug("processing %d elements", elements.length);
                    this._logger.verbose("processing elements:\n%j", elements);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    elements_4 = __values(elements), elements_4_1 = elements_4.next();
                    _b.label = 2;
                case 2:
                    if (!!elements_4_1.done) return [3 /*break*/, 5];
                    item = elements_4_1.value;
                    this._logger.verbose("processing element: %j", item);
                    src = item.attribs.value;
                    name = item.lastChild.nodeValue;
                    // NOTE mangahere inserts Feature image at the end with 'Ad'
                    if (name === "Featured") {
                        this._logger.debug("skipping [Feature] because is an Ad");
                        this._logger.verbose("skipping [Feature] because is an Ad");
                        return [3 /*break*/, 4];
                    }
                    result = { src: src, name: name };
                    this._logger.debug("processed with: %o", result);
                    this._logger.verbose("element %j converted to %o", item, result);
                    return [4 /*yield*/, result];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    elements_4_1 = elements_4.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_5_1 = _b.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (elements_4_1 && !elements_4_1.done && (_a = elements_4.return)) _a.call(elements_4);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    };
    MangaHereParser.prototype.image = function (mangaRequest) {
        var uri = mangaRequest.uri, html = mangaRequest.html;
        this._logger.debug("parsing image:\n\turl:%s", uri);
        this._logger.verbose("parsing image:\n\turl:%s\n\thtml:\n%s", uri, html);
        var match = html.match(/(?:src=")([^"]*)(?:.*id="image")/m);
        if (!match) {
            this._logger.debug("Image not found, please check if the url is correct and if it works on your browser.");
            this._logger.verbose("Image not found, please check if the url is correct and if it works on your browser.");
            throw ImageNotFoundError(this._config.name, uri, "ADB0");
        }
        var result = match[1];
        this._logger.debug("resolved with: %o", result);
        this._logger.verbose("resolved with: %o", result);
        return result;
    };
    MangaHereParser.prototype.filterPage = function (mangaRequest) {
        var $ = mangaRequest.$, uri = mangaRequest.uri, html = mangaRequest.html;
        this._logger.debug("get filter current page:\n\turl:%s", uri);
        this._logger.verbose("get filter current page:\n\turl:%s\n\thtml:\n%s", uri, html);
        var page = 1;
        var query = url.parse(uri).query;
        if (query) {
            this._logger.verbose("using query to retrieve current page", uri, html);
            var m = query.toString().match(/(?:page=)(\d+)/);
            if (m) {
                this._logger.verbose("page found in query with value %s", m[0]);
                this._logger.verbose("setting page to [%s] with %d", m[1], m[1]);
                page = +m[1];
            }
        }
        else {
            this._logger.verbose("query not found setting page to 1");
        }
        var lastPageElement = $("div.next-page > a").slice(-2, -1);
        this._logger.verbose("resolved last element %j", lastPageElement);
        var lastPage = lastPageElement && lastPageElement[0]
            ? +lastPageElement.text()
            : 1;
        var result = {
            page: page,
            total: lastPage
        };
        this._logger.debug("resolved with: %o", result);
        this._logger.verbose("resolved with: %o", result);
        return result;
    };
    return MangaHereParser;
}());
var regexSynonymLang = /\((.*)\)$/;
var defaultLang = "";
var resolveSynonym = function (dirtyTitle) {
    var match = dirtyTitle.match(regexSynonymLang);
    if (match) {
        var language = match[1];
        var title = dirtyTitle.replace(" " + match[0], "");
        return {
            title: title,
            language: language
        };
    }
    return {
        title: dirtyTitle,
        language: defaultLang,
    };
};

var MangaHereBuilder = /** @class */ (function () {
    function MangaHereBuilder() {
    }
    MangaHereBuilder.prototype.build = function (di) {
        var requestFactory = di.requestFactory;
        if (!requestFactory) {
            throw new Error("Please provide request factory");
        }
        var logger = di.logger || mangahereLogger;
        var genre = di.genre || new MangaHereGenre();
        var config = di.config || new MangaHereConfig();
        var filter = di.filter || new MangaHereFilter({ genre: genre });
        var parser = di.parser || new MangaHereParser({ logger: logger, config: config, genre: genre });
        var visitor = di.visitor || new MangaHereVisitor({ config: config });
        return {
            requestFactory: requestFactory,
            logger: logger,
            genre: genre,
            config: config,
            filter: filter,
            parser: parser,
            visitor: visitor
        };
    };
    return MangaHereBuilder;
}());

var MangaObject = /** @class */ (function () {
    function MangaObject(dependencies, _src, _manga) {
        this._src = _src;
        this._manga = _manga;
        this._chapterResolver = dependencies.chapterResolver;
        this._infoResolver = dependencies.infoResolver;
        this._imageResolver = dependencies.imageResolver;
    }
    Object.defineProperty(MangaObject.prototype, "name", {
        get: function () {
            return this._manga.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaObject.prototype, "status", {
        get: function () {
            return this._manga.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaObject.prototype, "mature", {
        get: function () {
            return this._manga.mature;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaObject.prototype, "image", {
        get: function () {
            return this._manga.image;
        },
        enumerable: true,
        configurable: true
    });
    MangaObject.prototype.manga = function () {
        return __assign({}, this._manga);
    };
    MangaObject.prototype.chapters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chapters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._chapterResolver.chapters(this._src)];
                    case 1:
                        chapters = _a.sent();
                        this._chapters = chapters;
                        return [2 /*return*/, chapters.map(function (x) { return ({
                                chap_number: x.chap_number,
                                volume: x.volume,
                                name: x.name,
                                language: x.language,
                                scanlator: x.scanlator,
                                dateAdded: x.dateAdded,
                                licensed: x.licensed
                            }); })];
                }
            });
        });
    };
    MangaObject.prototype.images = function (chapter) {
        return __awaiter(this, void 0, void 0, function () {
            var chap_number, chapters, chap, src;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chap_number = typeof chapter === "string"
                            ? chapter
                            : typeof chapter === "number"
                                ? chapter.toString()
                                : !!chapter.chap_number
                                    ? chapter.chap_number
                                    : undefined;
                        if (!chap_number) {
                            throw new Error("Invalid chapter provider");
                        }
                        if (!!this._chapters) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.chapters()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        chapters = this._chapters;
                        chap = chapters.find(function (x) { return x.chap_number === chap_number; });
                        if (!chap) {
                            throw new Error("Chapter not found");
                        }
                        src = chap.src;
                        return [2 /*return*/, this._imageResolver.images(src)];
                }
            });
        });
    };
    MangaObject.prototype.info = function () {
        return this._info || (this._info = this._infoResolver.info(this._src));
    };
    return MangaObject;
}());

var sanitizeFilter = function (condition) {
    var search = {};
    var result = { search: search };
    if (condition) {
        if (typeof condition === "string") {
            search.name = sanitizeName(condition);
        }
        else {
            // const ns: filter.Search = (condition && condition.search) || undefined as any;
            search.name = sanitizeName(condition.name);
            if (condition.search) {
                var _a = condition.search, genre = _a.genre, name = _a.name, author = _a.author, artist = _a.artist, released = _a.released, rating = _a.rating, mature = _a.mature, type = _a.type, status = _a.status;
                search.genre = sanitizeGenre(genre);
                /*if (typeof name === "string") {
                    search.name = {
                        name: name as string
                    };
                }


                if (typeof author === "string") {
                    search.author = {
                        name: author as string
                    };
                }
                if (typeof artist === "string") {
                    search.artist = {
                        name: artist as string
                    };
                }
*/
                if (name) {
                    search.name = sanitizeName(name);
                }
                if (author) {
                    search.author = sanitizeName(author);
                }
                if (artist) {
                    search.artist = sanitizeName(artist);
                }
                /*
                                    if (typeof released === "number") {
                                        search.released = {
                                            value: released as number
                                        };
                                    }

                                    if (typeof rating === "number") {
                                        search.rating = {
                                            from: rating as number
                                        };
                                    }
                                    */
                if (released) {
                    search.released = sanitizeReleased(released);
                }
                if (rating) {
                    search.rating = sanitizeRating(rating);
                }
                if (typeof mature === "boolean") {
                    search.mature = mature;
                }
                if (!!exports.Type[type]) {
                    search.type = type;
                }
                if (!!exports.FilterStatus[status]) {
                    search.status = status;
                }
            }
        }
    }
    return result;
};
var sanitizeGenre = function (genre) {
    var result = {
        inGenres: [],
        outGenres: [],
        condition: exports.GenreCondition.And
    };
    if (genre) {
        if (Array.isArray(genre)) { // is array of ['Comedy', 'Action'], as default sets as InGenre
            (_a = result.inGenres).push.apply(_a, __spread(genre));
        }
        else { // if genre is an object
            var g = genre;
            if (!!g.inGenres) {
                if (Array.isArray(g.inGenres)) {
                    // add only valid gin genres
                    (_b = result.inGenres).push.apply(_b, __spread(g.inGenres.filter(isValidGenre)));
                }
                else {
                    var s = g.inGenres.toString();
                    if (isValidGenre(s)) {
                        result.inGenres.push(s);
                    }
                }
            }
            if (!!g.outGenres) {
                if (Array.isArray(g.outGenres)) {
                    // add only valid gin genres
                    (_c = result.outGenres).push.apply(_c, __spread(g.outGenres.filter(isValidGenre)));
                }
                else {
                    var s = g.outGenres.toString();
                    if (isValidGenre(s)) {
                        result.outGenres.push(s);
                    }
                }
            }
        }
        // if genre condition is invalid we set to be GenreCondition.And
        if (exports.GenreCondition[genre.condition]) {
            result.condition = genre.condition;
        }
    }
    return result;
    var _a, _b, _c;
};
var isValidGenre = function (s) { return !!exports.Genre[s]; };
var sanitizeName = function (name) {
    var result = {
        name: "",
        condition: exports.FilterCondition.Contains
    };
    if (typeof name === "string" || typeof name === "object") {
        if (typeof name === "string") {
            result.name = name;
        }
        else {
            if (typeof name.name === "string") {
                result.name = name.name;
            }
            if (!!exports.FilterCondition[name.condition]) {
                result.condition = name.condition;
            }
        }
    }
    return result;
};
var sanitizeRating = function (rating) {
    var result = {};
    if (rating) {
        if (typeof rating === "number") {
            result.from = rating;
        }
        else {
            if (typeof rating === "string" || typeof rating === "object") {
                if (!!rating.from || !rating.to) {
                    var from = +rating.from;
                    var to = +rating.to;
                    if (!isNaN(from)) {
                        result.from = from;
                    }
                    if (!isNaN(to)) {
                        result.to = to;
                    }
                }
                else {
                    var n = +rating; // in case rating is a string convert to number
                    if (!isNaN(n)) {
                        result.from = n;
                    }
                }
            }
        }
    }
    return result;
};
var sanitizeReleased = function (released) {
    var result = {
        value: null,
        condition: exports.FilterCondition.Equal
    };
    if (released) {
        if (typeof released === "number" || typeof released === "string") {
            var value = +released;
            if (!isNaN(value)) {
                result.value = value;
            }
        }
        else {
            if (typeof released === "object") {
                if (released.value) {
                    var value = +released.value;
                    if (!isNaN(value)) {
                        result.value = value;
                    }
                }
                if (released.condition && exports.FilterCondition[released.condition]) {
                    result.condition = released.condition;
                }
            }
        }
    }
    return result;
};

var builder = new MangaHereBuilder();
var MangaHere = /** @class */ (function () {
    function MangaHere(dependencies) {
        var _this = this;
        this.buildManga = function (_a) {
            var src = _a.src, manga = __rest(_a, ["src"]);
            return new MangaObject(_this._resolvers, src, manga);
        };
        var di = builder.build(dependencies);
        this._requestFactory = dependencies.requestFactory;
        this._logger = di.logger;
        this._genre = di.genre;
        this._config = di.config;
        this._filter = di.filter;
        this._parser = di.parser;
        this._visitor = di.visitor;
        this._resolvers = dependencies.resolverFactory.build(di);
    }
    MangaHere.prototype.mangas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pages, pMangas, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pages = Array.from(this._visitor.mangas()).slice(0, 5);
                        pMangas = pages.map(function (x) { return _this._requestFactory.request({ uri: x.href }); })
                            .map(function (r) { return r.then(function (x) { return Array.from(_this._parser.mangas(x)); }); });
                        return [4 /*yield*/, Promise.all(pMangas)];
                    case 1:
                        mangas = _a.sent();
                        // TODO this should return MangaObject!
                        return [2 /*return*/, mangas.reduce(function (c, v) {
                                c.push.apply(c, __spread(v));
                                return c;
                            }, [])
                                .map(this.buildManga)];
                }
            });
        });
    };
    MangaHere.prototype.latest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pages, pMangas, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pages = Array.from(this._visitor.latest()).slice(0, 5);
                        pMangas = pages.map(function (x) { return _this._requestFactory.request({ uri: x.href }); })
                            .map(function (r) { return r.then(function (x) { return Array.from(_this._parser.latest(x)); }); });
                        return [4 /*yield*/, Promise.all(pMangas)];
                    case 1:
                        mangas = _a.sent();
                        // TODO this should return Chapter with MangaObject
                        return [2 /*return*/, mangas.reduce(function (c, v) {
                                c.push.apply(c, __spread(v));
                                return c;
                            }, [])];
                }
            });
        });
    };
    MangaHere.prototype.filter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var f, processed, uri, response, mangas, filterResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        f = sanitizeFilter(filter);
                        processed = this._filter.process(f);
                        uri = url.resolve(this._config.mangasUrl, processed.src);
                        return [4 /*yield*/, this._requestFactory.request({ uri: uri, qs: processed.params })];
                    case 1:
                        response = _a.sent();
                        mangas = Array.from(this._parser.mangas(response)).map(this.buildManga);
                        filterResult = this._parser.filterPage(response);
                        return [2 /*return*/, __assign({}, filterResult, { results: mangas })];
                }
            });
        });
    };
    return MangaHere;
}());

var requestRetry = require("requestretry");
// specific options for requestretry lib
var DefaultOptions = {
    retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError,
    fullResponse: true
};
var maxAttempts = 20, retryDelay = 300;
// retries if the request fails
var RequestRetryStrategy = /** @class */ (function () {
    function RequestRetryStrategy(_maxAttempts, _retryDelay) {
        if (_maxAttempts === void 0) { _maxAttempts = maxAttempts; }
        if (_retryDelay === void 0) { _retryDelay = retryDelay; }
        this._maxAttempts = _maxAttempts;
        this._retryDelay = _retryDelay;
    }
    RequestRetryStrategy.prototype.request = function (options) {
        var opts = __assign({}, options, DefaultOptions, { maxAttempts: this._maxAttempts, retryDelay: this._retryDelay });
        return requestRetry(opts);
    };
    return RequestRetryStrategy;
}());

var MangaRequestResult = /** @class */ (function () {
    function MangaRequestResult(_uri, _html) {
        this._uri = _uri;
        this._html = _html;
    }
    Object.defineProperty(MangaRequestResult.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaRequestResult.prototype, "html", {
        get: function () {
            return this._html;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MangaRequestResult.prototype, "$", {
        get: function () {
            return this._$ || (this._$ = cheerio.load(this.html));
        },
        enumerable: true,
        configurable: true
    });
    return MangaRequestResult;
}());

var ConcurrentQueueRequestFactory = /** @class */ (function () {
    function ConcurrentQueueRequestFactory(_requestStrategy, _queue) {
        this._requestStrategy = _requestStrategy;
        this._queue = _queue;
    }
    ConcurrentQueueRequestFactory.prototype.request = function (options) {
        var _this = this;
        return this._queue.add(function () { return _this._requestStrategy.request(options)
            .then(function (response) { return new MangaRequestResult(options.uri.toString(), response.body.toString()); }); });
    };
    return ConcurrentQueueRequestFactory;
}());

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

var ImageResolver = /** @class */ (function () {
    function ImageResolver(dependencies) {
        this._parser = dependencies.parser;
        this._config = dependencies.config;
        this._requestFactory = dependencies.requestFactory;
    }
    ImageResolver.prototype.images = function (chapterSrc) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var href, result, paths, src, promises, promiseRequest, _loop_1, paths_1, paths_1_1, it_1, e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        href = url.resolve(this._config.site, chapterSrc).toString();
                        return [4 /*yield*/, this._requestFactory.request({ uri: href })];
                    case 1:
                        result = _b.sent();
                        paths = this._parser.imagesPaths(result);
                        paths.next(); // skip first, because we requested that already
                        src = this._parser.image(result);
                        promises = [
                            new Lazy(function () { return Promise.resolve({
                                name: url.parse(src).pathname.split("/").reverse()[0],
                                src: src
                            }); })
                        ];
                        promiseRequest = function (s) { return __awaiter(_this, void 0, void 0, function () {
                            var h, result, src;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        h = url.resolve(href, s).toString();
                                        return [4 /*yield*/, this._requestFactory.request({ uri: h })];
                                    case 1:
                                        result = _a.sent();
                                        src = this._parser.image(result);
                                        return [2 /*return*/, {
                                                name: url.parse(src).pathname.split("/").reverse()[0],
                                                src: src
                                            }];
                                }
                            });
                        }); };
                        _loop_1 = function (it_1) {
                            promises.push(new Lazy(function () { return promiseRequest(it_1.src); }));
                        };
                        try {
                            for (paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                                it_1 = paths_1_1.value;
                                _loop_1(it_1);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, promises];
                }
            });
        });
    };
    return ImageResolver;
}());

var ChapterResolver = /** @class */ (function () {
    function ChapterResolver(dependencies) {
        this._parser = dependencies.parser;
        this._requestFactory = dependencies.requestFactory;
    }
    ChapterResolver.prototype.chapters = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._requestFactory.request({ uri: src })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Array.from(this._parser.chapters(result))];
                }
            });
        });
    };
    return ChapterResolver;
}());

var InfoResolver = /** @class */ (function () {
    function InfoResolver(dependencies) {
        this._parser = dependencies.parser;
        this._config = dependencies.config;
        this._requestFactory = dependencies.requestFactory;
    }
    InfoResolver.prototype.info = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this._requestFactory.request({ uri: src })
                        .then(function (x) { return _this._parser.info(x); })];
            });
        });
    };
    return InfoResolver;
}());

var DefaultResolverFactory = /** @class */ (function () {
    function DefaultResolverFactory() {
    }
    DefaultResolverFactory.prototype.build = function (di) {
        var imageResolver = new ImageResolver(di);
        var chapterResolver = new ChapterResolver(di);
        var infoResolver = new InfoResolver(di);
        return {
            imageResolver: imageResolver,
            chapterResolver: chapterResolver,
            infoResolver: infoResolver,
        };
    };
    return DefaultResolverFactory;
}());

var Queue = require("promise-queue");
var GinBuilder = /** @class */ (function () {
    function GinBuilder(dependencies) {
        if (dependencies === void 0) { dependencies = {}; }
        this._requestStrategy = new RequestRetryStrategy();
        this._resolverFactory = new DefaultResolverFactory();
        this._requestFactory = new ConcurrentQueueRequestFactory(this._requestStrategy, new Queue(3));
        this._mangaHereBuilder = new MangaHereBuilder();
    }
    Object.defineProperty(GinBuilder.prototype, "mangahere", {
        get: function () {
            return this._mangahere || (this._mangahere = this.buildMangaHere());
        },
        enumerable: true,
        configurable: true
    });
    GinBuilder.prototype.buildMangaHere = function () {
        return new MangaHere({ requestFactory: this._requestFactory, resolverFactory: this._resolverFactory });
    };
    return GinBuilder;
}());

var gindownloader = new GinBuilder();

exports.gindownloader = gindownloader;
exports.GinBuilder = GinBuilder;

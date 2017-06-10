'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cheerio = require('cheerio');
var _ = require('lodash');
var url = require('url');
var vm = require('vm');
var util = require('util');

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
String.prototype.getMatches = function (regex, index) {
    index || (index = 1);
    var matches = [];
    var match;
    while (match = regex.exec(this)) {
        matches.push(match[index]);
    }
    return matches;
};
var Genre;
(function (Genre) {
    Genre[Genre["Action"] = "Action"] = "Action";
    Genre[Genre["Adult"] = "Adult"] = "Adult";
    Genre[Genre["Adventure"] = "Adventure"] = "Adventure";
    Genre[Genre["AwardWinning"] = "Award Winning"] = "AwardWinning";
    Genre[Genre["Comedy"] = "Comedy"] = "Comedy";
    Genre[Genre["Comic"] = "Comic"] = "Comic";
    Genre[Genre["Cooking"] = "Cooking"] = "Cooking";
    Genre[Genre["Demons"] = "Demons"] = "Demons";
    Genre[Genre["Doujinshi"] = "Doujinshi"] = "Doujinshi";
    Genre[Genre["Drama"] = "Drama"] = "Drama";
    Genre[Genre["Ecchi"] = "Ecchi"] = "Ecchi";
    Genre[Genre["Fantasy"] = "Fantasy"] = "Fantasy";
    Genre[Genre["FourKoma"] = "4-Koma"] = "FourKoma";
    Genre[Genre["GenderBender"] = "Gender Bender"] = "GenderBender";
    Genre[Genre["Harem"] = "Harem"] = "Harem";
    Genre[Genre["Historical"] = "Historical"] = "Historical";
    Genre[Genre["Horror"] = "Horror"] = "Horror";
    Genre[Genre["Josei"] = "Josei"] = "Josei";
    Genre[Genre["Lolicon"] = "Lolicon"] = "Lolicon";
    Genre[Genre["Magic"] = "Magic"] = "Magic";
    Genre[Genre["Manga"] = "Manga"] = "Manga";
    Genre[Genre["Manhua"] = "Manhua"] = "Manhua";
    Genre[Genre["Manhwa"] = "Manhwa"] = "Manhwa";
    Genre[Genre["MartialArts"] = "Martial Arts"] = "MartialArts";
    Genre[Genre["Mature"] = "Mature"] = "Mature";
    Genre[Genre["Mecha"] = "Mecha"] = "Mecha";
    Genre[Genre["Medical"] = "Medical"] = "Medical";
    Genre[Genre["Military"] = "Military"] = "Military";
    Genre[Genre["Music"] = "Music"] = "Music";
    Genre[Genre["Mystery"] = "Mystery"] = "Mystery";
    Genre[Genre["Oneshot"] = "Oneshot"] = "Oneshot";
    Genre[Genre["Psychological"] = "Psychological"] = "Psychological";
    Genre[Genre["Romance"] = "Romance"] = "Romance";
    Genre[Genre["SchoolLife"] = "School Life"] = "SchoolLife";
    Genre[Genre["SciFi"] = "Sci-fi"] = "SciFi";
    Genre[Genre["Seinen"] = "Seinen"] = "Seinen";
    Genre[Genre["Shotacon"] = "Shotacon"] = "Shotacon";
    Genre[Genre["Shoujo"] = "Shoujo"] = "Shoujo";
    Genre[Genre["ShoujoAi"] = "Shoujo Ai"] = "ShoujoAi";
    Genre[Genre["Shounen"] = "Shounen"] = "Shounen";
    Genre[Genre["ShounenAi"] = "Shounen Ai"] = "ShounenAi";
    Genre[Genre["SliceOfLife"] = "Slice of Life"] = "SliceOfLife";
    Genre[Genre["Smut"] = "Smut"] = "Smut";
    Genre[Genre["Sports"] = "Sports"] = "Sports";
    Genre[Genre["Supernatural"] = "Supernatural"] = "Supernatural";
    Genre[Genre["SuperPower"] = "SuperPower"] = "SuperPower";
    Genre[Genre["Tragedy"] = "Tragedy"] = "Tragedy";
    Genre[Genre["Vampire"] = "Vampire"] = "Vampire";
    Genre[Genre["Webtoon"] = "Webtoon"] = "Webtoon";
    Genre[Genre["Yaoi"] = "Yaoi"] = "Yaoi";
    Genre[Genre["Yuri"] = "Yuri"] = "Yuri";
    Genre[Genre["NoChapters"] = "[no chapters]"] = "NoChapters";
})(Genre || (Genre = {}));
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
    FilterStatus[FilterStatus["Ongoing"] = "Ongoing"] = "Ongoing";
    FilterStatus[FilterStatus["Complete"] = "Complete"] = "Complete";
    FilterStatus[FilterStatus["Cancelled"] = "Cancelled"] = "Cancelled";
})(FilterStatus || (FilterStatus = {}));
var FilterMangaType;
(function (FilterMangaType) {
    FilterMangaType[FilterMangaType["Manga"] = 0] = "Manga";
    FilterMangaType[FilterMangaType["Manhwa"] = 1] = "Manhwa";
    FilterMangaType[FilterMangaType["Manhua"] = 2] = "Manhua";
    FilterMangaType[FilterMangaType["Comic"] = 3] = "Comic";
    FilterMangaType[FilterMangaType["Artbook"] = 4] = "Artbook";
    FilterMangaType[FilterMangaType["Other"] = 5] = "Other";
})(FilterMangaType || (FilterMangaType = {}));

var parseDoc = function (source, params) {
    if (params === void 0) { params = undefined; }
    var doc = cheerio.load(source);
    doc.location = params && params.location;
    return doc;
};
var sanitize = function (children) { return children.filter(function (x) { return x.type !== "text"; }); };

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var debug$1 = require("debug")("gin-downloader:request");
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
        var opts = { url: "", method: method, body: params };
        if (typeof uri === "string") {
            opts.url = uri;
        }
        else {
            opts = __assign({}, opts, uri);
            opts.headers = __assign({}, this.headers, opts.headers);
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
        return this.getHtml(opts).then(function (x) { return parseDoc(x, { location: opts.url || opts }); });
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
            .then(function (x) { return parseDoc(x, { location: opts.url || opts }); });
    };
    return GinRequest;
}());

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _$$1 = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_$$1) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _$$1.label++; return { value: op[1], done: false };
                case 5: _$$1.label++; y = op[1]; op = [0]; continue;
                case 7: op = _$$1.ops.pop(); _$$1.trys.pop(); continue;
                default:
                    if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _$$1 = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _$$1.label = op[1]; break; }
                    if (op[0] === 6 && _$$1.label < t[1]) { _$$1.label = t[1]; t = op; break; }
                    if (t && _$$1.label < t[2]) { _$$1.label = t[2]; _$$1.ops.push(op); break; }
                    if (t[2]) _$$1.ops.pop();
                    _$$1.trys.pop(); continue;
            }
            op = body.call(thisArg, _$$1);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var debug = require("debug");
var MangaSite = (function () {
    function MangaSite(config, parser, nameHelper, strategy) {
        this.debug = debug("gin-downloader:" + config.name);
        this.verbose = debug("gin-downloader:" + config.name + ":verbose");
        this._config = config;
        this._nameHelper = nameHelper;
        this._parser = parser;
        this._request = new GinRequest(strategy);
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
    Object.defineProperty(MangaSite.prototype, "request", {
        get: function () {
            return this._request;
        },
        enumerable: true,
        configurable: true
    });
    MangaSite.prototype.mangas = function () {
        return __awaiter$1(this, void 0, void 0, function () {
            var opts, mangas;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("getting mangas");
                        opts = this.buildMangasRequest(this.config.mangas_url);
                        return [4 /*yield*/, this.request.getDoc(opts)
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
        return __awaiter$1(this, void 0, void 0, function () {
            var opts, mangas;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("getting latest");
                        opts = this.buildLatestRequest(this.config.latest_url);
                        return [4 /*yield*/, this.request.getDoc(opts).then(this.parser.latest)];
                    case 1:
                        mangas = _a.sent();
                        this.verbose("got " + mangas.length + " chapters");
                        return [2 /*return*/, mangas];
                }
            });
        });
    };
    MangaSite.prototype.info = function (name) {
        return __awaiter$1(this, void 0, void 0, function () {
            var src, opts, info, e_1;
            return __generator$1(this, function (_a) {
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
                        return [4 /*yield*/, this.request.getDoc(opts).then(this.parser.info)];
                    case 3:
                        info = _a.sent();
                        this.verbose("info:%o", info);
                        this.debug("got info for " + name);
                        return [2 /*return*/, info];
                    case 4:
                        e_1 = _a.sent();
                        this.debug(e_1);
                        throw new Error(name + " not found!");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.chapters = function (name) {
        return __awaiter$1(this, void 0, void 0, function () {
            var src, opts, chapters, e_2;
            return __generator$1(this, function (_a) {
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
                        return [4 /*yield*/, this.request.getDoc(opts).then(this.parser.chapters)];
                    case 3:
                        chapters = _a.sent();
                        this.verbose("chapters:%o", chapters);
                        this.debug("got chapters for " + name);
                        return [2 /*return*/, chapters];
                    case 4:
                        e_2 = _a.sent();
                        this.debug(e_2);
                        throw new Error(name + " not found!");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.infoChapters = function (name) {
        return __awaiter$1(this, void 0, void 0, function () {
            var src, opts, doc, info, chapters, e_3;
            return __generator$1(this, function (_a) {
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
                        return [4 /*yield*/, this.request.getDoc(opts)];
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
                        return [2 /*return*/, { info: info, chapters: chapters }];
                    case 6:
                        e_3 = _a.sent();
                        this.debug(e_3);
                        throw new Error(name + " not found!");
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.images = function (name, chapter) {
        return __awaiter$1(this, void 0, void 0, function () {
            var _this = this;
            var chap, opts, paths;
            return __generator$1(this, function (_a) {
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
                        return [4 /*yield*/, this.request.getDoc(opts).then(this.parser.imagesPaths)];
                    case 2:
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
    MangaSite.prototype.getHtml = function (url$$1) {
        return this.request.getHtml(url$$1);
    };
    MangaSite.prototype.getDoc = function (url$$1) {
        return this.request.getDoc(url$$1);
    };
    MangaSite.prototype.postDoc = function (url$$1, params) {
        return this.request.postDoc(url$$1, params);
    };
    MangaSite.prototype.resolveChapterSource = function (name, chapter) {
        return __awaiter$1(this, void 0, void 0, function () {
            var chapters, chap;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chapters(name)];
                    case 1:
                        chapters = _a.sent();
                        chap = _.find(chapters, { chap_number: chapter });
                        this.verbose("filtered chapters %o", chap);
                        if (!chap) {
                            throw new Error("Chapter not found");
                        }
                        return [2 /*return*/, chap.src];
                }
            });
        });
    };
    MangaSite.prototype.processImagePath = function (opts) {
        return __awaiter$1(this, void 0, void 0, function () {
            var image;
            return __generator$1(this, function (_a) {
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
        });
    };
    return MangaSite;
}());

var site = "http://mangafox.me";
var config = {
    name: "MangaFox",
    site: site,
    mangas_url: url.resolve(site, "/manga/"),
    latest_url: url.resolve(site, "/releases/")
};
var debug$2 = require("debug")("gin-downloader:mangafox");
var verbose$1 = require("debug")("gin-downloader:mangafox:verbose");
verbose$1("using %O", config);

var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var mangas = [];
        $(".series_preview").each(function (i, el) {
            mangas[i] = {
                name: el.children[0].data,
                src: el.attribs["href"],
                status: el.attribs.class.indexOf("manga_open") >= 0
                    ? FilterStatus.Ongoing.toString()
                    : FilterStatus.Complete.toString()
            };
        });
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        $("#updates > li > div").each(function (i, el) {
            var divChildren = sanitize(el.children);
            var aManga = sanitize(divChildren[0].children)[0];

            var mangaName = aManga.lastChild.nodeValue;
            var dts = sanitize(divChildren[1].children);
            for (var _i = 0, dts_1 = dts; _i < dts_1.length; _i++) {
                var dt = dts_1[_i];
                var children = sanitize(dt.children);
                var date = children[0].lastChild.nodeValue;
                var a = children[1].children.find(function (x) { return x.name === "a"; });
                var src = a.attribs.href;
                var title = a.lastChild.nodeValue;
                var volume = a.next.type === "text" && a.next.nodeValue.trim().slice(1);
                var chapNumber = title.lastDigit();
                chapters.push({
                    name: mangaName,
                    src: src,
                    volume: volume,
                    chap_number: chapNumber,
                    dateAdded: date
                });
            }
        });
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var imgElem = $("div .cover img");
        var titleElem = $("#title");
        var seriesInfo = $("#series_info");
        var image = imgElem.attr("src");
        var title = imgElem.attr("alt");
        var synonyms = titleElem.find("h3").text().split("; ");
        var released = titleElem.find("table tr td a").first().text();
        var authors = [titleElem.find("table tr td a").eq(1).text()];
        var artists = [titleElem.find("table tr td a").eq(2).text()];
        var genres = titleElem.find("table tr td a").slice(3).map(function (i, el) { return el.children[0].nodeValue; }).get();
        var sSstatus = seriesInfo.find("div .data span").eq(0).html().trim();
        var status = sSstatus.slice(0, sSstatus.indexOf(","));
        var ranked = seriesInfo.find("div .data span").eq(2).text();
        var rating = seriesInfo.find("div .data span").eq(3).text();
        var scanlators = seriesInfo.find("div.data span a").slice(1).map(function (i, el) { return el.children[0].nodeValue; }).get();
        var synopsis = titleElem.find("p").text();
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            released: released,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
            ranked: ranked,
            rating: rating,
            scanlators: scanlators
        };
    };
    Parser.prototype.chapters = function ($) {
        var chapters = [];
        $(".chlist > li > div").each(function (i, el) {

            var children = sanitize(el.children);
            var date = children[0].lastChild.nodeValue;
            var h3Children = sanitize(children[children.length - 1].children);
            var a = h3Children[0];
            var span = h3Children.length > 1 && h3Children[1];

            var volume;
            var slide = el.parent.parent.prev;
            if (slide) {
                volume = sanitize(slide.children)[1].children[0].nodeValue;
            }
            chapters.push(Parser.parseChapter(a, span, volume, date));
        });
        return chapters;
    };
    Parser.parseChapter = function (a, span, volume, date) {
        var aText = a.lastChild.nodeValue;
        var name = (span || a).lastChild.nodeValue;
        var href = a.attribs.href;
        return {
            chap_number: aText.lastDigit(),
            name: name,
            src: url.resolve(config.site, href),
            volume: volume,
            dateAdded: date
        };
    };
    Parser.prototype.imagesPaths = function ($) {
        var paths = [];
        $("#top_bar > div > div > select > option").slice(0, -1).each(function (i, el) {
            paths[i] = url.resolve($.location, el.attribs.value + ".html");
        });
        return paths;
    };
    Parser.prototype.image = function (html) {
        var __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
        var __img__ = /src=".*\?token[^"]*/gmi;
        var m = html.match(__imgID__);
        if (!m || m.length === 0) {
            throw new Error("Image not found");
        }
        m = m[0].match(__img__);
        if (!m || m.length === 0) {
            throw new Error("Image not found");
        }
        return m[0].slice(5);
    };
    Parser.prototype.filter = function ($) {
        var lastPageElement = $("#nav > ul > li > a").slice(-2, -1);
        var mangas = [];
        $(".manga_text").each(function (i, el) {
            var children = sanitize(el.children);
            var a = children.find(function (x) { return x.name === "a"; });
            var info = children.find(function (x) { return x.name === "p" && x.attribs && !!x.attribs.title; });
            var parentA = sanitize(el.parent.children)[0];
            var completed = sanitize(parentA.children).find(function (x) { return x.name === "em" && x.attribs && x.attribs.class === "tag_completed"; });
            mangas[i] = {
                name: a.lastChild.nodeValue,
                src: a.attribs.href,
                mature: info.attribs.title.indexOf("Mature") >= 0,
                status: completed ? FilterStatus.Complete.toString() : FilterStatus.Ongoing.toString(),
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
        var lastPage = 1;
        if (lastPageElement) {
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
var parser = new Parser();

var noCase = require("no-case");
var names = {
    "Renai Tsuu -Akka-": "renaitsuu_akka",
    "Tarepanda Goes on an Adventure": "tarepanda_goes_on_adventure",
};
var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        if (names.hasOwnProperty(name)) {
            return names[name];
        }
        return noCase(name.toLowerCase(), null, "_");
    };
    Helper.prototype.resolveUrl = function (name) {
        return url.resolve(config.mangas_url, this.toName(name) + "/");
    };
    return Helper;
}());
var helper = new Helper();

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var requestRetry = require("requestretry");
var MaxRetries = 50;
var Timeout = 20000;
var Interval = 30 + Timeout;
var DefaultOptions = {
    method: "GET",
    gzip: true,
    timeout: Timeout,
    followAllRedirects: true,
    jar: true,
    forever: true,

    maxAttempts: MaxRetries,
    retryDelay: Interval,
    retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError,
    fullResponse: false,
};
var RequestRetryStrategy = (function () {
    function RequestRetryStrategy() {
    }
    RequestRetryStrategy.prototype.request = function (options) {
        var opts = __assign$1({}, DefaultOptions);
        if (typeof options === "string") {
            opts.url = options;
        }
        else {
            opts = __assign$1({}, opts, options);
        }
        return requestRetry(opts);
    };
    return RequestRetryStrategy;
}());
var strategy = new RequestRetryStrategy();

var Supported = {};
Supported[Genre.Action] = Genre.Action;
Supported[Genre.Adult] = Genre.Adult;
Supported[Genre.Adventure] = Genre.Adventure;
Supported[Genre.Comedy] = Genre.Comedy;
Supported[Genre.Doujinshi] = Genre.Doujinshi;
Supported[Genre.Drama] = Genre.Drama;
Supported[Genre.Ecchi] = Genre.Ecchi;
Supported[Genre.Fantasy] = Genre.Fantasy;
Supported[Genre.GenderBender] = Genre.GenderBender;
Supported[Genre.Harem] = Genre.Harem;
Supported[Genre.Historical] = Genre.Historical;
Supported[Genre.Horror] = Genre.Horror;
Supported[Genre.Josei] = Genre.Josei;
Supported[Genre.MartialArts] = Genre.MartialArts;
Supported[Genre.Mature] = Genre.Mature;
Supported[Genre.Mecha] = Genre.Mecha;
Supported[Genre.Mystery] = Genre.Mystery;
Supported[Genre.Oneshot] = Genre.Oneshot;
Supported[Genre.Psychological] = Genre.Psychological;
Supported[Genre.Romance] = Genre.Romance;
Supported[Genre.SchoolLife] = Genre.SchoolLife;
Supported[Genre.SciFi] = Genre.SciFi;
Supported[Genre.Seinen] = Genre.Seinen;
Supported[Genre.Shoujo] = Genre.Shoujo;
Supported[Genre.ShoujoAi] = Genre.ShoujoAi;
Supported[Genre.Shounen] = Genre.Shounen;
Supported[Genre.ShounenAi] = Genre.ShounenAi;
Supported[Genre.SliceOfLife] = Genre.SliceOfLife;
Supported[Genre.Smut] = Genre.Smut;
Supported[Genre.Sports] = Genre.Sports;
Supported[Genre.Supernatural] = Genre.Supernatural;
Supported[Genre.Tragedy] = Genre.Tragedy;
Supported[Genre.Webtoon] = Genre.Webtoon;
Supported[Genre.Yaoi] = Genre.Yaoi;
Supported[Genre.Yuri] = Genre.Yuri;
var correctName = {};
correctName[Genre.Adult] = Genre.Adult.toString();
correctName[Genre.Action] = Genre.Action.toString();
correctName[Genre.Adventure] = Genre.Adventure.toString();
correctName[Genre.Comedy] = Genre.Comedy.toString();
correctName[Genre.Doujinshi] = Genre.Doujinshi.toString();
correctName[Genre.Drama] = Genre.Drama.toString();
correctName[Genre.Ecchi] = Genre.Ecchi.toString();
correctName[Genre.Fantasy] = Genre.Fantasy.toString();
correctName[Genre.GenderBender] = "Gender Bender";
correctName[Genre.Harem] = Genre.Harem.toString();
correctName[Genre.Historical] = Genre.Historical.toString();
correctName[Genre.Horror] = Genre.Horror.toString();
correctName[Genre.Josei] = Genre.Josei.toString();
correctName[Genre.MartialArts] = "Martial Arts";
correctName[Genre.Mature] = Genre.Mature.toString();
correctName[Genre.Mecha] = Genre.Mecha.toString();
correctName[Genre.Mystery] = Genre.Mystery.toString();
correctName[Genre.Oneshot] = "One Shot";
correctName[Genre.Psychological] = Genre.Psychological.toString();
correctName[Genre.Romance] = Genre.Romance.toString();
correctName[Genre.SchoolLife] = Genre.SchoolLife.toString();
correctName[Genre.SciFi] = "Sci-fi";
correctName[Genre.Seinen] = Genre.Seinen.toString();
correctName[Genre.Shoujo] = Genre.Shoujo.toString();
correctName[Genre.ShoujoAi] = "Shoujo Ai";
correctName[Genre.Shounen] = Genre.Shounen.toString();
correctName[Genre.ShounenAi] = "Shounen Ai";
correctName[Genre.SliceOfLife] = "Slice of Life";
correctName[Genre.Smut] = Genre.Smut.toString();
correctName[Genre.Sports] = Genre.Sports.toString();
correctName[Genre.Supernatural] = Genre.Supernatural.toString();
correctName[Genre.Tragedy] = Genre.Tragedy.toString();
correctName[Genre.Webtoon] = "Webtoons";
correctName[Genre.Yaoi] = Genre.Yaoi.toString();
correctName[Genre.Yuri] = Genre.Yuri.toString();
var processFilter = function (filter) {
    filter = filter || {};
    var genres = filter.genres, outGenres = filter.outGenres, search = filter.search, page = filter.page;
    var filterType = null;
    var filterName = filter.name;
    var filterAuthor = null;
    var filterArtist = null;
    var filterReleased = null;
    var filterRating = null;
    var status = null;
    var methodName = "cw";
    var methodAuthor = "cw";
    var methodArtist = "cw";
    var methodReleased = "eq";
    var methodRating = "eq";
    if (search) {
        var name_1 = search.name, author_1 = search.author, artist_1 = search.artist, rating_1 = search.rating, released = search.released, type_1 = search.type;
        filterType = resolveType(type_1) || filterType;
        if (name_1) {
            filterName = name_1.name || filterName;
            methodName = searchMethod(name_1.condition) || methodName;
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
        if (rating_1) {

            filterRating = rating_1 || filterRating;

        }
        if (released) {
            filterReleased = released.value || filterReleased;
            methodReleased = searchMethod(released.condition) || methodReleased;
        }
    }
    var nameMethod = "name_method=" + methodName;
    var mangaName = "name=" + (filterName || "");
    var type = "type=" + (filterType || "");
    var authorMethod = "author_method=" + methodAuthor;
    var author = "author=" + (filterAuthor || "");
    var artistMethod = "artist_method=" + methodArtist;
    var artist = "artist=" + (filterArtist || "");
    var genreFilter = _.map(Supported, function (x) { return "genres%5B" + correctName[x].replace(/ /g, "+") + "%5D=" + inOutGenre(x, genres, outGenres); }).join("&");
    var releaseMethod = "released_method=" + methodReleased;
    var release = "released=" + (filterReleased || "");
    var rating_method = "rating_method=" + methodRating;
    var rating = "rating=" + (filterRating || "");
    var completed = "is_completed=" + (resolveStatus(status) || "");
    var advopts = "advopts=1";
    if (page) {
        advopts += "&page=" + page;
    }
    return { src: url.resolve(config.site, "/search.php"),
        params: [nameMethod, mangaName,
            type,
            authorMethod, author,
            artistMethod, artist,
            genreFilter,
            releaseMethod, release,
            rating_method, rating,
            completed, advopts].join("&")
    };
};
function resolveType(type) {
    switch (type) {
        case FilterMangaType.Manga:
            return 1;
        case FilterMangaType.Manhwa:
            return 2;
        case FilterMangaType.Manhua:
            return 3;
        default:
            return null;
    }
}
function resolveStatus(status) {
    switch (status) {
        case FilterStatus.Ongoing:
            return 0;
        case FilterStatus.Complete:
            return 1;
        default:
            return null;
    }
}
function searchMethod(condition) {
    switch (condition) {
        case FilterCondition.Contains:
            return "cw";
        case FilterCondition.StartsWith:
            return "bw";
        case FilterCondition.EndsWith:
            return "ew";
        case FilterCondition.Equal:
            return "eq";
        case FilterCondition.LessThan:
            return "lt";
        case FilterCondition.GreaterThan:
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

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _$$1 = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_$$1) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _$$1.label++; return { value: op[1], done: false };
                case 5: _$$1.label++; y = op[1]; op = [0]; continue;
                case 7: op = _$$1.ops.pop(); _$$1.trys.pop(); continue;
                default:
                    if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _$$1 = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _$$1.label = op[1]; break; }
                    if (op[0] === 6 && _$$1.label < t[1]) { _$$1.label = t[1]; t = op; break; }
                    if (t && _$$1.label < t[2]) { _$$1.label = t[2]; _$$1.ops.push(op); break; }
                    if (t[2]) _$$1.ops.pop();
                    _$$1.trys.pop(); continue;
            }
            op = body.call(thisArg, _$$1);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MangaFox = (function (_super) {
    __extends(MangaFox, _super);
    function MangaFox() {
        return _super.call(this, config, new Parser, new Helper(), strategy) || this;
    }
    MangaFox.prototype.filter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var search, doc, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("filter mangas with: %o", filter);
                        search = processFilter(filter);
                        return [4 /*yield*/, this.request.getDoc(search.src + "?" + search.params)];
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
    return MangaFox;
}(MangaSite));
var manga = new MangaFox();

var site$1 = "http://www.mangahere.co";
var config$2 = {
    name: "MangaHere",
    site: site$1,
    mangas_url: url.resolve(site$1, "/mangalist/"),
    latest_url: url.resolve(site$1, "/latest/")
};
var debug$3 = require("debug")("gin-downloader:mangahere");
var verbose$2 = require("debug")("gin-downloader:mangahere:verbose");
verbose$2("using %O", config$2);

var Parser$1 = (function () {
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
                    chap_number: chapNumber,
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
        var synonyms = li[2].lastChild.nodeValue.split("; ");
        var genres = li[3].lastChild.nodeValue.split(", ");
        var authors = li[4].children.filter(function (x) { return x.name === "a"; }).map(function (x) { return x.lastChild.nodeValue; });
        var artists = li[5].children.filter(function (x) { return x.name === "a"; }).map(function (x) { return x.lastChild.nodeValue; });
        var status = li[6].children[0].next.nodeValue.trim() === "Ongoing"
            ? FilterStatus.Ongoing.toString()
            : FilterStatus.Complete.toString();
        var synopsis = li.reverse()[0].children.reverse().find(function (x) { return x.name == "p"; }).children[0].nodeValue;
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
        };
    };
    Parser.prototype.chapters = function ($) {
        var chapters = [];
        $("span.left > a").each(function (i, el) {
            var span = el.parent;
            var li = span.parent;
            var date = sanitize(li.children).reverse()[0].lastChild.nodeValue;
            var a = el;
            chapters.push(Parser.parseChapter(a, span, date));
        });
        return chapters;
    };
    Parser.parseChapter = function (a, span, date) {
        var aText = a.lastChild.nodeValue.trim();
        var name = (span && span.lastChild.nodeValue) || aText;
        var href = a.attribs.href;
        return {
            chap_number: aText.lastDigit(),
            name: name,
            src: url.resolve(config$2.site, href),
            dateAdded: date
        };
    };
    Parser.prototype.imagesPaths = function ($) {
        var paths = [];
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
            throw new Error("Image not found");
        }
        m = m[0].match(__img__);
        if (!m || m.length === 0) {
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
var parser$2 = new Parser$1();

var noCase$1 = require("no-case");
var Helper$1 = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        var n = name.replace(/[^\x00-\x7F]/g, "_");
        return noCase$1(n.toLowerCase(), null, "_");
    };
    Helper.prototype.resolveUrl = function (name) {
        return url.resolve(config$2.site + "/manga/", this.toName(name) + "/");
    };
    return Helper;
}());
var helper$2 = new Helper$1();

var Supported$1 = {};
Supported$1[Genre.Action] = Genre.Action;
Supported$1[Genre.Adult] = Genre.Adult;
Supported$1[Genre.Adventure] = Genre.Adventure;
Supported$1[Genre.Comedy] = Genre.Comedy;
Supported$1[Genre.Doujinshi] = Genre.Doujinshi;
Supported$1[Genre.Drama] = Genre.Drama;
Supported$1[Genre.Ecchi] = Genre.Ecchi;
Supported$1[Genre.Fantasy] = Genre.Fantasy;
Supported$1[Genre.GenderBender] = Genre.GenderBender;
Supported$1[Genre.Harem] = Genre.Harem;
Supported$1[Genre.Historical] = Genre.Historical;
Supported$1[Genre.Horror] = Genre.Horror;
Supported$1[Genre.Josei] = Genre.Josei;
Supported$1[Genre.Lolicon] = Genre.Lolicon;
Supported$1[Genre.MartialArts] = Genre.MartialArts;
Supported$1[Genre.Mature] = Genre.Mature;
Supported$1[Genre.Mecha] = Genre.Mecha;
Supported$1[Genre.Mystery] = Genre.Mystery;
Supported$1[Genre.Oneshot] = Genre.Oneshot;
Supported$1[Genre.Psychological] = Genre.Psychological;
Supported$1[Genre.Romance] = Genre.Romance;
Supported$1[Genre.SchoolLife] = Genre.SchoolLife;
Supported$1[Genre.SciFi] = Genre.SciFi;
Supported$1[Genre.Seinen] = Genre.Seinen;
Supported$1[Genre.Shotacon] = Genre.Shotacon;
Supported$1[Genre.Shoujo] = Genre.Shoujo;
Supported$1[Genre.ShoujoAi] = Genre.ShoujoAi;
Supported$1[Genre.Shounen] = Genre.Shounen;
Supported$1[Genre.ShounenAi] = Genre.ShounenAi;
Supported$1[Genre.SliceOfLife] = Genre.SliceOfLife;
Supported$1[Genre.Smut] = Genre.Smut;
Supported$1[Genre.Sports] = Genre.Sports;
Supported$1[Genre.Supernatural] = Genre.Supernatural;
Supported$1[Genre.Tragedy] = Genre.Tragedy;
Supported$1[Genre.Yaoi] = Genre.Yaoi;
Supported$1[Genre.Yuri] = Genre.Yuri;
var correctName$1 = {};
correctName$1[Genre.Adult] = Genre.Adult.toString();
correctName$1[Genre.Action] = Genre.Action.toString();
correctName$1[Genre.Adventure] = Genre.Adventure.toString();
correctName$1[Genre.Comedy] = Genre.Comedy.toString();
correctName$1[Genre.Doujinshi] = Genre.Doujinshi.toString();
correctName$1[Genre.Drama] = Genre.Drama.toString();
correctName$1[Genre.Ecchi] = Genre.Ecchi.toString();
correctName$1[Genre.Fantasy] = Genre.Fantasy.toString();
correctName$1[Genre.GenderBender] = "Gender Bender";
correctName$1[Genre.Harem] = Genre.Harem.toString();
correctName$1[Genre.Historical] = Genre.Historical.toString();
correctName$1[Genre.Horror] = Genre.Horror.toString();
correctName$1[Genre.Josei] = Genre.Josei.toString();
correctName$1[Genre.Lolicon] = Genre.Lolicon.toString();
correctName$1[Genre.MartialArts] = "Martial Arts";
correctName$1[Genre.Mature] = Genre.Mature.toString();
correctName$1[Genre.Mecha] = Genre.Mecha.toString();
correctName$1[Genre.Mystery] = Genre.Mystery.toString();
correctName$1[Genre.Oneshot] = "One Shot";
correctName$1[Genre.Psychological] = Genre.Psychological.toString();
correctName$1[Genre.Romance] = Genre.Romance.toString();
correctName$1[Genre.SchoolLife] = Genre.SchoolLife.toString();
correctName$1[Genre.SciFi] = "Sci-fi";
correctName$1[Genre.Seinen] = Genre.Seinen.toString();
correctName$1[Genre.Shotacon] = Genre.Shotacon.toString();
correctName$1[Genre.Shoujo] = Genre.Shoujo.toString();
correctName$1[Genre.ShoujoAi] = "Shoujo Ai";
correctName$1[Genre.Shounen] = Genre.Shounen.toString();
correctName$1[Genre.ShounenAi] = "Shounen Ai";
correctName$1[Genre.SliceOfLife] = "Slice of Life";
correctName$1[Genre.Smut] = Genre.Smut.toString();
correctName$1[Genre.Sports] = Genre.Sports.toString();
correctName$1[Genre.Supernatural] = Genre.Supernatural.toString();
correctName$1[Genre.Tragedy] = Genre.Tragedy.toString();
correctName$1[Genre.Yaoi] = Genre.Yaoi.toString();
correctName$1[Genre.Yuri] = Genre.Yuri.toString();
var processFilter$1 = function (filter) {
    filter = filter || {};
    var search = filter.search, page = filter.page;
    var filterType = null;
    var filterName = filter.name;
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
        var name_1 = search.name, author_1 = search.author, artist_1 = search.artist, rating = search.rating, released = search.released, type_1 = search.type, genre = search.genre;
        filterType = resolveType$1(type_1) || filterType;
        if (name_1) {
            filterName = name_1.name || filterName;
            methodName = searchMethod$1(name_1.condition) || methodName;
        }
        if (search.status) {
            status = resolveStatus$1(search.status) || status;
        }
        if (author_1) {
            filterAuthor = author_1.name || filterAuthor;
            methodAuthor = searchMethod$1(author_1.condition) || methodAuthor;
        }
        if (artist_1) {
            filterArtist = artist_1.name || filterArtist;
            methodArtist = searchMethod$1(artist_1.condition) || methodArtist;
        }
        if (released) {
            filterReleased = released.value || filterReleased;
            methodReleased = searchMethod$1(released.condition) || methodReleased;
        }
        if (genre) {
            inGenres = genre.inGenres;
            outGenres = genre.outGenres;
        }
    }
    var type = "direction=" + (filterType || "");
    var nameMethod = "name_method=" + methodName;
    var mangaName = "name=" + (filterName || "");
    var authorMethod = "author_method=" + methodAuthor;
    var author = "author=" + (filterAuthor || "");
    var artistMethod = "artist_method=" + methodArtist;
    var artist = "artist=" + (filterArtist || "");
    var genreFilter = _.map(Supported$1, function (x) { return "genres%5B" + correctName$1[x].replace(/ /g, "+") + "%5D=" + inOutGenre$1(x, inGenres, outGenres); }).join("&");
    var releaseMethod = "released_method=" + methodReleased;
    var release = "released=" + (filterReleased || "");
    var completed = "is_completed=" + (resolveStatus$1(status) || "");
    var advopts = "advopts=1";
    if (page) {
        advopts += "&page=" + page;
    }
    return { src: url.resolve(config$2.site, "/search.php?" + [nameMethod, mangaName,
            type,
            authorMethod, author,
            artistMethod, artist,
            genreFilter,
            releaseMethod, release,
            completed, advopts].join("&"))
    };
};
function resolveType$1(type) {
    switch (type) {
        case FilterMangaType.Manga:
            return "rl";
        case FilterMangaType.Manhwa:
            return "lr";
        default:
            return null;
    }
}
function resolveStatus$1(status) {
    switch (status) {
        case FilterStatus.Ongoing:
            return 0;
        case FilterStatus.Complete:
            return 1;
        default:
            return null;
    }
}
function searchMethod$1(condition) {
    switch (condition) {
        case FilterCondition.Contains:
            return "cw";
        case FilterCondition.StartsWith:
            return "bw";
        case FilterCondition.EndsWith:
            return "ew";
        case FilterCondition.Equal:
            return "eq";
        case FilterCondition.LessThan:
            return "lt";
        case FilterCondition.GreaterThan:
            return "gt";
        default:
            return "cw";
    }
}
function inOutGenre$1(genre, inGenre, outGenre) {
    if (inGenre && inGenre.indexOf(genre) > -1) {
        return 1;
    }
    if (outGenre && outGenre.indexOf(genre) > -1) {
        return 2;
    }
    return 0;
}

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _$$1 = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_$$1) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _$$1.label++; return { value: op[1], done: false };
                case 5: _$$1.label++; y = op[1]; op = [0]; continue;
                case 7: op = _$$1.ops.pop(); _$$1.trys.pop(); continue;
                default:
                    if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _$$1 = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _$$1.label = op[1]; break; }
                    if (op[0] === 6 && _$$1.label < t[1]) { _$$1.label = t[1]; t = op; break; }
                    if (t && _$$1.label < t[2]) { _$$1.label = t[2]; _$$1.ops.push(op); break; }
                    if (t[2]) _$$1.ops.pop();
                    _$$1.trys.pop(); continue;
            }
            op = body.call(thisArg, _$$1);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var MangaHere = (function (_super) {
    __extends$1(MangaHere, _super);
    function MangaHere() {
        return _super.call(this, config$2, new Parser$1(), new Helper$1(), strategy) || this;
    }
    MangaHere.prototype.filter = function (filter) {
        return __awaiter$2(this, void 0, void 0, function () {
            var search, doc, mangas;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("filter mangas with: %o", filter);
                        search = processFilter$1(filter);
                        return [4 /*yield*/, this.request.getDoc(search.src + "?" + search.params)];
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
var manga$2 = new MangaHere();

var site$2 = "http://www.mangapanda.com";
var config$4 = {
    name: "MangaPanda",
    site: site$2,
    mangas_url: site$2 + "/alphabetical",
    latest_url: site$2 + "/latest"
};
var debug$4 = require("debug")("gin-downloader:mangapanda");
var verbose$3 = require("debug")("gin-downloader:mangapanda:verbose");
verbose$3("using %O", config$4);

var Parser$2 = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var mangas = [];
        $("ul.series_alpha > li > a").each(function (i, el) {
            mangas[i] = {
                name: Parser.resolveName(el.attribs.href) || el.lastChild.nodeValue.leftTrim(),
                src: url.resolve(config$4.site, el.attribs.href),
                status: el.parent.children.find(function (x) { return x.name === "span" && x.attribs.class === "mangacompleted"; })
                    ? FilterStatus.Complete.toString()
                    : FilterStatus.Ongoing.toString(),
            };
        });
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        $("tr.c2").each(function (i, el) {
            var divChildren = sanitize(el.children);
            var aManga = divChildren[1].children.find(function (x) { return x.name === "a"; });

            var mangaName = aManga.children.find(function (x) { return x.name === "strong"; }).lastChild.nodeValue;
            var date = divChildren[2].lastChild.nodeValue;
            var dts = sanitize(divChildren[1].children.slice(1).filter(function (x) { return x.name === "a" && x.attribs.class == "chaptersrec"; }));
            for (var _i = 0, dts_1 = dts; _i < dts_1.length; _i++) {
                var a = dts_1[_i];

                var src = url.resolve($.location, a.attribs.href);
                var title = a.lastChild.nodeValue;
                var chapNumber = title.lastDigit();
                chapters.push({
                    name: Parser.resolveName(src) || title,
                    src: src,
                    chap_number: chapNumber,
                    dateAdded: date
                });
            }
        });
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var selector = "#mangaproperties > table > tbody > tr > td";
        var $tds = $(selector);
        var image = $("#mangaimg > img").attr("src");
        var title = Parser.resolveName($.location) || $("h2.aname").text();
        var synonyms = $tds.eq(3).text().split(", ");
        var released = $tds.eq(5).text();
        var status = $tds.eq(7).text();
        var authors = [$tds.eq(9).text()];
        var artists = [$tds.eq(11).text()];
        var direction = $tds.eq(13).text();
        var genres = $("span.genretags").map(function (x, el) { return el.lastChild.nodeValue; }).get();
        var synopsis = $("#readmangasum > p").text();
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            released: released,
            status: status,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            direction: direction
        };
    };
    Parser.prototype.chapters = function ($) {
        var chapters = [];
        $("#listing > tbody > tr ").slice(1).each(function (i, el) {
            var tr = el;
            var children = sanitize(tr.children);
            var a = children[0].children.find(function (x) { return x.name === "a"; });
            var date = children.reverse()[0].lastChild.nodeValue;
            var text = a.next.nodeValue.slice(3);
            chapters.push(Parser.parseChapter(a, text, date));
        });
        return chapters;
    };
    Parser.parseChapter = function (a, text, date) {
        var aText = a.lastChild.nodeValue.trim();
        var name = text || aText;
        var href = a.attribs.href;
        return {
            chap_number: aText.lastDigit(),
            name: name,
            src: url.resolve(config$4.site, href),
            dateAdded: date
        };
    };
    Parser.prototype.imagesPaths = function ($) {
        var paths = [];
        $("#pageMenu > option").each(function (i, el) {
            paths[i] = url.resolve($.location, "" + el.attribs.value);
        });
        return paths;
    };
    Parser.prototype.image = function (html) {
        var __img__ = /src="[^"]*" alt/gmi;
        return html.match(__img__)[0].slice(5, -5).replace(/.v=\d+/, "");
    };
    Parser.prototype.filter = function ($) {
        var mangas = [];

        $(".manga_name > div > h3 > a").each(function (i, el) {
            mangas[i] = {
                name: el.lastChild.nodeValue,
                src: url.resolve(config$4.site, el.attribs.href)
            };
        });

        $(".authorinfo > div > a").each(function (i, el) {
            mangas.push({
                name: el.lastChild.nodeValue,
                src: url.resolve(config$4.site, el.attribs.href)
            });
        });
        mangas = _.uniqBy(mangas, "src");
        var page = 1;
        var query = url.parse($.location).query;
        if (query) {
            var m = query.toString().getMatches(/p=(\d+)/g, 1);
            if (m) {
                page = +m[0] / 30;
            }
        }
        var lastPage = 0;
        var selectedPageElement = $("#sp > strong").slice(-1);
        var lastPageElement = $("#sp > a").slice(-1);
        if (lastPageElement) {
            var href = lastPageElement.attr("href");
            if (href) {
                var m = href.match(/p=(\d+)/);
                if (m) {
                    lastPage = (+m[1]) / 30;
                }
            }
        }
        if (selectedPageElement) {
            var selPage = (+selectedPageElement.text()) - 1;
            if (selPage > lastPage) {
                lastPage = selPage;
            }
        }
        return {
            results: mangas,
            page: page,
            total: lastPage
        };
    };
    return Parser;
}());
Parser$2.fixNames = {
    "/kapon-_": "Kapon (>_<)!",
    "http://www.mangapanda.com/kapon-_": "Kapon (>_<)!",
};
Parser$2.resolveName = function (src) { return Parser$2.fixNames[src]; };
var parser$4 = new Parser$2();

var noCase$2 = require("no-case");
var names$1 = {
    "I'm Kagome": "i039m-kagome",
    "009 Re:Cyborg": "009-recyborg",
    "17 Years Old, That Summer Day's Miracle": "17-years-old-that-summer-days-miracle",
    "Kapon (>_": "kapon-_",
    "Kapon (>_<)!": "kapon-_",
    "Utopia's Avenger": "utopia039s-avenger",
};
var Helper$2 = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        if (names$1.hasOwnProperty(name)) {
            return names$1[name];
        }
        name = name.replace(/[\/\.+':’×;&"]/g, "");
        return noCase$2(name.toLowerCase(), null, "-");
    };
    Helper.prototype.resolveUrl = function (name) {
        return url.resolve(config$4.site, this.toName(name));
    };
    return Helper;
}());
var helper$4 = new Helper$2();

var ordered = [
    Genre.Action,
    Genre.Adventure,
    Genre.Comedy,
    Genre.Demons,
    Genre.Drama,
    Genre.Ecchi,
    Genre.Fantasy,
    Genre.GenderBender,
    Genre.Harem,
    Genre.Historical,
    Genre.Horror,
    Genre.Josei,
    Genre.Magic,
    Genre.MartialArts,
    Genre.Mature,
    Genre.Mecha,
    Genre.Military,
    Genre.Mystery,
    Genre.Oneshot,
    Genre.Psychological,
    Genre.Romance,
    Genre.SchoolLife,
    Genre.SciFi,
    Genre.Seinen,
    Genre.Shoujo,
    Genre.ShoujoAi,
    Genre.Shounen,
    Genre.ShounenAi,
    Genre.SliceOfLife,
    Genre.Smut,
    Genre.Sports,
    Genre.SuperPower,
    Genre.Supernatural,
    Genre.Tragedy,
    Genre.Vampire,
    Genre.Yaoi,
    Genre.Yuri,
];
var processFilter$2 = function (filter) {
    filter = filter || {};
    var search = filter.search, name = filter.name, page = filter.page;
    var mainsearch = name;
    var fstatus = null;
    var ftype = null;
    var inGenres = filter.genres || [];
    var outGenres = filter.outGenres || [];
    if (search) {
        if (!mainsearch) {
            var authorFilter = search.author || search.artist;
            if (authorFilter) {
                mainsearch = authorFilter.name;
            }
        }
        var statusFilter = search.status;
        if (statusFilter) {
            fstatus = resolveStatus$2(statusFilter);
        }
        ftype = resolveType$2(search.type) || ftype;
        var genre = search.genre;
        if (genre) {
            inGenres = genre.inGenres || inGenres;
            outGenres = genre.outGenres || outGenres;
        }
    }
    var msearch = "w=" + (mainsearch || "");
    var genreFilter = "genre=" + ordered.map(function (x) { return inOutGenre$2(x, inGenres, outGenres); }).join("");
    var status = "status=" + (fstatus || "");
    var pg = "p=" + (page * 30 || 0);
    var type = "rd=" + (ftype || 0);
    return { src: url.resolve(config$4.site, "/search/"),
        params: [msearch, type, status, genreFilter, pg].join("&")
    };
};
function resolveType$2(type) {
    switch (type) {
        case FilterMangaType.Manga:
            return 2;
        case FilterMangaType.Manhwa:
            return 1;
        default:
            return null;
    }
}
function resolveStatus$2(status) {
    switch (status) {
        case FilterStatus.Ongoing:
            return 1;
        case FilterStatus.Complete:
            return 2;
        default:
            return null;
    }
}
function inOutGenre$2(genre, inGenre, outGenre) {
    if (inGenre && inGenre.indexOf(genre) > -1) {
        return 1;
    }
    if (outGenre && outGenre.indexOf(genre) > -1) {
        return 2;
    }
    return 0;
}

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _$$1 = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_$$1) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _$$1.label++; return { value: op[1], done: false };
                case 5: _$$1.label++; y = op[1]; op = [0]; continue;
                case 7: op = _$$1.ops.pop(); _$$1.trys.pop(); continue;
                default:
                    if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _$$1 = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _$$1.label = op[1]; break; }
                    if (op[0] === 6 && _$$1.label < t[1]) { _$$1.label = t[1]; t = op; break; }
                    if (t && _$$1.label < t[2]) { _$$1.label = t[2]; _$$1.ops.push(op); break; }
                    if (t[2]) _$$1.ops.pop();
                    _$$1.trys.pop(); continue;
            }
            op = body.call(thisArg, _$$1);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var MangaPanda = (function (_super) {
    __extends$2(MangaPanda, _super);
    function MangaPanda() {
        return _super.call(this, config$4, new Parser$2(), new Helper$2(), strategy) || this;
    }
    MangaPanda.prototype.resolveChapterSource = function (name, chapter) {
        return __awaiter$3(this, void 0, void 0, function () {
            var mangaUri;
            return __generator$3(this, function (_a) {
                mangaUri = this.nameHelper.resolveUrl(name);

                return [2 /*return*/, url.resolve(mangaUri + "/", chapter.toString())];
            });
        });
    };
    MangaPanda.prototype.filter = function (filter) {
        return __awaiter$3(this, void 0, void 0, function () {
            var search, doc, mangas;
            return __generator$3(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("filter mangas with: %o", filter);
                        search = processFilter$2(filter);
                        return [4 /*yield*/, this.request.getDoc(search.src + "?" + search.params)];
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
    return MangaPanda;
}(MangaSite));
var manga$4 = new MangaPanda();

var site$3 = "http://kissmanga.com/";
var config$6 = {
    name: "KissManga",
    site: site$3,
    mangas_url: url.resolve(site$3, "/MangaList/"),
    latest_url: url.resolve(site$3, "/MangaList/LatestUpdate")
};
var debug$5 = require("debug")("gin-downloader:kissmanga");
var verbose$4 = require("debug")("gin-downloader:kissmanga:verbose");
verbose$4("using %O", config$6);

var Parser$3 = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var mangas = [];
        $("table.listing > tbody > tr").slice(2).each(function (i, el) {
            var tds = sanitize(el.children);
            var ma = tds[0].children.find(function (x) { return x.name === "a"; });
            var mangaUrl = ma.attribs.href;
            var mangaName = ma.children.map(function (x) { return x.nodeValue; }).join("").leftTrim();
            var completed = tds[1].lastChild.nodeValue === "Completed";
            var src = url.resolve($.location || config$6.latest_url, mangaUrl);
            mangas[i] = {
                name: Parser.resolveName(src) || mangaName,
                src: src,
                status: completed ? "Closed" : "Open",
            };
        });
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        $("table.listing > tbody  > tr").slice(2).each(function (i, el) {
            var tds = sanitize(el.children);
            var ma = tds[0].children.find(function (x) { return x.name === "a"; });

            var mangaName = ma.children.map(function (x) { return x.nodeValue; }).join("").leftTrim();
            var ca = tds[1].children.find(function (x) { return x.name === "a"; });
            var src = ca.attribs.href;

            var vol = _.last(src.match(/(?:vol-)(\d+)/i));
            var chapRegexes = [
                /(?:(?:ch|chapter|ep)-)(\d+(-\d{1,3})?)/i,
                /(\d+(-\d{1,3})?)(?:\?)/,
                /(?:\/)(\d+(-\d{1,3})?)/
            ];
            var chapter = _.reduce(chapRegexes, function (result, value) {
                return result || _.head(_.slice(src.match(value), 1, 2));
            }, null);

            if (!chapter) {
                chapter = -7;
                console.warn("couldn't resolve the chapter for '%s', please refer to %s", src, "https://github.com/pikax/gin-downloader/issues/7");
            }

            chapters[i] = {
                name: mangaName,
                chap_number: chapter,
                src: url.resolve(config$6.latest_url, src),
                volume: vol
            };
        });
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var $main = $("#leftside > div > div.barContent > div").eq(1);
        var img = $("#rightside > div > div.barContent > div > img").eq(0);
        var a = $main.children("a");
        var rows = $main.children("p");
        var image = img.attr("src");
        var title = a.text();
        var synonyms = rows.eq(0).children("a").map(function (x, el) { return el.lastChild.nodeValue; }).get();
        var genres = rows.eq(1).children("a").map(function (x, el) { return el.lastChild.nodeValue; }).get();
        var authors = rows.eq(2).children("a").map(function (x, el) { return el.lastChild.nodeValue; }).get();
        var artists = authors;
        if (authors.length > 1) {
            authors = authors.slice(0, -1);
            artists = artists.slice(-1);
        }
        var status = rows.eq(3).children("span").eq(0).map(function (i, el) { return el.next; }).text().trim();
        var views = rows.eq(3).children("span").eq(1).map(function (i, el) { return el.next; }).text().trim();
        var synopsis = rows.eq(5).text();
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
            views: views,
        };
    };
    Parser.prototype.chapters = function ($) {
        var mangas = [];
        var rows = new Map();
        $("table.listing > tbody > tr > td").each(function (i, el) {
            var array = rows.get(el.parentNode) || [];
            array.push(el);
            rows.set(el.parentNode, array);
        });
        rows.forEach(function (children) {
            var titleTd = children[0];
            var dateAdded = children[1].lastChild.nodeValue.trim();
            var a = titleTd.children[1];
            var title = a.lastChild.nodeValue.leftTrim();
            var src = url.resolve(config$6.mangas_url, a.attribs.href);

            mangas.push({
                name: Parser.ResolveChapterName(title),
                chap_number: Parser.ResolveChapterNumber(title),
                volume: Parser.ResolveChapterVolume(title),
                src: src,
                dateAdded: dateAdded,
            });
        });
        return mangas;
    };
    Parser.prototype.imagesList = function (html, secret, vm$$1) {
        var lstImages = html.getMatches(/wrapKA\("([^"]*)"/gm, 1);
        var sandbox = {
            lstImages: lstImages,
            imgs: Array(),
            secret: secret,
            alert: console.log
        };
        var context = vm.createContext(sandbox);
        vm$$1.runInContext(context);
        return sandbox.imgs.map(function (x) { return /url=([^&]*)/.exec(x)[1]; }).map(decodeURIComponent);
    };
    Parser.prototype.getSecret = function (html) {
        var m = /\["([^"]*)"]; chko[^\[]*\[(\d+)]/gm.exec(html);
        if (m) {
            return m[1].decodeEscapeSequence();
        }
        return null;
    };
    Parser.prototype.imagesPaths = function (doc) {
        throw new Error("no needed");
    };
    Parser.prototype.image = function (html) {
        throw new Error("no needed");
    };
    Object.defineProperty(Parser.prototype, "VM", {
        get: function () {
            return this._vm;
        },
        enumerable: true,
        configurable: true
    });
    Parser.prototype.buildVM = function (cajs, lojs) {
        var scripts = [cajs,
            lojs,
            "chko = secret || chko; key = CryptoJS.SHA256(chko);",
            "for (var img in lstImages) imgs.push(wrapKA(lstImages[img]).toString());"
        ];
        return this._vm = new vm.Script(scripts.join("\n"));
    };
    Parser.prototype.filter = function (doc) {
        return {
            results: this.mangas(doc),
            page: 1,
            total: 1
        };
    };
    Parser.ResolveChapterVolume = function (title) {
        if (title.indexOf("_vol") < 0)
            return;
        var frags = title.split(": ", 1);
        var chapfrags = frags[0].split("ch.");
        return chapfrags[0].trim().lastDigit().toString();
    };
    Parser.ResolveChapterNumber = function (title) {
        var frags = title.split(": ", 1);
        return frags[0].lastDigit();
    };
    Parser.ResolveChapterName = function (title) {
        var frags = title.split(": ");
        return frags[frags.length - 1];
    };
    return Parser;
}());
Parser$3.fixNames = {
    "http://kissmanga.com/Manga/Desire-KOTANI-Kenichi": "Desire KOTANI Kenichi",
    "http://kissmanga.com/Manga/Tokyo-Toy-Box-o": "Tokyo Toy Box o",
    "http://kissmanga.com/Manga/Valkyrie%20Profile": "Valkyrie%20Profile",
};
Parser$3.resolveName = function (src) { return Parser$3.fixNames[src]; };
var parser$6 = new Parser$3();

var names$2 = {
    "(Sokuhou) Class no Ikemen ga Watashi no Shinkyoku ni Muchuu na Ken.": "Sokuhou--Class-no-Ikemen-ga-Watashi-no-Shinkyoku-ni-Muchuu-na-Ken-",
    "5-tsu no Hajimete - Ubawarete mo Ii, Kimi ni Nara": "5-tsu-no-Hajimete-Ubawarete-mo-Ii--Kimi-ni-Nara",
    "Again!!": "Again-",
    "Akai Kami no Marure Ina ﻿": "Akai-Kami-no-Marure-Ina-",
    "Akuma na Cupid": "Akuma-na-Cupid-one-shot",
    "Mayuge no Kakudo wa 45° de": "Mayuge-no-Kakudo-wa-45°-de",
    "Alice Binetsu 38°C - We Are Tsubasa ga Oka D.C": "Alice-Binetsu-38°C-We-Are-Tsubasa-ga-Oka-D-C",
    "Akuma no Kagi to Shoujo no Raison d'Être": "Akuma-no-Kagi-to-Shoujo-no-Raison-d-Etre",
    "He~nshin!! - Sonata Birdie Rush": "He-nshin-Sonata-Birdie-Rush",
    "Anagura Amélie": "Anagram-Amelie",
    "B&W": "B&W",
    "Blaze(ComicGT)": "Blaze-ComicGT",
    "Cactus and Radio": "Cactus-and-Radio-Hanquocdai",
    "Chiyou yo Hana yo": "Chiyou-y-%20Hana-yo",
    "Hell's Kitchen": "Hell’s-Kitchen",
    "Ayeshah’s Secret": "Ayeshah-s-Secret",
    "Ansatsu Kyoushitsu Spin-off  Koro-sense Q!": "Ansatsu-Kyoushitsu-Spin-off--Koro-sense-Q",
    "Atelier - Escha & Logy": "Escha-Logy-no-Atelier-Tasogare-no-Sora-no-Renkinjutsushi",

    "Takianna no Honshou wa S na no ka M na no ka Ore Dake ga Shitte Iru.": "Takianna-no-Honshou-wa-S-na-no-ka-M-na-no-ka-Ore-Dake-ga-Shitte-Iru-",
    "Itsuka, Kimi ga Tonari de Mezametara": "Itsuka--Kimi-ga-Tonari-de-Mezametara",
    "Chocolat (Kubonouchi Eisaku)": "Chocolat",
    "Code Geass - Soubou no Oz": "Code-Geas--Soubou-no-Oz",
    "Coffee & Vanilla": "Coffee-&-Vanilla",
    "Confidential Confessions": "Confidential-confessions",
    "Danganronpa - Kibou no Gakuen to Zetsubou no Koukouse": "DANGANRONPA-KIBOU-NO-GAKUEN-TO-ZETSUBOU-NO-KOUKOUSEI",
    "Danganronpa 1&2 Comic Anthology": "Danganronpa-1-2-Comic-Anthology",
    "Dear!(Mitsuki Kako)": "Dear-Mitsuki-Kako",
    "Death Note [Colored Edition]": "Death-Note-Colored-Edition",
    "Devil's Bride(RHIM Ju Yeon)": "Devil-s-Bride-RHIM-Ju-Yeon",
    "Di[e]ce": "Di-e-ce",
    "Do Da Dancin'!": "Do-Da-Dancin",
    "Dungeon ni Deai o Motomeru no wa Machigatte Iru Darou ka: Familia Chronicle Episode Ryu": "Dungeon-ni-Deai-o-Motomeru-no-wa-Machigatte-Iru-Darou-ka--Familia-Chronicle-Episode-Ryu",
    "Fairy Heart": "Fairy-Heart-hanquocdai",
    "Fairy Tail Gaiden - Road Knight": "Fairy-Tail-Gaiden-Lord-Knight",
    "Fate/Mahjong Night - Seihai Sensou": "Fate-Mahjong-Seihai-Sensou",
    "Flowers of Evil (Manhwa)": "Flowers-of-Evil",
    "For Someone": "For-Someon",
    "Fuan no Tane": "Fuan-no-Tane----",
    "Fuan no Tane +": "Fuan-no-Tane-+",
    "Ge~sen Fishing": "Ge-sen-Fishing",
    "Gestalt(OOTSUKI Miu)": "Gestalt-OOTSUKI-Miu",
    "Girls & Panzer - Little Army II": "Girls-&-Panzer-Little-Army-II",
    "Gunjou(NAKAMURA Ching)": "Gunjou-NAKAMURA-Ching",
    "Haiyore! Nyaruko-san": "Haiyore--Nyaruko-san",
    "Hentai Kamen S –Hentai Kamen Second": "Hentai-Kamen-S-Hentai-Kamen-Second",
    "HIMAWARI★ROCK YOU!!": "HIMAWARI-ROCK-YOU",
    "Himouto! Umaru-chan S": "Himouto--Umaru-chan-S",
    "Houkago!(Anthology)": "Houkago-Anthology",
    "I Don't Want To Say I'm a Chicken": "I-Don-t-Want-to-Say-I-m-a-Chicken",
    "I\"S": "I-S",
    "ID - The Greatest Fusion Fantasy": "ID-THE-GREATEST-FUSION-FANTASY",
    "I'm the Main Character of a Harem Manga, but I'm Gay So Every Day Is Hell for Me": "I-m-the-Main-Character-of-a-Harem-Manga--but-I-m-Gay-So-Every-Day-Is-Hell-for-Me",
    "In Full Bloom": "In-Full-Bloom-hanquocdai",
    "IS!": "IS-2",
    "Jojo no Kimyou na Bouken - Jojorion (JoJo's Bizarre Adventure Part 8: Jojorion)": "Jojo-no-Kimyou-na-Bouken-Jojorion",
    "JoJo's Bizarre Adventure Part 4: Diamond is Unbreakable": "Diamond-wa-Kudakenai",
    "Kagome Kagome (IKEBE Aoi)": "Kagome-Kagome--IKEBE-Aoi-",
    "Kare wa, Watashi no Koto ga Suki Mitai Desu": "Kare-w-Watashi-no-Koto-ga-Suki-Mitai-Desu",
    "Katekyo Hitman Reborn!": "Kateikyoushi-Hitman-Reborn",
    "Kimi o Matsu -> Akaiito": "Kimi-o-Matsu-Akaiito",
    "Kino no Tabi - the Beautiful World (SHIOMIYA Iruka)": "Kino-no-Tabi-%20the-Beautiful-World-SHIOMIYA-Iruka",
    "KissXSis": "Kiss-X-Sis",
    "Kumo Desu ga, Nani ka?": "Kumo-Desu-ga--Nani-ka",
    "Law of Ueki": "Ueki-no-Housoko",
    "Love Me Baby(Sasamura Gou)": "Love-Me-Baby-Sasamura-Gou",
    "Love Mission @": "Love-Mission",
    "Memory [Locked]": "Memory-Locked",
    "Metropolis (KURODA Iou)": "Metropolis",
    "Naka no Hito Genome [Jikkyouchuu]": "Naka-no-Hito-Genome-Jikkyouchuu",
    "Nausicaä of the valley of the wind": "Nausicaä-of-the-valley-of-the-wind",
    "Noblesse (Manhwa)": "Noblesse",
    "Onna no Buki ga Tsukaete Koso Otoko no Ko Desu.": "Onna-no-Buki-ga-Tsukaete-Koso-Otoko-no-Ko-Desu-",
    "Oremonogatari x Nisekoi": "Ore-Koi",
    "Otona no Shoumei ﻿": "Otona-no-Shoumei-",
    "Panty & Stocking with Garterbelt": "Panty-&-Stocking-with-Garterbelt",
    "Pig Bride": "pig-bride",
    "Pigeonhole Fantasia(Season 2)": "Pigeonhole-Fantasia-Season-2",
    "Prince of Prince(Je-Ah)": "Prince-of-Prince-Je-Ah",
    "Raubritter*": "Raubritter",
    "Renai☆SLG": "Renai-SLG",
    "Rico": "Rico-Oneshot",
    "Seigi no Mikata! (Miyuki Mitsubachi)": "Seigi-no-Mikata",
    "Seraph of the End": "Owari-no-Serafu",
    "Seshiji o Pin! to - Shikakou Kyougi Dance-bu e Youkoso": "Seshiji-o-Pin--to-Shikakou-Kyougi-Dance-bu-e-Youkoso",
    "Sex=Love2": "Sex-Love2",
    "Shaman": "Shaman-hanquocdai",
    "Shinrei Tantei Yakumo": "Shinrei-Tantei-Yakumo-2009",
    "ShiraYuki PaniMix!  ﻿": "ShiraYuki-PaniMix-",
    "Shirokuma Café": "Shirokuma-Café",
    "Silent Möbius Klein": "Silent-Möbius-Klein",
    "Sono Hoshi o Bokutachi wa Koi to Yobu Koto ni Suru.": "Sono-Hoshi-o-Bokutachi-wa-Koi-to-Yobu-Koto-ni-Suru-",
    "Soul Catcher(S)": "Soul-Catcher-S",
    "ST&RS": "ST-RS",
    "Steel Ball Run (JoJo's Bizarre Adventure Part 7: Steel Ball Run)": "Steel-Ball-Run",
    "Steins;Gate": "Steins-Gate-",
    "Syrup [Bitter] Anthology": "Syrup-Bitter-Anthology",
    "Taiyou no Ijiwaru": "Taiyou-no-Ichiwaru",
    "Takemiya Jin – Web Extras": "Takemiya-Jin-Web-Extras",
    "Tale of the Fighting Freak, Path of the Warrior [Blood and Steel]": "Tale-of-the-Fighting-Freak-Path-of-the-Warrior-Blood-and-Steel",
    "Tensei Shitara Slime Datta Ken: The Ways of Strolling in the Demon Country": "Tensei-Shitara-Slime-Datta-Ken--The-Ways-of-Strolling-in-the-Demon-Country",
    "THE iDOLM@STER Cinderella Girls Shuffle!! - Idol wa Hajimemashita": "Idol-wa-Hajimemashita",
    "The Legendary Moonlight Sculptor": "Dalbic-Jogaksa",
    "The Princess Mirror": "The-Princess-s-Mirror",
    "Tokku Hakkenshi [code:t-8]": "Tokku-Hakkenshi-code-t-8",

    "Totsuzen Desu ga, Ashita Kekkon Shimasu": "Totsuzen-Desu-ga--Ashita-Kekkon-Shimasu",
    "Tsubakikan no Utsukushi Sugiru Garçon": "Tsubakikan-no-Utsukushi-Sugiru-Garçon",
    "Tsurebito": "Companion",
    "Uchi no Musume no Tame Naraba, Ore wa Moshikashitara Mao mo Taoseru Kamo Shirenai.": "Uchi-no-Musume-no-Tame-Naraba-Ore-wa-Moshikashitara-Mao-mo-Taoseru-Kamo-Shirenai-",
    "Umineko no Naku Koro ni Chiru Episode 7: Requiem of the Golden Witch": "Umineko-no-Naku-Koro-ni-Chiru-Episode-Episode-7-Requiem-of-the-Golden-Witch",
    "Wake Up Deadman": "Wake-Up-Deadman-Second-Season",
    "Witches' Sabbath": "Witches-s--Sabbath",
    "Wow Toilet": "Wow-Sergeant",
    "Yagate Kimi ni Naru": "Yagate-kun-ni-Naru",
    "Zettai Zetsubou Shoujo - Danganronpa Another Episode - Genocider Mode": "Zettai-Zetsubou-Shoujo-Danganronpa-Another-Episode---Genocider-Mode",
    "Valkyrie%20Profile": "Valkyrie%20Profile",
};
var latin_map = { "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x" };
var latinise = function (str) { return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) { return latin_map[a] || a; }); };
var Helper$3 = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        if (names$2.hasOwnProperty(name)) {
            return names$2[name];
        }
        var BEGINING = /^[\-\s\.\?\!\/:+]+/;
        var ENDING = /[\-\s\?\!\.)+]+$/;
        var REMOVE = /["!\(#&,%~\?]/g;
        var REPLACE = /[\s\-$;\)\'\.\/:°+Ê@*_]+/g;
        var n = latinise(name).replace(REMOVE, "").replace(BEGINING, "").replace(ENDING, "").replace(REPLACE, "-");
        return n;

    };
    Helper.prototype.resolveUrl = function (name) {
        return config$6.site + "Manga/" + this.toName(name);

    };
    return Helper;
}());
var helper$6 = new Helper$3();

var ordered$1 = [
    Genre.FourKoma,
    Genre.Action,
    Genre.Adult,
    Genre.Adventure,
    Genre.Comedy,
    Genre.Comic,
    Genre.Cooking,
    Genre.Doujinshi,
    Genre.Drama,
    Genre.Ecchi,
    Genre.Fantasy,
    Genre.GenderBender,
    Genre.Harem,
    Genre.Historical,
    Genre.Horror,
    Genre.Josei,
    Genre.Lolicon,
    Genre.Manga,
    Genre.Manhua,
    Genre.Manhwa,
    Genre.MartialArts,
    Genre.Mature,
    Genre.Mecha,
    Genre.Medical,
    Genre.Music,
    Genre.Mystery,
    Genre.Oneshot,
    Genre.Psychological,
    Genre.Romance,
    Genre.SchoolLife,
    Genre.SciFi,
    Genre.Seinen,
    Genre.Shotacon,
    Genre.Shoujo,
    Genre.ShoujoAi,
    Genre.Shounen,
    Genre.ShounenAi,
    Genre.SliceOfLife,
    Genre.Smut,
    Genre.Sports,
    Genre.Supernatural,
    Genre.Tragedy,
    Genre.Webtoon,
    Genre.Yaoi,
    Genre.Yuri,
];
var processFilter$3 = function (filter) {
    filter = filter || {};
    var genres = filter.genres, outGenres = filter.outGenres, search = filter.search;
    var fauthor = null;
    var fstatus = null;
    var fname = filter.name;
    if (search) {
        var nameFilter = search.name;
        if (nameFilter) {
            fauthor = nameFilter.name;
        }
        var authorFilter = search.author || search.artist;
        if (authorFilter) {
            fauthor = authorFilter.name;
        }
        var statusFilter = search.status;
        if (statusFilter) {
            fstatus = resolveStatus$3(statusFilter);
        }
    }
    var mangaName = "mangaName=" + (fname || "");
    var authorArtist = "authorArtist=" + (fauthor || "");
    var genreFilter = ordered$1.map(function (x) { return inOutGenre$3(x, genres, outGenres); }).map(function (x) { return "genres=" + x; }).join("&");
    var status = "status=" + (fstatus || "");
    return { src: url.resolve(config$6.site, "/AdvanceSearch"),
        params: [mangaName, authorArtist, genreFilter, status].join("&")
    };
};
function resolveStatus$3(status) {
    switch (status) {
        case FilterStatus.Ongoing:
            return "Ongoing";
        case FilterStatus.Complete:
            return "Complete";
        default:
            return null;
    }
}
function inOutGenre$3(genre, inGenre, outGenre) {
    if (inGenre && inGenre.indexOf(genre) > -1) {
        return 1;
    }
    if (outGenre && outGenre.indexOf(genre) > -1) {
        return 2;
    }
    return 0;
}

var __assign$2 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var cloudscraper = require("cloudscraper");

var DefaultOptions$1 = {
    method: "GET",
    jar: true,
    gzip: true,

    followAllRedirects: true,
    forever: true,
};
var RequestCloudFareStrategy = (function () {
    function RequestCloudFareStrategy() {
    }
    RequestCloudFareStrategy.prototype.request = function (options) {
        var opts = __assign$2({}, DefaultOptions$1);
        if (typeof options === "string") {
            opts.url = options;
        }
        else {
            opts = __assign$2({}, opts, options);
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
var strategy$2 = new RequestCloudFareStrategy();

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$4 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _$$1 = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_$$1) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _$$1.label++; return { value: op[1], done: false };
                case 5: _$$1.label++; y = op[1]; op = [0]; continue;
                case 7: op = _$$1.ops.pop(); _$$1.trys.pop(); continue;
                default:
                    if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _$$1 = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _$$1.label = op[1]; break; }
                    if (op[0] === 6 && _$$1.label < t[1]) { _$$1.label = t[1]; t = op; break; }
                    if (t && _$$1.label < t[2]) { _$$1.label = t[2]; _$$1.ops.push(op); break; }
                    if (t[2]) _$$1.ops.pop();
                    _$$1.trys.pop(); continue;
            }
            op = body.call(thisArg, _$$1);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var KissManga = (function (_super) {
    __extends$3(KissManga, _super);
    function KissManga() {
        return _super.call(this, config$6, new Parser$3(), new Helper$3(), strategy$2) || this;
    }
    KissManga.prototype.getVM = function () {
        return __awaiter$4(this, void 0, void 0, function () {
            var vm$$1, tkCa, tkLo, tkLst, lst;
            return __generator$4(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm$$1 = this.parser.VM;
                        if (vm$$1) {
                            return [2 /*return*/, vm$$1];
                        }
                        tkCa = this.request.getHtml(url.resolve(this.config.site, "/Scripts/ca.js"));
                        tkLo = this.request.getHtml(url.resolve(this.config.site, "/Scripts/lo.js"));
                        tkLst = [tkCa,
                            tkLo];
                        return [4 /*yield*/, Promise.all(tkLst)];
                    case 1:
                        lst = _a.sent();
                        return [2 /*return*/, this.parser.buildVM(lst[0], lst[1])];
                }
            });
        });
    };
    KissManga.prototype.mangas = function (filter) {
        return this.filter().then(function (x) { return x.results; });
    };
    KissManga.prototype.filter = function (filter) {
        return __awaiter$4(this, void 0, void 0, function () {
            var search, opts, headers, doc, mangas;
            return __generator$4(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("filter mangas with: %o", filter);
                        search = processFilter$3(filter);
                        opts = this.buildMangasRequest(search.src);
                        headers = opts.headers || {};
                        headers["Content-Type"] = headers["Content-Type"] || "application/x-www-form-urlencoded; charset=UTF-8";
                        headers["Content-Length"] = headers["Content-Length"] || search.params.length;
                        opts.body = search.params.toString();
                        return [4 /*yield*/, this.postDoc(opts)];
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
    KissManga.prototype.images = function (name, chapNumber) {
        return __awaiter$4(this, void 0, void 0, function () {
            var chapters, chapter, html, secret, vm$$1, imgs, srcs;
            return __generator$4(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chapters(name)];
                    case 1:
                        chapters = _a.sent();
                        chapter = _.find(chapters, { chap_number: chapNumber });
                        if (!chapter) {
                            throw new Error("Chapter not found!");
                        }
                        return [4 /*yield*/, this.getHtml(chapter.src)];
                    case 2:
                        html = _a.sent();
                        secret = this.parser.getSecret(html);
                        return [4 /*yield*/, this.getVM()];
                    case 3:
                        vm$$1 = _a.sent();
                        imgs = this.parser.imagesList(html, secret, vm$$1);
                        srcs = imgs.map(function (x) {
                            return {
                                name: url.parse(x).pathname.split("/").reverse()[0],
                                src: x
                            };
                        });
                        return [2 /*return*/, srcs.map(function (x) { return Promise.resolve(x); })];
                }
            });
        });
    };
    return KissManga;
}(MangaSite));
var manga$6 = new KissManga();

var site$4 = "http://bato.to/";
var config$8 = {
    name: "Batoto",
    site: site$4,
    mangas_url: url.resolve(site$4, "/search_ajax"),
    latest_url: url.resolve(site$4, "/"),
};
var debug$6 = require("debug")("gin-downloader:batoto");
var verbose$5 = require("debug")("gin-downloader:batoto:verbose");
verbose$5("using %O", config$8);

var Parser$4 = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var rows = $("tr[id^='comic_rowo']");
        var location = $.location;
        var mangas = [];
        rows.each(function (i, e) {

            var td = $(e).prev();
            mangas[i] = {
                name: td.find("td > strong > a").text().slice(1),
                src: td.find("td > strong > a").attr("href"),
                status: td.find("td > strong > a > img").attr("src").indexOf("book_open") > 0 ? "Open" : "Closed",
                mature: td.find("td > img").eq(1).attr("alt") === "Mature",
            };
        });

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
            var ha = _.last(sanitize(header.children)).children
                .find(function (x) { return x && x.attribs && x.attribs.href && x.attribs.href.startsWith("http"); });

            var mangaName = ha.lastChild.nodeValue;
            var row = header.attribs.class.slice(0, 4);
            var tr = void 0;
            while ((tr = $trs[++i]) && (tr.attribs && tr.attribs.class.startsWith(row))) {
                var tds = sanitize(tr.children).reverse();
                var date = tds[0].lastChild.nodeValue.trim();
                var sTd = tds[1].children.find(function (x) { return x.name === "a"; });
                var lTd = tds[2].children.find(function (x) { return x.name === "div"; });
                var cTd = tds[3].children.find(function (x) { return x.name === "a"; });

                var cname = cTd.lastChild.nodeValue;
                var src = cTd.attribs.href;
                var lang = lTd.attribs.title;
                var scanlator = sTd.lastChild.nodeValue;
                chapters[i] = {
                    name: mangaName,
                    chap_number: Parser.extractChapterNumber(cname),
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
        var synonyms = $tr.eq(1).children("span").map(function (i, e) { return e.lastChild.nodeValue.slice(1); }).get();
        var authors = $tr.eq(3).children("a").map(function (i, e) { return e.lastChild.nodeValue; }).get();
        var artists = $tr.eq(5).children("a").map(function (i, e) { return e.lastChild.nodeValue; }).get();
        var genres = $tr.eq(7).children("a").map(function (i, e) { return e.lastChild.lastChild; }).filter(function (x, e) { return !!e; }).map(function (i, e) { return e.nodeValue.slice(1); }).get();
        var synopsis = $tr.eq(13).text();
        var type = $tr.eq(9).text().trim();
        var status = $tr.eq(11).text().trim();
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
            type: type,
        };
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

            var a = eTitle.childNodes.find(function (x) { return x.name === "a"; });
            var fullTitle = a.lastChild.nodeValue.slice(1);
            var src = Parser.convertChapterReaderUrl(a.attribs.href);
            var name = Parser.extractChapterName(fullTitle);
            var chap_number = Parser.extractChapterNumber(fullTitle);
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
        if (src.startsWith(url.resolve(config$8.site, "/areader"))) {
            return src;
        }
        var idNumber = src.split("#")[1];
        var pg = 1;
        var pgMatch = /_\d+$/.exec(idNumber);
        if (pgMatch) {
            pg = +pgMatch[0].slice(1);
            idNumber = idNumber.replace(pgMatch[0], "");
        }
        return url.resolve(config$8.site, "/areader?id=" + idNumber + "&p=" + pg);
    };
    Parser.prototype.image = function (html) {
        var regex = /(?:id="comic_page".*)((http|https):\/\/img\.bato\.to\/comics\/[^"]*)/gm;
        var m = regex.exec(html);
        if (!m) {
            throw new Error("Image not found");
        }
        return m[1];
    };
    Parser.prototype.filter = function ($) {
        var results = this.mangas($);
        var next = $(".input_submit");
        var location = $.location;
        var matches = location.match(/\d+$/);
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
var parser$8 = new Parser$4();

var Helper$4 = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        throw new Error("Not supported");
    };
    Helper.prototype.resolveUrl = function (name) {
        return config$8.site + "Manga/" + this.toName(name);
    };
    return Helper;
}());
var helper$8 = new Helper$4();

var ordered$2 = [
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
var processFilter$4 = function (filter) {
    filter = filter || {};
    var genres = filter.genres, outGenres = filter.outGenres, search = filter.search;
    var fauthor = null;
    var fstatus = null;
    var ftype = null;
    var fname = filter.name;
    var nameCondition = null;
    var authorCondition = null;
    var genreCondition = null;
    var fmature = "y";
    var fratingFrom = 0;
    var fratingTo = 5;
    if (search) {
        var nameFilter = search.name;
        if (nameFilter) {
            fname = nameFilter.name;
            nameCondition = resolveCondition(nameFilter.condition);
        }
        var authorFilter = search.author || search.artist;
        if (authorFilter) {
            fauthor = authorFilter.name;
            authorCondition = resolveCondition(authorFilter.condition);
        }
        var statusFilter = search.status;
        if (statusFilter) {
            fstatus = resolveStatus$4(statusFilter);
        }
        var genreFilter_1 = search.genre;
        if (genreFilter_1) {
            genres = genreFilter_1.inGenres;
            outGenres = genreFilter_1.outGenres;
            genreCondition = resolveGenreCondition(genreFilter_1.condition);
        }
        var type_1 = search.type, mature_1 = search.mature, rating = search.rating;
        if (type_1) {
            ftype = resolveType$3(type_1);
        }
        fmature = util.isNullOrUndefined(mature_1) || mature_1 ? "y" : "n";
        if (rating) {
            fratingFrom = rating.from || 0;
            fratingTo = rating.to || 5;
        }
    }
    var mangaName = "name=" + (fname || "");
    var nameCond = nameCondition && "name_cond=" + nameCondition;
    var authorArtist = "artist_name=" + (fauthor || "");
    var authorCond = authorCondition && "artist_name_cond=" + authorCondition;
    var genreFilter = "genres=" + ordered$2.map(function (x) { return inOutGenre$4(x, genres, outGenres); }).filter(function (x) { return x !== ""; }).join(";");
    var genreCon = (genreCondition && "genre_cond=" + genreCondition) || "genre_cond=and";
    var status = "status=" + (fstatus || "");
    var type = "type=" + ftype;
    var page = "p=" + (filter.page || 1);
    var rating_low = "rating_low=" + (fratingFrom || 0);
    var rating_high = "rating_high=" + (fratingTo || 5);
    var mature = "mature=" + (fmature || "y");
    return { src: config$8.mangas_url + "?" + [
            mangaName,
            nameCond,
            authorArtist,
            authorCond,
            genreFilter,
            genreCon,
            status,
            type,
            mature,
            rating_low,
            rating_high,
            page
        ].join("&")
    };
};
function resolveType$3(type) {
    switch (type) {
        case FilterMangaType.Manga:
            return "jp";
        case FilterMangaType.Manhwa:
            return "kr";
        case FilterMangaType.Manhua:
            return "cn";
        case FilterMangaType.Artbook:
            return "ar";
        case FilterMangaType.Other:
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
        case FilterCondition.Equal:
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
function resolveStatus$4(status) {
    switch (status) {
        case FilterStatus.Ongoing:
            return "i";
        case FilterStatus.Complete:
            return "c";
        default:
            return null;
    }
}
function inOutGenre$4(genre, inGenre, outGenre) {
    if (inGenre && inGenre.indexOf(genre) > -1) {
        return "i" + dic[genre];
    }
    if (outGenre && outGenre.indexOf(genre) > -1) {
        return "e" + dic[genre];
    }
    return "";
}

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$3 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter$5 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve$$1, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve$$1(result.value) : new P(function (resolve$$1) { resolve$$1(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$5 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _$$1 = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_$$1) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _$$1.label++; return { value: op[1], done: false };
                case 5: _$$1.label++; y = op[1]; op = [0]; continue;
                case 7: op = _$$1.ops.pop(); _$$1.trys.pop(); continue;
                default:
                    if (!(t = _$$1.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _$$1 = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _$$1.label = op[1]; break; }
                    if (op[0] === 6 && _$$1.label < t[1]) { _$$1.label = t[1]; t = op; break; }
                    if (t && _$$1.label < t[2]) { _$$1.label = t[2]; _$$1.ops.push(op); break; }
                    if (t[2]) _$$1.ops.pop();
                    _$$1.trys.pop(); continue;
            }
            op = body.call(thisArg, _$$1);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Batoto = (function (_super) {
    __extends$4(Batoto, _super);
    function Batoto() {
        var _this = _super.call(this, config$8, new Parser$4(), new Helper$4(), strategy) || this;
        _this._urlCache = {};
        return _this;
    }
    Batoto.prototype.resolveMangaUrl = function (name) {
        return __awaiter$5(this, void 0, void 0, function () {
            var filter, filterResults, page, results, result, _i, results_1, obj;
            return __generator$5(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._urlCache[name]) {
                            return [2 /*return*/, this._urlCache[name]];
                        }
                        filter = { search: { name: { name: name, condition: FilterCondition.EndsWith } } };
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
                            this._urlCache[obj.name] = obj.src;
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
        return __awaiter$5(this, void 0, void 0, function () {
            var search, doc, mangas;
            return __generator$5(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("filter mangas with: %o", filter);
                        search = processFilter$4(filter);
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
    Batoto.prototype.resolveChapterSource = function (name, chapter) {
        return __awaiter$5(this, void 0, void 0, function () {
            var src;
            return __generator$5(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.resolveChapterSource.call(this, name, chapter)];
                    case 1:
                        src = _a.sent();
                        if (!src) {
                            return [2 /*return*/, src];
                        }
                        return [2 /*return*/, Parser$4.convertChapterReaderUrl(src)];
                }
            });
        });
    };
    Batoto.prototype.buildChapterRequest = function (url$$1) {
        var opts = _super.prototype.buildRequest.call(this, url$$1);
        opts.headers = __assign$3({}, opts.headers, { Referer: "http://bato.to/reader" });
        return opts;
    };

    Batoto.prototype.isLoggedIn = function () {
        return __awaiter$5(this, void 0, void 0, function () {
            var html, match;
            return __generator$5(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHtml("http://bato.to/search")];
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
        return __awaiter$5(this, void 0, void 0, function () {
            var url$$1, request, $, authKey, body, html;
            return __generator$5(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url$$1 = "http://bato.to/forums/index.php?app=core&module=global&section=login&do=process";
                        request = this.buildRequest(url$$1);
                        return [4 /*yield*/, this.getDoc(request)];
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
                        request = __assign$3({}, request, { formData: body });
                        return [4 /*yield*/, this.request.postHtml(request)];
                    case 2:
                        html = _a.sent();
                        return [2 /*return*/, !!html.match(/<strong>You are now signed in<\/strong>/m)];
                }
            });
        });
    };
    return Batoto;
}(MangaSite));
var manga$8 = new Batoto();

exports.mangafox = manga;
exports.mangahere = manga$2;
exports.mangapanda = manga$4;
exports.kissmanga = manga$6;
exports.batoto = manga$8;

/**
 * Created by rodriguesc on 24/03/2017.
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
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var lodash_1 = require("lodash");
var util_1 = require("util");
var url_1 = require("url");
var MangaSite = (function () {
    function MangaSite(config, parser, nameHelper, request) {
        this.debug = debug("gin-downloader:" + config.name);
        this.verbose = debug("gin-downloader:" + config.name + ":verbose");
        this._config = config;
        this._nameHelper = nameHelper;
        this._parser = parser;
        this._request = request;
    }
    Object.defineProperty(MangaSite.prototype, "parser", {
        get: function () {
            return this._parser;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MangaSite.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MangaSite.prototype, "nameHelper", {
        get: function () {
            return this._nameHelper;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MangaSite.prototype, "request", {
        get: function () {
            return this._request;
        },
        enumerable: true,
        configurable: true
    });
    ;
    MangaSite.prototype.mangas = function () {
        var _this = this;
        this.debug("getting mangas");
        return this.request.getDoc(this.config.mangas_url)
            .then(this.parser.mangas)
            .tap(function (x) { return _this.debug("mangas: " + x.length); });
    };
    MangaSite.prototype.latest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("getting latest");
                        return [4 /*yield*/, this.request.getDoc(this.config.latest_url).then(this.parser.latest)];
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
            var src, info, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            throw new Error("Please provide a name");
                        }
                        this.debug("getting info for " + name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        src = this.nameHelper.resolveUrl(name);
                        return [4 /*yield*/, this.request.getDoc(src).then(this.parser.info)];
                    case 2:
                        info = _a.sent();
                        this.verbose("info:%o", info);
                        this.debug("got info for " + name);
                        return [2 /*return*/, info];
                    case 3:
                        e_1 = _a.sent();
                        this.debug(e_1);
                        throw new Error(name + " not found!");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.chapters = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var src, chapters, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            throw new Error("Please provide a name");
                        }
                        this.debug("getting chapters for " + name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        src = this.nameHelper.resolveUrl(name);
                        return [4 /*yield*/, this.request.getDoc(src).then(this.parser.chapters)];
                    case 2:
                        chapters = _a.sent();
                        this.verbose("chapters:%o", chapters);
                        this.debug("got chapters for " + name);
                        return [2 /*return*/, chapters];
                    case 3:
                        e_2 = _a.sent();
                        this.debug(e_2);
                        throw new Error(name + " not found!");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.infoChapters = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var src, doc, info, chapters, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            throw new Error("Please provide a name");
                        }
                        this.debug("getting info & chapters for " + name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        src = this.nameHelper.resolveUrl(name);
                        return [4 /*yield*/, this.request.getDoc(src)];
                    case 2:
                        doc = _a.sent();
                        return [4 /*yield*/, this.parser.info(doc)];
                    case 3:
                        info = _a.sent();
                        return [4 /*yield*/, this.parser.chapters(doc)];
                    case 4:
                        chapters = _a.sent();
                        this.verbose("info:%o\nchapters:%o", chapters);
                        this.debug("got info & chapters for " + name);
                        return [2 /*return*/, { info: info, chapters: chapters }];
                    case 5:
                        e_3 = _a.sent();
                        this.debug(e_3);
                        throw new Error(name + " not found!");
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MangaSite.prototype.images = function (name, chapter) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chap, paths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name) {
                            throw new Error("Please provide a name");
                        }
                        if (!chapter) {
                            throw new Error("Please provide a chapter");
                        }
                        if (!util_1.isNumber(chapter)) {
                            throw new Error("Please provide a valid chapter");
                        }
                        this.debug("getting images for %s : %s", name, chapter);
                        return [4 /*yield*/, this.resolveChapterSource(name, chapter)];
                    case 1:
                        chap = _a.sent();
                        return [4 /*yield*/, this.request.getDoc(chap).then(this.parser.imagesPaths)];
                    case 2:
                        paths = _a.sent();
                        return [2 /*return*/, paths.map(function (x) { return MangaSite.processImagePath(x, _this.parser, _this.request); })];
                }
            });
        });
    };
    MangaSite.prototype.resolveChapterSource = function (name, chapter) {
        return __awaiter(this, void 0, void 0, function () {
            var chapters, chap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chapters(name)];
                    case 1:
                        chapters = _a.sent();
                        chap = lodash_1.find(chapters, { number: chapter });
                        this.verbose("filtered chapters %o", chap);
                        if (!chap) {
                            throw new Error("Chapter not found");
                        }
                        return [2 /*return*/, chap.src];
                }
            });
        });
    };
    MangaSite.processImagePath = function (src, parser, request) {
        return __awaiter(this, void 0, void 0, function () {
            var image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.getHtml(src).then(parser.image)];
                    case 1:
                        image = _a.sent();
                        return [2 /*return*/, {
                                name: url_1.parse(image).pathname.split("/").reverse()[0],
                                src: image
                            }];
                }
            });
        });
    };
    return MangaSite;
}());
exports.MangaSite = MangaSite;
//# sourceMappingURL=mangasite.js.map
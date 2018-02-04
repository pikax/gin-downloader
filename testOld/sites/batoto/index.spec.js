"use strict";
/**
 * Created by rodriguesc on 06/03/2017.
 */
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("./../../common");
var batoto_1 = require("./../../../src/sites/batoto");
var _results_1 = require("./_results");
var auth_1 = require("./auth");
var declarations_1 = require("../../../src/declarations");
var common_1 = require("../../common");
var config_1 = require("../../../src/sites/batoto/config");
var nock = require("nock");
describe("Batoto live", function () {
    it("should get all mangas", function () { return __awaiter(_this, void 0, void 0, function () {
        var mangas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                            .replyWithFile(200, __dirname + "/html/mangas.html");
                    }
                    return [4 /*yield*/, batoto_1.manga.mangas()];
                case 1:
                    mangas = _a.sent();
                    mangas.should.have.length.gte(_results_1.default.mangas_count);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should get latest chaps", function () { return __awaiter(_this, void 0, void 0, function () {
        var mangas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/")
                            .replyWithFile(200, __dirname + "/html/latest.html");
                    }
                    return [4 /*yield*/, batoto_1.manga.latest()];
                case 1:
                    mangas = _a.sent();
                    mangas.should.have.length.gte(90);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should get info", function () { return __awaiter(_this, void 0, void 0, function () {
        var name, info, _i, _a, genre;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/search_ajax?name=Gintama&name_cond=e&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                            .replyWithFile(200, __dirname + "/html/searchGintama.html");
                        nock(config_1.config.site)
                            .get("/comic/_/comics/gintama-r94")
                            .replyWithFile(200, __dirname + "/html/Gintama.html");
                    }
                    name = "Gintama";
                    return [4 /*yield*/, batoto_1.manga.info(name)];
                case 1:
                    info = _b.sent();
                    info.should.exist;
                    info.title.should.be.eq(_results_1.default.manga.title);
                    // info.released.should.be.eq(results.manga.released);
                    info.synopsis.should.contain(_results_1.default.manga.synopsis);
                    info.status.should.be.eq(_results_1.default.manga.status);
                    info.synonyms.should.be.deep.eq(_results_1.default.manga.synonyms);
                    info.authors.map(function (x) { return x.toLowerCase(); }).should.be.deep.eq(_results_1.default.manga.authors); // the website keeps changing between lower and uppercase
                    info.artists.map(function (x) { return x.toLowerCase(); }).should.be.deep.eq(_results_1.default.manga.artists); // the website keeps changing between lower and uppercase
                    for (_i = 0, _a = _results_1.default.manga.genres; _i < _a.length; _i++) {
                        genre = _a[_i];
                        info.genres.should.be.contain(genre);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it("should resolve name to name", function () { return __awaiter(_this, void 0, void 0, function () {
        var mangas, _i, mangas_1, obj, expected, origName, finalUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        return [2 /*return*/]; // do not resolve, just complete
                    }
                    return [4 /*yield*/, batoto_1.manga.mangas()];
                case 1:
                    mangas = _a.sent();
                    _i = 0, mangas_1 = mangas;
                    _a.label = 2;
                case 2:
                    if (!(_i < mangas_1.length)) return [3 /*break*/, 5];
                    obj = mangas_1[_i];
                    expected = obj.src;
                    origName = obj.name;
                    return [4 /*yield*/, batoto_1.manga.resolveMangaUrl(origName)];
                case 3:
                    finalUrl = _a.sent();
                    finalUrl.should.be.eq(expected, "with name \"" + origName + "\"");
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("should not find manga by name", function () { return __awaiter(_this, void 0, void 0, function () {
        var name, chapter, images, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/AdvanceSearch")
                            .replyWithFile(200, __dirname + "/html/mangas.html");
                    }
                    name = "my stupid name";
                    chapter = 1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, batoto_1.manga.images(name, chapter)];
                case 2:
                    images = _a.sent();
                    images.should.be.null;
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    e_1.should.be.Throw;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should not find get chapters", function () { return __awaiter(_this, void 0, void 0, function () {
        var name, chapters, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "Gintamass";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, batoto_1.manga.chapters(name)];
                case 2:
                    chapters = _a.sent();
                    chapters.should.be.null;
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    e_2.should.be.Throw;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should not find chapter", function () { return __awaiter(_this, void 0, void 0, function () {
        var name, chapter, images, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/search_ajax?name=Gintama&name_cond=e&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                            .replyWithFile(200, __dirname + "/html/searchGintama.html");
                        nock(config_1.config.site)
                            .get("/comic/_/comics/gintama-r94")
                            .replyWithFile(200, __dirname + "/html/Gintama.html");
                    }
                    name = "Gintama";
                    chapter = -354564;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, batoto_1.manga.images(name, chapter)];
                case 2:
                    images = _a.sent();
                    images.should.be.null;
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    e_3.should.be.Throw;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should not find images chapter ", function () { return __awaiter(_this, void 0, void 0, function () {
        var name, chapter, images, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/search_ajax?name=Gintama&name_cond=e&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                            .replyWithFile(200, __dirname + "/html/searchGintama.html");
                        nock(config_1.config.site)
                            .get("/comic/_/comics/gintama-r94")
                            .replyWithFile(200, __dirname + "/html/Gintama.html");
                    }
                    name = "Gintama";
                    chapter = -5151;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, batoto_1.manga.images(name, chapter)];
                case 2:
                    images = _a.sent();
                    images.should.be.null;
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    e_4.should.be.Throw;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should get chapters", function () { return __awaiter(_this, void 0, void 0, function () {
        var name, chapters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/search_ajax?name=Gintama&name_cond=e&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                            .replyWithFile(200, __dirname + "/html/searchGintama.html");
                        nock(config_1.config.site)
                            .get("/comic/_/comics/gintama-r94")
                            .replyWithFile(200, __dirname + "/html/Gintama.html");
                    }
                    name = "Gintama";
                    return [4 /*yield*/, batoto_1.manga.chapters(name)];
                case 1:
                    chapters = _a.sent();
                    chapters.should.have.length.gte(_results_1.default.chapter_count);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should get Gintama : chapter 635", function () { return __awaiter(_this, void 0, void 0, function () {
        var name, chapter, images, img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/search_ajax?name=Gintama&name_cond=e&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                            .replyWithFile(200, __dirname + "/html/searchGintama.html");
                        nock(config_1.config.site)
                            .get("/comic/_/comics/gintama-r94")
                            .replyWithFile(200, __dirname + "/html/Gintama.html");
                        // nock(config.site)
                        //   .get("/areader?id=e37a90922a3aa108&p=1")
                        //   .replyWithFile(200, __dirname + "/html/ch001.html");
                        nock(config_1.config.site)
                            .get(/areader/)
                            .replyWithFile(200, __dirname + "/html/ch001.html")
                            .persist();
                    }
                    name = "Gintama";
                    chapter = 635;
                    return [4 /*yield*/, batoto_1.manga.images(name, chapter)];
                case 1:
                    images = _a.sent();
                    images.should.to.exist;
                    images.should.have.length.gte(17);
                    return [4 /*yield*/, images[0]];
                case 2:
                    img = _a.sent();
                    img.src.should.contain("http://img.bato.to/comics/2017/05/");
                    return [2 /*return*/];
            }
        });
    }); });
    describe("filter", function () {
        it("should filter by name", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=Gintama&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/searchGintama.html");
                        }
                        filter = {
                            name: "Gintama"
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(4);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://bato.to/comic/_/gintama-r94",
                            status: "Open",
                            mature: false
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should filter by name endWith", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=Gintama&name_cond=e&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/searchGintama.html");
                        }
                        filter = {
                            search: {
                                name: {
                                    name: "Gintama",
                                    condition: declarations_1.FilterCondition.EndsWith
                                }
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://bato.to/comic/_/gintama-r94",
                            status: "Open",
                            mature: false
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should filter by name startsWith", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=Gintama&name_cond=s&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/searchGintama.html");
                        }
                        filter = {
                            search: {
                                name: {
                                    name: "Gintama",
                                    condition: declarations_1.FilterCondition.StartsWith
                                }
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(4);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://bato.to/comic/_/gintama-r94",
                            status: "Open",
                            mature: false
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should filter by in genre", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=&&artist_name=&&genres=i1;i2;i3;i8;i20;i33&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/filter/byGenre.html");
                        }
                        filter = {
                            search: {
                                genre: {
                                    inGenres: [declarations_1.Genre.Action, declarations_1.Genre.Adventure, declarations_1.Genre.Comedy, declarations_1.Genre.Historical, declarations_1.Genre.SciFi, declarations_1.Genre.Shounen]
                                }
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://bato.to/comic/_/gintama-r94",
                            status: "Open",
                            mature: false
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should filter by out genre", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=gin&name_cond=s&artist_name=Sora&artist_name_cond=c&genres=e6&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/filter/outGenre.html");
                        }
                        filter = {
                            search: {
                                name: {
                                    name: "gin",
                                    condition: declarations_1.FilterCondition.StartsWith
                                },
                                author: {
                                    name: "Sora",
                                },
                                genre: {
                                    outGenres: [declarations_1.Genre.Romance]
                                }
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://bato.to/comic/_/gintama-r94",
                            status: "Open",
                            mature: false
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should filter by Author", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=&&artist_name=Sorachi&artist_name_cond=c&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/filter/byAuthor.html");
                        }
                        filter = {
                            search: {
                                author: {
                                    name: "Sorachi",
                                }
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.length.lte(10);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://bato.to/comic/_/gintama-r94",
                            status: "Open",
                            mature: false
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should filter by Status", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=kenichi&name_cond=c&artist_name=&&genres=&genre_cond=and&status=c&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/filter/byCompleted.html");
                        }
                        filter = {
                            search: {
                                status: declarations_1.FilterStatus.Complete,
                                name: {
                                    name: "kenichi"
                                }
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "History's Strongest Disciple Kenichi",
                            src: "http://bato.to/comic/_/historys-strongest-disciple-kenichi-r6",
                            status: "Open",
                            mature: false
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should filter by Type", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=kr&mature=y&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/filter/byType.html");
                        }
                        filter = {
                            search: {
                                type: declarations_1.FilterMangaType.Manhwa
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "10, 20, and 30",
                            src: "http://bato.to/comic/_/10-20-and-30-r16192",
                            status: "Closed",
                            mature: false,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should get by order", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (common_1._MOCK_) {
                    nock(config_1.config.site)
                        .get("/AdvanceSearch")
                        .replyWithFile(200, __dirname + "/html/mangas.html");
                }
                throw new Error("not implemented");
            });
        }); });
        it("should not include mature", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=ginta&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=n&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/filter/noMature.html");
                        }
                        filter = {
                            name: "ginta",
                            search: {
                                mature: false,
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.not.deep.include({
                            name: "Gintama - Iroha Uta (Doujinshi)",
                            src: "http://bato.to/comic/_/gintama-iroha-uta-doujinshi-r11951",
                            status: "Open",
                            mature: true
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should have rating between 5~5", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=5&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/filter/rating5~5.html");
                        }
                        filter = {
                            search: {
                                rating: {
                                    from: 5,
                                    to: 5
                                }
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "A Girl In The Clouds",
                            src: "http://bato.to/comic/_/a-girl-in-the-clouds-r21070",
                            status: "Open",
                            mature: false,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should have rating between 0~1", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=&&artist_name=&&genres=&genre_cond=and&status=&type=null&mature=y&rating_low=1&rating_high=1&p=1")
                                .replyWithFile(200, __dirname + "/html/filter/rating0~1.html");
                        }
                        filter = {
                            search: {
                                rating: {
                                    from: 1,
                                    to: 1
                                }
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "A Bittersweet Life",
                            src: "http://bato.to/comic/_/a-bittersweet-life-r6684",
                            status: "Open",
                            mature: false,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should have genre inclusion OR", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            nock(config_1.config.site)
                                .get("/search_ajax?name=ginta&&artist_name=&&genres=i34;i35;i38&genre_cond=or&status=&type=null&mature=y&rating_low=0&rating_high=5&p=1")
                                .replyWithFile(200, __dirname + "/html/filter/genreOr.html");
                        }
                        filter = {
                            name: "ginta",
                            search: {
                                genre: {
                                    condition: declarations_1.GenreCondition.Or,
                                    inGenres: [declarations_1.Genre.Josei, declarations_1.Genre.Oneshot, declarations_1.Genre.Shoujo]
                                }
                            }
                        };
                        return [4 /*yield*/, batoto_1.manga.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "Gintama - Iroha Uta (Doujinshi)",
                            src: "http://bato.to/comic/_/gintama-iroha-uta-doujinshi-r11951",
                            status: "Open",
                            mature: true
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Loggin", function () {
        it("should be not logged in", function () { return __awaiter(_this, void 0, void 0, function () {
            var loggedIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, batoto_1.manga.isLoggedIn()];
                    case 1:
                        loggedIn = _a.sent();
                        loggedIn.should.be.false;
                        return [2 /*return*/];
                }
            });
        }); });
        it("should login", function () { return __awaiter(_this, void 0, void 0, function () {
            var loggedIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            return [2 /*return*/];
                        }
                        if (!auth_1.default.username) {
                            console.warn("no credential founds, not running login");
                        }
                        return [4 /*yield*/, batoto_1.manga.logIn(auth_1.default.username, auth_1.default.password)];
                    case 1:
                        loggedIn = _a.sent();
                        loggedIn.should.be.true;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=index.spec.js.map
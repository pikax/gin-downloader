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
var nock = require("nock");
var src_1 = require("./../../../src");
var _results_1 = require("./_results");
var declarations_1 = require("../../../src/declarations");
var config_1 = require("../../../src/sites/mangafox/config");
var common_1 = require("../../common");
describe("MangaFox live", function () {
    it("should get all mangas", function () { return __awaiter(_this, void 0, void 0, function () {
        var mangas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/manga/")
                            .replyWithFile(200, __dirname + "/html/mangas.html");
                    }
                    return [4 /*yield*/, src_1.mangafox.mangas()];
                case 1:
                    mangas = _a.sent();
                    mangas.should.have.length.gte(_results_1.default.mangas_count);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should get latest chaps", function () { return __awaiter(_this, void 0, void 0, function () {
        var latest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/releases/")
                            .replyWithFile(200, __dirname + "/html/latest.html");
                    }
                    return [4 /*yield*/, src_1.mangafox.latest()];
                case 1:
                    latest = _a.sent();
                    latest.should.to.have.length.gte(90);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should get info", function () { return __awaiter(_this, void 0, void 0, function () {
        var name, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/manga/gintama/")
                            .replyWithFile(200, __dirname + "/html/Gintama.html");
                    }
                    name = "Gintama";
                    return [4 /*yield*/, src_1.mangafox.info(name)];
                case 1:
                    info = _a.sent();
                    info.should.exist;
                    info.title.should.be.eq(_results_1.default.manga.title);
                    info.released.should.be.eq(_results_1.default.manga.released);
                    info.synopsis.should.contain(_results_1.default.manga.synopsis);
                    info.status.should.be.eq(_results_1.default.manga.status);
                    info.synonyms.should.be.deep.eq(_results_1.default.manga.synonyms);
                    info.authors.should.be.deep.eq(_results_1.default.manga.authors);
                    info.artists.should.be.deep.eq(_results_1.default.manga.artists);
                    info.genres.should.be.deep.eq(_results_1.default.manga.genres);
                    info.scanlators.should.be.deep.eq(_results_1.default.manga.scanlators);
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
                        nock(config_1.config.site)
                            .get("/manga/")
                            .replyWithFile(200, __dirname + "/html/mangas.html");
                    }
                    return [4 /*yield*/, src_1.mangafox.mangas()];
                case 1:
                    mangas = _a.sent();
                    for (_i = 0, mangas_1 = mangas; _i < mangas_1.length; _i++) {
                        obj = mangas_1[_i];
                        expected = obj.src;
                        origName = obj.name;
                        finalUrl = src_1.mangafox.resolveMangaUrl(origName);
                        finalUrl.should.be.eq(expected, "with name \"" + origName + "\"");
                    }
                    return [2 /*return*/];
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
                            .get("/Manga/my-stupid-name")
                            .reply(404);
                    }
                    name = "my stupid name";
                    chapter = 1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, src_1.mangafox.images(name, chapter)];
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
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/Manga/Gintamass")
                            .reply(404);
                    }
                    name = "Gintamass";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, src_1.mangafox.chapters(name)];
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
                    // chapters
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/manga/gintama")
                            .replyWithFile(200, __dirname + "/html/Gintama.html");
                    }
                    name = "Gintama";
                    chapter = -354564;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, src_1.mangafox.images(name, chapter)];
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
                            .get("/manga/gintama")
                            .replyWithFile(200, __dirname + "/html/Gintama.html");
                    }
                    name = "Gintama";
                    chapter = -5151;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, src_1.mangafox.images(name, chapter)];
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
        var name, chapters, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/manga/gintama")
                            .replyWithFile(200, __dirname + "/html/Gintama.html");
                    }
                    name = "Gintama";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, src_1.mangafox.chapters(name)];
                case 2:
                    chapters = _a.sent();
                    chapters.should.be.null;
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    e_5.should.be.Throw;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("should get Zui Wu Dao : chapter 42", function () { return __awaiter(_this, void 0, void 0, function () {
        var name, chapter, images, img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /*start*/
                    if (common_1._MOCK_) {
                        nock(config_1.config.site)
                            .get("/manga/zui_wu_dao/")
                            .replyWithFile(200, __dirname + "/html/ZuiWuDao.html");
                        nock(config_1.config.site)
                            .get(/manga\/zui_wu_dao\/c042/)
                            .replyWithFile(200, __dirname + "/html/c042.html")
                            .persist();
                    }
                    name = "Zui Wu Dao";
                    chapter = 42;
                    return [4 /*yield*/, src_1.mangafox.images(name, chapter)];
                case 1:
                    images = _a.sent();
                    images.should.to.exist;
                    images.should.have.length.gte(17);
                    return [4 /*yield*/, images[0]];
                case 2:
                    img = _a.sent();
                    img.src.should.contain(".net/store/manga/15973/042.0/compressed/k001.jpg");
                    return [2 /*return*/];
            }
        });
    }); });
    describe("filter", function () {
        beforeEach(function (done) {
            setTimeout(done, 5000);
        });
        it("should filter by name", function () { return __awaiter(_this, void 0, void 0, function () {
            var filter, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (common_1._MOCK_) {
                            // filter by Name
                            nock(config_1.config.site)
                                .get("/search.php?name_method=cw&name=Gintama&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
                                .replyWithFile(200, __dirname + "/html/filter/byName.html");
                        }
                        filter = {
                            name: "Gintama"
                        };
                        return [4 /*yield*/, src_1.mangafox.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(14);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://mangafox.me/manga/gintama/",
                            mature: false,
                            status: "Ongoing"
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
                            // filter by Name
                            nock(config_1.config.site)
                                .get("/search.php?name_method=ew&name=Gintama&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
                                .replyWithFile(200, __dirname + "/html/filter/byName.html");
                        }
                        filter = {
                            search: {
                                name: {
                                    name: "Gintama",
                                    condition: declarations_1.FilterCondition.EndsWith
                                }
                            }
                        };
                        return [4 /*yield*/, src_1.mangafox.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://mangafox.me/manga/gintama/",
                            mature: false,
                            status: "Ongoing"
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
                            // filter by Name
                            nock(config_1.config.site)
                                .get("/search.php?name_method=bw&name=Gintama&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
                                .replyWithFile(200, __dirname + "/html/filter/byName.html");
                        }
                        filter = {
                            search: {
                                name: {
                                    name: "Gintama",
                                    condition: declarations_1.FilterCondition.StartsWith
                                }
                            }
                        };
                        return [4 /*yield*/, src_1.mangafox.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(14);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://mangafox.me/manga/gintama/",
                            mature: false,
                            status: "Ongoing"
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
                            // filter by Name
                            nock(config_1.config.site)
                                .get("/search.php?name_method=cw&name=&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=1&genres%5BAdult%5D=0&genres%5BAdventure%5D=1&genres%5BComedy%5D=1&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=1&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=1&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=1&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=1&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=1&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
                                .replyWithFile(200, __dirname + "/html/filter/byGenre.html");
                        }
                        filter = {
                            search: {
                                genre: [declarations_1.Genre.Action, declarations_1.Genre.Adventure, declarations_1.Genre.Comedy, declarations_1.Genre.Drama, declarations_1.Genre.Historical, declarations_1.Genre.SciFi, declarations_1.Genre.Shounen, declarations_1.Genre.Supernatural]
                            }
                        };
                        return [4 /*yield*/, src_1.mangafox.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length(1);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://mangafox.me/manga/gintama/",
                            mature: false,
                            status: "Ongoing"
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
                            // filter by Name
                            nock(config_1.config.site)
                                .get("/search.php?name_method=bw&name=gin&type=&author_method=cw&author=Sora&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=2&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
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
                        return [4 /*yield*/, src_1.mangafox.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://mangafox.me/manga/gintama/",
                            mature: false,
                            status: "Ongoing"
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
                            // filter by Name
                            nock(config_1.config.site)
                                .get("/search.php?name_method=cw&name=&type=&author_method=cw&author=Sorachi&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
                                .replyWithFile(200, __dirname + "/html/filter/byAuthor.html");
                        }
                        filter = {
                            search: {
                                author: {
                                    name: "Sorachi",
                                }
                            }
                        };
                        return [4 /*yield*/, src_1.mangafox.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.length.lte(10);
                        mangas.results.should.deep.include({
                            name: "Gintama",
                            src: "http://mangafox.me/manga/gintama/",
                            mature: false,
                            status: "Ongoing"
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
                            // filter by Name
                            nock(config_1.config.site)
                                .get("/search.php?name_method=cw&name=kenichi&type=&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
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
                        return [4 /*yield*/, src_1.mangafox.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "History's Strongest Disciple Kenichi",
                            src: "http://mangafox.me/manga/history_s_strongest_disciple_kenichi/",
                            mature: false,
                            status: declarations_1.FilterStatus.Complete.toString()
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
                            // filter by Name
                            nock(config_1.config.site)
                                .get("/search.php?name_method=cw&name=&type=2&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdult%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSmut%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BWebtoons%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&rating_method=eq&rating=&is_completed=&advopts=1")
                                .replyWithFile(200, __dirname + "/html/filter/byType.html");
                        }
                        filter = {
                            search: {
                                type: declarations_1.FilterMangaType.Manhwa
                            }
                        };
                        return [4 /*yield*/, src_1.mangafox.filter(filter)];
                    case 1:
                        mangas = _a.sent();
                        mangas.results.should.length.gte(1);
                        mangas.results.should.deep.include({
                            name: "10, 20, and 30",
                            src: "http://mangafox.me/manga/10_20_and_30/",
                            mature: false,
                            status: "Complete"
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});

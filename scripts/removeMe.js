"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../dist/index");
var index_2 = require("../dist/index");
var fs_extra_1 = require("fs-extra");
var lodash_1 = require("lodash");
//
// batoto.login("", "")
// .then(async (x)=>{
//
//   const html = await ginConfig.config.sites.batoto.request("http://bato.to/comic/_/comics/mi-seijuku-r19038");
//   // const html = await ginConfig.config.sites.batoto.request("http://bato.to/comic/_/comics/gintama-r94");
//
//   const doc = parseDoc(html)
//
//   var info = batoto.parser.info(doc);
//   console.log(info);
//
//     var chap = batoto.parser.chapters(doc);
//
//   console.log(chap);
//
// });
var mangas = [
    // "Ansatsu Kyoushitsu",
    // "Beelzebub",
    // "Berserk",
    // "Bleach",
    // "Blood Lad",
    // "Fairy Tail",
    // "Gintama",
    "Hungry Joker",
    // " Hunter x Hunter",
    "Magi",
    "Naruto",
    "Shijou Saikyou no Deshi Kenichi",
    "Toriko",
    "Vagabond",
    "Katekyo Hitman Reborn!",
    "Psyren",
    "xxxHOLiC",
    "One Piece",
    "Akame ga Kill!",
    "Holyland",
    "One Punch-Man",
    "Vinland Saga",
];
index_1.batoto.login("pikax", "carlos").then(function () { return __awaiter(_this, void 0, void 0, function () {
    var i, result, _loop_1, _i, mangas_1, m;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index_1.ginConfig.use = {
                    interval: 1000,
                    maxRetries: 500,
                };
                i = 119;
                _loop_1 = function (m) {
                    var murl, o;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, index_1.batoto.resolveMangaUrl(m)];
                            case 1:
                                murl = _a.sent();
                                return [4 /*yield*/, index_1.batoto.infoChapters(m)];
                            case 2:
                                result = _a.sent();
                                console.log(result.title);
                                if (!result) {
                                    console.error(result);
                                    return [2 /*return*/, "continue"];
                                }
                                console.log(murl);
                                o = new index_2.SuperObject(m, index_1.batoto, murl);
                                /*const p =  await*/
                                return [4 /*yield*/, processObject(o).catch(function (x) { return fs_extra_1.appendFile(__dirname + "/test/failed.txt", "{\"name\":" + JSON.stringify(m) + ", \"url\":" + JSON.stringify(murl) + "}\n"); })];
                            case 3:
                                /*const p =  await*/
                                _a.sent();
                                // cc.push(p);
                                console.log('finished');
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, mangas_1 = mangas;
                _a.label = 1;
            case 1:
                if (!(_i < mangas_1.length)) return [3 /*break*/, 4];
                m = mangas_1[_i];
                return [5 /*yield**/, _loop_1(m)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); });
function processObject(o) {
    return __awaiter(this, void 0, void 0, function () {
        var info, pi, pc, _i, _a, chap;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, o.update()];
                case 1:
                    info = _b.sent();
                    pi = fs_extra_1.outputJson(__dirname + "/test/" + lodash_1.escapeRegExp(o.name) + "/info.json", info);
                    pc = [];
                    for (_i = 0, _a = o.chapters; _i < _a.length; _i++) {
                        chap = _a[_i];
                        pc.push(processChapter(chap));
                    }
                    return [2 /*return*/, Promise.all([pi].concat(pc))];
            }
        });
    });
}
function processChapter(c) {
    return __awaiter(this, void 0, void 0, function () {
        var pi, images, n;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, c.fetch()];
                case 1:
                    pi = _a.sent();
                    return [4 /*yield*/, Promise.all(pi.map(function (x) { return x.value; }))];
                case 2:
                    images = _a.sent();
                    n = __assign({}, c.source, { images: images });
                    return [4 /*yield*/, fs_extra_1.outputJson(__dirname + "/test/" + lodash_1.escapeRegExp(c.master.name) + "/" + c.source.chap_number + ".json", n)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=removeMe.js.map
"use strict";
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
/**
 * Created by rodriguesc on 03/03/2017.
 */
var mangasite_1 = require("../../common/mangasite");
var parser_1 = require("./parser");
var config_1 = require("./config");
var names_1 = require("./names");
var filter_1 = require("./filter");
var requestRetryStrategy_1 = require("../../request/requestRetryStrategy");
var MangaHere = (function (_super) {
    __extends(MangaHere, _super);
    function MangaHere() {
        return _super.call(this, config_1.config, new parser_1.Parser(), new names_1.Helper(), requestRetryStrategy_1.strategy) || this;
    }
    MangaHere.prototype.filter = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var search, doc, mangas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug("filter mangas with: %o", filter);
                        search = filter_1.processFilter(filter);
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
}(mangasite_1.MangaSite));
exports.MangaHere = MangaHere;
exports.manga = new MangaHere();
exports.default = exports.manga;
//# sourceMappingURL=index.js.map
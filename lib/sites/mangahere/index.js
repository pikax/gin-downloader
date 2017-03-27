"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by rodriguesc on 03/03/2017.
 */
var mangasite_1 = require("../../common/mangasite");
var parser_1 = require("./parser");
var config_1 = require("./config");
var names_1 = require("./names");
var MangaHere = (function (_super) {
    __extends(MangaHere, _super);
    function MangaHere() {
        return _super.call(this, config_1.config, parser_1.parser, names_1.helper) || this;
    }
    return MangaHere;
}(mangasite_1.MangaSite));
exports.MangaHere = MangaHere;
exports.manga = new MangaHere();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.manga;
//# sourceMappingURL=index.js.map
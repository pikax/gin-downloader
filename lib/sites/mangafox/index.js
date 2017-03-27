/**
 * Created by david on 24/03/2017.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mangasite_1 = require("../../common/mangasite");
var parser_1 = require("./parser");
var config_1 = require("./config");
var names_1 = require("./names");
var MangaFox = (function (_super) {
    __extends(MangaFox, _super);
    function MangaFox() {
        return _super.call(this, config_1.config, parser_1.parser, names_1.helper) || this;
    }
    return MangaFox;
}(mangasite_1.MangaSite));
exports.MangaFox = MangaFox;
exports.manga = new MangaFox();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.manga;
//# sourceMappingURL=index.js.map
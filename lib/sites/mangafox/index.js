/**
 * Created by david on 24/03/2017.
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var mangasite_1 = require("../../common/mangasite");
var parser_1 = require("./parser");
var config_1 = require("./config");
var names_1 = require("./names");
var request_1 = require("../../common/request");
var MangaFox = (function (_super) {
    __extends(MangaFox, _super);
    function MangaFox() {
        return _super.call(this, config_1.config, new parser_1.Parser, new names_1.Helper(), request_1.request) || this;
    }
    return MangaFox;
}(mangasite_1.MangaSite));
exports.MangaFox = MangaFox;
exports.manga = new MangaFox();
exports.default = exports.manga;
//# sourceMappingURL=index.js.map
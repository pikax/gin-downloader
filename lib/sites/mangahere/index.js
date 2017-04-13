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
/**
 * Created by rodriguesc on 03/03/2017.
 */
var mangasite_1 = require("../../common/mangasite");
var parser_1 = require("./parser");
var config_1 = require("./config");
var names_1 = require("./names");
var request_1 = require("../../common/request");
var MangaHere = (function (_super) {
    __extends(MangaHere, _super);
    function MangaHere() {
        return _super.call(this, config_1.config, new parser_1.Parser(), new names_1.Helper(), request_1.request) || this;
    }
    return MangaHere;
}(mangasite_1.MangaSite));
exports.MangaHere = MangaHere;
exports.manga = new MangaHere();
exports.default = exports.manga;
//# sourceMappingURL=index.js.map
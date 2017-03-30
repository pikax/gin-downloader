"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by david on 19/03/2017.
 */
var url_1 = require("url");
var config_1 = require("./config");
var NON_WORD_REGEXP = require("no-case/vendor/non-word-regexp");
var names = {};
var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        if (names.hasOwnProperty(name)) {
            return names[name];
        }
        var n = name.replace(NON_WORD_REGEXP, "-");
        return n;
        // return noCase(name, null, "-");
    };
    Helper.prototype.resolveUrl = function (name) {
        return url_1.resolve(config_1.config.site + "Manga/", this.toName(name));
    };
    return Helper;
}());
exports.Helper = Helper;
exports.helper = new Helper();
exports.default = exports.helper;
//# sourceMappingURL=names.js.map
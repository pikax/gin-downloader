/**
 * Created by david on 19/03/2017.
 */
"use strict";
var config_1 = require("./config");
var url_1 = require("url");
var noCase = require("no-case");
var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        var n = name.replace(/[^\x00-\x7F]/g, "_");
        return noCase(n.toLowerCase(), null, "_");
    };
    Helper.prototype.resolveUrl = function (name) {
        return url_1.resolve(config_1.config.site + "/manga/", this.toName(name) + "/");
    };
    return Helper;
}());
exports.Helper = Helper;
exports.helper = new Helper();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.helper;
//# sourceMappingURL=names.js.map
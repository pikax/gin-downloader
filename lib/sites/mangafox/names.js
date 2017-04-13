"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by david on 19/03/2017.
 */
var url_1 = require("url");
var config_1 = require("./config");
var noCase = require("no-case");
var names = {
    "Renai Tsuu -Akka-": "renaitsuu_akka",
    "Tarepanda Goes on an Adventure": "tarepanda_goes_on_adventure",
};
var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        if (names.hasOwnProperty(name)) {
            return names[name];
        }
        return noCase(name.toLowerCase(), null, "_");
    };
    Helper.prototype.resolveUrl = function (name) {
        return url_1.resolve(config_1.config.mangas_url, this.toName(name) + "/");
    };
    return Helper;
}());
exports.Helper = Helper;
exports.helper = new Helper();
exports.default = exports.helper;
//# sourceMappingURL=names.js.map
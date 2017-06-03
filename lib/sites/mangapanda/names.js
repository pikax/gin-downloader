/**
 * Created by david on 19/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var config_1 = require("./config");
var noCase = require("no-case");
var names = {
    "I'm Kagome": "i039m-kagome",
    "009 Re:Cyborg": "009-recyborg",
    "17 Years Old, That Summer Day's Miracle": "17-years-old-that-summer-days-miracle",
    "Kapon (>_": "kapon-_",
    "Kapon (>_<)!": "kapon-_",
    "Utopia's Avenger": "utopia039s-avenger",
};
var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.toName = function (name) {
        if (names.hasOwnProperty(name)) {
            return names[name];
        }
        name = name.replace(/[\/\.+':’×;&"]/g, "");
        return noCase(name.toLowerCase(), null, "-");
    };
    Helper.prototype.resolveUrl = function (name) {
        return url_1.resolve(config_1.config.site, this.toName(name));
    };
    return Helper;
}());
exports.Helper = Helper;
exports.helper = new Helper();
exports.default = exports.helper;
//# sourceMappingURL=names.js.map
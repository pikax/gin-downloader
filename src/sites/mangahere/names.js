/**
 * Created by david on 19/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const url_1 = require("url");
const noCase = require('no-case');
class Name {
    toName(name) {
        let n = name.replace(/[^\x00-\x7F]/g, '_');
        return noCase(n.toLowerCase(), null, '_');
    }
    resolveUrl(name) {
        return url_1.resolve(config_1.config.site + '/manga/', this.toName(name));
    }
}
exports.name = new Name();
exports.default = exports.name;
//# sourceMappingURL=names.js.map
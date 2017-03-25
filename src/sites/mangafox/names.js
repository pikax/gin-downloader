"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by david on 19/03/2017.
 */
const url = require("url");
const config_1 = require("./config");
const noCase = require('no-case');
const names = {
    'Renai Tsuu -Akka-': 'renaitsuu_akka',
    'Tarepanda Goes on an Adventure': 'tarepanda_goes_on_adventure',
};
class Name {
    toName(name) {
        if (names.hasOwnProperty(name))
            return names[name];
        return noCase(name.toLowerCase(), null, '_');
    }
    resolveUrl(name) {
        return url.resolve(config_1.config.mangas_url, this.toName(name));
    }
}
exports.name = new Name();
exports.default = exports.name;
//# sourceMappingURL=names.js.map
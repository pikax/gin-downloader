/**
 * Created by david on 19/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const config_1 = require("./config");
const noCase = require('no-case');
const names = {
    'I\'m Kagome': 'i039m-kagome',
    '009 Re:Cyborg': '009-recyborg',
    '17 Years Old, That Summer Day\'s Miracle': '17-years-old-that-summer-days-miracle',
    'Kapon (>_[Completed]': 'kapon-_',
    'Utopia\'s Avenger': 'utopia039s-avenger',
};
class Name {
    toName(name) {
        if (names.hasOwnProperty(name))
            return names[name];
        return noCase(name.toLowerCase(), null, '_');
    }
    resolveUrl(name) {
        return url_1.resolve(config_1.config.site, this.toName(name));
    }
}
exports.name = new Name();
exports.default = exports.name;
//# sourceMappingURL=names.js.map
/**
 * Created by david on 24/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const site_1 = require("../../common/site");
const parser_1 = require("./parser");
const config_1 = require("./config");
const names_1 = require("./names");
class Manga extends site_1.Site {
    constructor() {
        super(config_1.config, parser_1.parser, names_1.name);
    }
}
exports.manga = new Manga();
exports.default = exports.manga;
//# sourceMappingURL=index.js.map
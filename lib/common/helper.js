"use strict";
/**
 * Created by rodriguesc on 10/03/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
exports.parseDoc = function (source, params) {
    if (params === void 0) { params = undefined; }
    var doc = cheerio.load(source);
    doc.location = params && params.location;
    return doc;
};
exports.sanitize = function (children) { return children.filter(function (x) { return x.type !== "text"; }); };
//# sourceMappingURL=helper.js.map
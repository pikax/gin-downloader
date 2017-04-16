/**
 * Created by rodriguesc on 10/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var libxmljs_1 = require("libxmljs");
exports.parseDoc = function (source, params) {
    if (params === void 0) { params = undefined; }
    var doc = libxmljs_1.parseHtmlString(source);
    if (params && params.location) {
        doc.location = doc.baseUrl = params.location;
    }
    return doc;
};
//# sourceMappingURL=helper.js.map
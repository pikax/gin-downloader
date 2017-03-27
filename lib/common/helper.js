/**
 * Created by rodriguesc on 10/03/2017.
 */
"use strict";
require("../declarations");
var request_1 = require("./request");
var libxmljs_1 = require("libxmljs");
exports.parseDoc = function (source, params) {
    if (params === void 0) { params = undefined; }
    var doc = libxmljs_1.parseHtmlString(source);
    if (params && params.location) {
        doc.location = doc.baseUrl = params.location;
    }
    return doc;
};
exports.getDoc = function (uri) {
    return request_1.getHtml(uri).then(function (x) {
        return exports.parseDoc(x, { location: uri });
    });
};
//# sourceMappingURL=helper.js.map
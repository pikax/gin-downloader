/**
 * Created by rodriguesc on 10/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./declarations");
const request_1 = require("./request");
const libxmljs_1 = require("libxmljs");
// export const parseDoc = (source: string) : IMangaXDoc => <any> parseHtmlString(source);
exports.parseDoc = (source) => libxmljs_1.parseHtmlString(source);
exports.getDoc = (uri) => request_1.getHtml(uri).then(x => {
    let doc = exports.parseDoc(x);
    doc.location = doc.baseUrl = uri.toString();
    return doc;
});
//# sourceMappingURL=helper.js.map
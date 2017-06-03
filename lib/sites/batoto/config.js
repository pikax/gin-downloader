"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var site = "http://bato.to/";
exports.config = {
    name: "Batoto",
    site: site,
    mangas_url: url_1.resolve(site, "/search_ajax"),
    latest_url: url_1.resolve(site, "/"),
};
exports.default = exports.config;
exports.debug = require("debug")("gin-downloader:batoto");
exports.verbose = require("debug")("gin-downloader:batoto:verbose");
exports.verbose("using %O", exports.config);
//# sourceMappingURL=config.js.map
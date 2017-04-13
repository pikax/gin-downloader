"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var site = "http://mangafox.me";
exports.config = {
    name: "MangaFox",
    site: site,
    mangas_url: url_1.resolve(site, "/manga/"),
    latest_url: url_1.resolve(site, "/releases/")
};
exports.default = exports.config;
exports.debug = require("debug")("gin-downloader:mangafox");
exports.verbose = require("debug")("gin-downloader:mangafox:verbose");
exports.verbose("using %O", exports.config);
//# sourceMappingURL=config.js.map
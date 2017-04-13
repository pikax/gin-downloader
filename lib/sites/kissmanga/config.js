"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var site = "http://kissmanga.com/";
exports.config = {
    name: "KissManga",
    site: site,
    mangas_url: url_1.resolve(site, "/MangaList/"),
    latest_url: url_1.resolve(site, "/MangaList/LatestUpdate")
};
exports.default = exports.config;
exports.debug = require("debug")("gin-downloader:kissmanga");
exports.verbose = require("debug")("gin-downloader:kissmanga:verbose");
exports.verbose("using %O", exports.config);
//# sourceMappingURL=config.js.map
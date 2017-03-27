"use strict";
var url_1 = require("url");
var site = "http://www.mangahere.co";
exports.config = {
    name: "MangaHere",
    site: site,
    mangas_url: url_1.resolve(site, "/mangalist/"),
    latest_url: url_1.resolve(site, "/latest/")
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.config;
exports.debug = require("debug")("gin-downloader:mangahere");
exports.verbose = require("debug")("gin-downloader:mangahere:verbose");
exports.verbose("using %O", exports.config);
//# sourceMappingURL=config.js.map
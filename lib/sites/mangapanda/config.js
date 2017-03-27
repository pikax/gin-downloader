"use strict";
var site = "http://www.mangapanda.com";
exports.config = {
    name: "MangaPanda",
    site: site,
    mangas_url: site + "/alphabetical",
    latest_url: site + "/latest"
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.config;
exports.debug = require("debug")("gin-downloader:mangapanda");
exports.verbose = require("debug")("gin-downloader:mangapanda:verbose");
exports.verbose("using %O", exports.config);
//# sourceMappingURL=config.js.map
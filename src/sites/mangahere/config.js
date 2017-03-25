"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const site = 'http://www.mangahere.co';
exports.config = {
    name: 'MangaHere',
    site: site,
    mangas_url: url.resolve(site, '/mangalist/'),
    latest_url: url.resolve(site, '/latest/')
};
exports.default = exports.config;
exports.debug = require('debug')('gin-downloader:mangahere');
exports.verbose = require('debug')('gin-downloader:mangahere:verbose');
exports.verbose('using %O', exports.config);
//# sourceMappingURL=config.js.map
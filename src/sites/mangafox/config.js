"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const site = 'http://mangafox.me';
exports.config = {
    name: 'MangaFox',
    site: site,
    mangas_url: url.resolve(site, '/manga/'),
    latest_url: url.resolve(site, '/releases/')
};
exports.default = exports.config;
exports.debug = require('debug')('gin-downloader:mangafox');
exports.verbose = require('debug')('gin-downloader:mangafox:verbose');
exports.verbose('using %O', exports.config);
//# sourceMappingURL=config.js.map
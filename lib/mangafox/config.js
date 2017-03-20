'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by rodriguesc on 03/03/2017.
 */

var debug = require('debug')('gin-downloader:mangafox:config');

var site = 'http://mangafox.me';
var config = {
  name: 'MangaFox',
  site: site,
  mangas_url: site + '/manga',
  latest_url: site + '/releases'
};

exports.default = config;

debug('using %O', config);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by rodriguesc on 03/03/2017.
 */

var debug = require('debug')('gin-downloader:mangahere:config');

var site = 'http://www.mangahere.co';
var config = {
  name: 'MangaHere',
  site: site,
  mangas_url: site + '/mangalist',
  latest_url: site + '/latest'
};

exports.default = config;

debug('using %O', config);
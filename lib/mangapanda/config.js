'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by rodriguesc on 05/03/2017.
 */

var debug = require('debug')('gin-downloader:mangapanda:config');

var site = 'http://www.mangapanda.com';
var config = {
  name: 'MangaPanda',
  site: site,
  mangas_url: site + '/alphabetical',
  latest_url: site + '/latest'
};

exports.default = config;

debug('using %O', config);
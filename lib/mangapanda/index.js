'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAME = undefined;

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _osmosis = require('osmosis');

var _osmosis2 = _interopRequireDefault(_osmosis);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _helper = require('../common/helper');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _request = require('../common/request');

var _libxmljs = require('libxmljs');

var _libxmljs2 = _interopRequireDefault(_libxmljs);

var _names = require('./names');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rodriguesc on 05/03/2017.
 */

var debug = require('debug')('gin-downloader:mangapanda');
var verbose = require('debug')('gin-downloader:mangapanda:verbose');

var uri = require('url');

var NAME = exports.NAME = _config2.default.name;

var mangas = function mangas() {
  debug('getting mangas');
  return (0, _request.getHtml)(_config2.default.mangas_url).tap(function (x) {
    return verbose(x);
  }).tap(function () {
    return debug('got html');
  }).then(function (x) {
    return _libxmljs2.default.parseHtmlString(x);
  }).then(_parser2.default.mangas).tap(function (x) {
    return debug('mangas: ' + x.length);
  });
};

var latest = function latest() {
  debug('getting latest');
  var osm = _osmosis2.default.get(_config2.default.latest_url);
  return _parser2.default.latest(osm).tap(function (x) {
    return debug('found: ' + x.length);
  });
};

var info = function info(name) {
  debug('getting info for ' + name);

  var src = (0, _names.resolveUrl)(name);

  debug('getting info ' + src);
  var osm = _osmosis2.default.get(src);

  return _parser2.default.mangaInfo(osm).tap(function (x) {
    return debug('info: %s', x);
  });
};

var chapters = function chapters(name) {
  debug('getting chapters ' + name);
  var src = (0, _names.resolveUrl)(name);

  var osm = _osmosis2.default.get(src);
  return _parser2.default.chapters(osm).catch(function (x) {
    throw new Error('Chapters not found', x);
  }).tap(function (x) {
    return debug('chapters: ' + x.length);
  });
};

var images = function images(url) {
  var osm = _osmosis2.default.get(url);
  osm = _parser.resolver.resolveImagesPaths(osm);

  return (0, _helper.resolveArray)(osm).then(function (images) {
    return images.map(function (x) {
      return uri.resolve(url + '/', x.path);
    });
  }).then(function (x) {
    return x.map(function (t) {
      return image(t);
    });
  });
};

var imagesPaths = function imagesPaths(url) {
  var osm = _osmosis2.default.get(url);
  return _parser2.default.imagesPaths(osm);
};

var image = function image(url) {
  var __img__ = /src=".*[^"]*" alt/gmi;
  return (0, _request.getHtml)(url).then(function (html) {
    return html.match(__img__);
  }).then(function (x) {
    return x[0].slice(5, -5);
  });
};

var resolve = function resolve(name, chapter) {
  return chapters(name).then(function (chaps) {
    return _lodash2.default.find(chaps, { chapter: name + ' ' + chapter });
  }).then(function (x) {
    if (!x) throw new Error('chapter ' + chapter + ' not found');
    return images(uri.resolve(_config2.default.site, x.uri));
  });
};

exports.default = {
  mangas: mangas,
  info: info,
  chapters: chapters,
  images: images,
  imagesPaths: imagesPaths,
  resolve: resolve,
  latest: latest
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAME = undefined;

var _osmosis = require('osmosis');

var _osmosis2 = _interopRequireDefault(_osmosis);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _libxmljs = require('libxmljs');

var _libxmljs2 = _interopRequireDefault(_libxmljs);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _request = require('../common/request');

var _names = require('./names');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rodriguesc on 03/03/2017.
 */
var debug = require('debug')('gin-downloader:mangafox');
var verbose = require('debug')('gin-downloader:mangafox:verbose');

var NAME = exports.NAME = _config2.default.name;

var mangas = function mangas() {
  debug('getting mangas');
  var osm = _osmosis2.default.get(_config2.default.mangas_url);
  return _parser2.default.mangas(osm).tap(function (x) {
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
  debug('getting images ' + url);
  return imagesPaths(url).tap(function (x) {
    return debug('images: ' + x.length);
  }).then(function (x) {
    return x.map(image);
  }).tap(function (x) {
    return debug('images resolved : ' + x);
  });
};

var imagesPaths = function imagesPaths(url) {
  debug('getting image paths ' + url);
  return (0, _request.getHtml)(url).tap(function (x) {
    return verbose('html: %s', x);
  }).then(function (html) {
    return _libxmljs2.default.parseHtmlString(html);
  }).then(function (x) {
    return _parser.finder.findImagesPath(x);
  }).then(function (x) {
    return x.map(function (t) {
      return _url2.default.resolve(url, t.value() + '.html');
    });
  }).tap(function (x) {
    return debug('found ' + x.length + ' images:\n' + x);
  });
};

var image = function image(url) {
  var __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
  var __img__ = /src=".*\?token[^"]*/gmi;
  debug('getting image from ' + url);

  return (0, _request.getHtml)(url).tap(function (x) {
    return verbose('html: %s', x);
  }).then(function (html) {
    return html.match(__imgID__);
  }).then(function (x) {
    return x[0];
  }).tap(function (x) {
    return debug('match image : ' + x);
  }).then(function (x) {
    return x.match(__img__);
  }).then(function (x) {
    return x[0].slice(5);
  });
};

var resolve = function resolve(name, chapter) {
  debug('resolve ' + name + ':' + chapter);

  return chapters(name).then(function (chaps) {
    return _lodash2.default.find(chaps, { number: name + ' ' + chapter });
  }).tap(function (x) {
    return debug('found %o', x);
  }).then(function (x) {
    if (!x) throw new Error('chapter ' + chapter + ' not found');
    return images(_url2.default.resolve(_config2.default.site, x.url));
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
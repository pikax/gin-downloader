'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _request = require('../common/request');

var _names = require('./names');

var _helper = require('../common/helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rodriguesc on 03/03/2017.
 */
var debug = require('debug')('gin-downloader:mangahere');
var verbose = require('debug')('gin-downloader:mangahere:verbose');

var mangas = function mangas() {
  debug('getting mangas');
  return (0, _helper.getDoc)(_config2.default.mangas_url).then(_parser2.default.mangas).tap(function (x) {
    return debug('mangas: ' + x.length);
  });
};

var latest = function latest() {
  debug('getting latest');
  return (0, _helper.getDoc)(_config2.default.latest_url).then(_parser2.default.latest).tap(function (x) {
    return debug('found: ' + x.length);
  });
};

var info = function info(name) {
  debug('getting info for ' + name);

  var src = (0, _names.resolveUrl)(name);

  debug('getting info ' + src);
  return (0, _helper.getDoc)(src).then(_parser2.default.mangaInfo).tap(function (x) {
    return debug('info: %s', x);
  });
};

var chapters = function chapters(name) {
  debug('getting chapters ' + name);
  var src = (0, _names.resolveUrl)(name);

  return (0, _helper.getDoc)(src).then(_parser2.default.chapters).tap(function (x) {
    if (!x || x.length === 0) throw 'not found';
  }).catch(function (x) {
    throw new Error('Chapters not found', x);
  }).tap(function (x) {
    return debug('chapters: ' + x.length);
  });
};

var images = function images(name, chapter) {
  debug('getting images ' + name + ':' + chapter);

  return chapters(name).then(function (chaps) {
    return _lodash2.default.find(chaps, { number: name + ' ' + chapter });
  }).then(function (x) {
    if (!x) throw new Error('Manga: ' + name + ' chapter ' + chapter + ' doesn\'t exists.');
    return x.src;
  }).then(imagesByUrl);
};

var imagesByUrl = function imagesByUrl(uri) {
  debug('getting images for ' + uri);

  return imagesPaths(uri).tap(function (x) {
    return debug('images: ' + x.length);
  }).then(function (x) {
    return x.map(image);
  }).tap(function (x) {
    return debug('images resolved : ' + x);
  });
};

var imagesPaths = function imagesPaths(uri) {
  debug('getting image paths ' + uri);
  return (0, _helper.getDoc)(uri).then(_parser2.default.imagesPaths).tap(function (x) {
    return debug('found ' + x.length + ' images:\n' + x);
  });
};

var image = function image(uri) {

  debug('getting image from ' + uri);

  return (0, _request.getHtml)(uri).tap(function (x) {
    return verbose('html: %s', x);
  }).then(_parser2.default.image);
};

var resolve = function resolve(name, chapter) {
  debug('resolve ' + name + ':' + chapter);

  return images(name, chapter).tap(function (x) {
    return debug('found %o', x);
  });
};

exports.default = {
  config: _config2.default,

  mangas: mangas,
  info: info,
  chapters: chapters,
  images: images,
  imagesPaths: imagesPaths,
  resolve: resolve,
  latest: latest
};
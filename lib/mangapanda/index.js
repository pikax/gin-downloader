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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uri = require('url'); /**
                           * Created by rodriguesc on 05/03/2017.
                           */
var NAME = exports.NAME = _config2.default.name;

var mangas = function mangas() {
  var osm = _osmosis2.default.get(_config2.default.mangas_url, { tries: 20 });
  return _parser2.default.mangas(osm);
};

var chapters = function chapters(url) {
  var osm = _osmosis2.default.get(url);
  return _parser2.default.chapters(osm);
};

var info = function info(url) {
  var osm = _osmosis2.default.get(url);
  return _parser2.default.mangaInfo(osm);
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

var resolve = function resolve(name, chapter) {
  return mangas().then(function (items) {
    return _lodash2.default.find(items, { name: name });
  }).then(function (x) {
    if (!x || !x.src) throw new Error(name + ' not found');
    return chapters(uri.resolve(_config2.default.site, x.src));
  }).then(function (chaps) {
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
  resolve: resolve
};
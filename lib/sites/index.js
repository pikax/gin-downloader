'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = undefined;

var _templateObject = _taggedTemplateLiteral(['Manga: ', ' chapter ', ' doesn\'t exists.'], ['Manga: ', ' chapter ', ' doesn\'t exists.']);

var _helper = require('../common/helper');

var _request = require('../common/request');

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /**
                                                                                                                                                   * Created by rodriguesc on 23/03/2017.
                                                                                                                                                   */

function mangas() {
  var _this = this;

  this.debug('getting mangas');

  return (0, _helper.getDoc)(this.config.mangas_url).then(this.parser.mangas).tap(function (x) {
    return _this.debug('mangas: ' + x.length);
  });
}

function latest() {
  var _this2 = this;

  this.debug('getting latest');
  return (0, _helper.getDoc)(this.config.latest_url).then(this.parser.latest).tap(function (x) {
    return _this2.debug('found: ' + x.length);
  });
}

function info(name) {
  var _this3 = this;

  this.debug('getting info for ' + name);
  var src = this.resolveUrl(name);

  this.debug('getting info ' + src);
  return (0, _helper.getDoc)(src).then(this.parser.mangaInfo).tap(function (x) {
    return _this3.debug('info: %s', x);
  });
}

function chapters(name) {
  var _this4 = this;

  this.debug('getting chapters ' + name);
  var src = this.resolveUrl(name);

  return (0, _helper.getDoc)(src).then(this.parser.chapters).tap(function (x) {
    if (!x || x.length === 0) throw 'not found';
  }).catch(function (x) {
    throw new Error('Chapters not found', x);
  }).tap(function (x) {
    return _this4.debug('chapters: ' + x.length);
  });
}

function images(name, chapter) {
  this.debug('getting images ' + name + ':' + chapter);

  return this.chapters(name).then(function (chaps) {
    return (0, _find2.default)(chaps, { number: name + ' ' + chapter });
  }).then(function (x) {
    if (!x) throw new Error($(_templateObject, name, chapter));
    return x.src;
  }).then(this.imagesByUrl);
}

//helpers
function imagesByUrl(uri) {
  var _this5 = this;

  this.debug('getting images for ' + uri);

  return this.imagesPaths(uri).tap(function (x) {
    return _this5.debug('images: ' + x.length);
  }).then(function (x) {
    return x.map(_this5.image);
  }).tap(function (x) {
    return _this5.debug('images resolved : ' + x);
  });
}

function imagesPaths(uri) {
  var _this6 = this;

  this.debug('getting image paths ' + uri);
  return (0, _helper.getDoc)(uri).then(this.parser.imagesPaths).tap(function (x) {
    return _this6.debug('found ' + x.length + ' images:\n' + x);
  });
}

function image(uri) {
  var _this7 = this;

  this.debug('getting image from ' + uri);

  return (0, _request.getHtml)(uri).tap(function (x) {
    return _this7.verbose('html: %s', x);
  }).then(this.parser.image);
}

var extend = exports.extend = function extend(site, config, parser, resolveUrl) {
  var ext = Object.assign({}, site);
  ext.debug = require('debug')('gin-downloader:' + config.name);
  ext.verbose = require('debug')('gin-downloader:' + config.name + ':verbose');

  ext.config = config;
  ext.site = site;
  ext.parser = parser;
  ext.resolveUrl = resolveUrl;

  ext.mangas = site && site.mangas && site.mangas.bind(ext) || mangas.bind(ext);
  ext.latest = site && site.latest && site.latest.bind(ext) || latest.bind(ext);
  ext.info = site && site.info && site.info.bind(ext) || info.bind(ext);
  ext.chapters = site && site.chapters && site.chapters.bind(ext) || chapters.bind(ext);
  ext.images = site && site.images && site.images.bind(ext) || images.bind(ext);
  ext.imagesByUrl = site && site.imagesByUrl && site.imagesByUrl.bind(ext) || imagesByUrl.bind(ext);
  ext.imagesPaths = site && site.imagesPaths && site.imagesPaths.bind(ext) || imagesPaths.bind(ext);
  ext.image = site && site.image && site.image.bind(ext) || image.bind(ext);

  return ext;
};
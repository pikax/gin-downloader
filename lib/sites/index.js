'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by rodriguesc on 23/03/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _templateObject = _taggedTemplateLiteral(['Manga: ', ' chapter ', ' doesn\'t exists.'], ['Manga: ', ' chapter ', ' doesn\'t exists.']);

var _helper = require('../common/helper');

var _request = require('../common/request');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var builder = function () {
  function builder(site, config, parser) {
    _classCallCheck(this, builder);

    this.debug = require('debug')('gin-downloader:' + config.name);
    this.verbose = require('debug')('gin-downloader:' + config.name + ':verbose');

    this.config = config;
    this.site = site;
    this.parser = parser;
  }

  _createClass(builder, [{
    key: 'mangas',
    value: function mangas() {
      var _this = this;

      this.debug('getting mangas');

      return (0, _helper.getDoc)(this.config.mangas_url).then(this.parser.mangas).tap(function (x) {
        return _this.debug('mangas: ' + x.length);
      });
    }
  }, {
    key: 'latest',
    value: function latest() {
      var _this2 = this;

      this.debug('getting latest');
      return (0, _helper.getDoc)(this.config.latest_url).then(this.manga.latest).tap(function (x) {
        return _this2.debug('found: ' + x.length);
      });
    }
  }, {
    key: 'info',
    value: function info(name) {
      var _this3 = this;

      this.debug('getting info for ' + name);
      var src = this.resolveUrl(name);

      this.debug('getting info ' + src);
      return (0, _helper.getDoc)(src).then(this.manga.mangaInfo).tap(function (x) {
        return _this3.debug('info: %s', x);
      });
    }
  }, {
    key: 'chapters',
    value: function chapters(name) {
      var _this4 = this;

      this.debug('getting chapters ' + name);
      var src = this.resolveUrl(name);

      return (0, _helper.getDoc)(src).then(this.manga.chapters).tap(function (x) {
        if (!x || x.length === 0) throw 'not found';
      }).catch(function (x) {
        throw new Error('Chapters not found', x);
      }).tap(function (x) {
        return _this4.debug('chapters: ' + x.length);
      });
    }
  }, {
    key: 'images',
    value: function images(name, chapter) {
      this.debug('getting images ' + name + ':' + chapter);

      return this.chapters(name).then(function (chaps) {
        return _.find(chaps, { number: name + ' ' + chapter });
      }).then(function (x) {
        if (!x) throw new Error($(_templateObject, name, chapter));
        return x.src;
      }).then(imagesByUrl);
    }
  }]);

  return builder;
}();

//helpers


exports.default = builder;
function imagesByUrl(uri) {
  var _this5 = this;

  this.debug('getting images for ' + uri);

  return imagesPaths(uri).tap(function (x) {
    return _this5.debug('images: ' + x.length);
  }).then(function (x) {
    return x.map(image);
  }).tap(function (x) {
    return _this5.debug('images resolved : ' + x);
  });
}

function imagesPaths(uri) {
  var _this6 = this;

  this.debug('getting image paths ' + uri);
  return (0, _helper.getDoc)(uri).then(this.manga.imagesPaths).tap(function (x) {
    return _this6.debug('found ' + x.length + ' images:\n' + x);
  });
}

function image(uri) {
  var _this7 = this;

  this.debug('getting image from ' + uri);
  return (0, _request.getHtml)(uri).tap(function (x) {
    return _this7.verbose('html: %s', x);
  }).then(this.manga.image);
}
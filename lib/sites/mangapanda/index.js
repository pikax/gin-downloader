'use strict';

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _names = require('./names');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rodriguesc on 05/03/2017.
 */

var debug = require('debug')('gin-downloader:mangapanda');


var images = function images(name, chapter) {
  debug('getting images ' + name + ':' + chapter);

  var mangaUri = (0, _names.resolveUrl)(name);
  //NOTE mangapanda dont add volume to url is a simple {site}/{name}/{chapter}
  var uri = _url2.default.resolve(mangaUri + '/', chapter.toString());
  return undefined.imagesByUrl(uri);
};
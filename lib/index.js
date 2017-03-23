'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sites = require('./sites');

var _sites2 = _interopRequireDefault(_sites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by david on 19/03/2017.
 */

var sites = {};

var sitesDir = __dirname + '/sites/';
_fs2.default.readdirSync(sitesDir).forEach(function (file) {
  var fp = sitesDir + file;

  if (_fs2.default.statSync(fp).isFile()) return; //nothing to do here

  var site = require(fp).default;
  var parser = require(fp + '/parser').default;
  var config = require(fp + '/config').default;

  var def = new _sites2.default(site, config, parser);

  var s = site;

  s.mangas = s.mangas || def.mangas.bind(def);

  site[config.name] = s;
});

modules.export = site;
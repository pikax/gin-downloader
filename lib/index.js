'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sites = require('./sites');

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
  var resolveUrl = require(fp + '/names').resolveUrl;

  var def = (0, _sites.extend)(site, config, parser, resolveUrl);

  sites[config.name] = def;
});

//modules.export = site;

exports.default = module.exports = sites;
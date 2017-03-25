'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDoc = exports.parseDoc = undefined;

var _libxmljs = require('libxmljs');

var _libxmljs2 = _interopRequireDefault(_libxmljs);

var _request = require('./request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rodriguesc on 10/03/2017.
 */

var parseDoc = exports.parseDoc = _libxmljs2.default.parseHtmlString;
var getDoc = exports.getDoc = function getDoc(uri) {
  return (0, _request.getHtml)(uri).then(function (x) {
    var doc = parseDoc(x, { baseUrl: uri });
    doc.location = doc.baseUrl = uri;
    return doc;
  });
};
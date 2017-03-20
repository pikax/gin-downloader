'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveObject = exports.resolveArray = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//resolve
var resolveArray = exports.resolveArray = function resolveArray(osm) {
  return new _bluebird2.default(function (resolve, reject) {
    var arr = [];
    osm.data(function (x) {
      return arr.push(x);
    }).error(reject).done(function () {
      resolve(arr);
    });
  });
}; /**
    * Created by rodriguesc on 10/03/2017.
    */

var resolveObject = exports.resolveObject = function resolveObject(osm) {
  return new _bluebird2.default(function (resolve, reject) {
    osm.data(function (x) {
      return resolve(x);
    }).error(reject).run();
  });
};
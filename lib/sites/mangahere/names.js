'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveUrl = exports.toName = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _noCase = require('no-case');

var _noCase2 = _interopRequireDefault(_noCase);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toName = exports.toName = function toName(name) {
  'use strict';

  var n = name.replace(/[^\x00-\x7F]/g, '_');

  return (0, _noCase2.default)(n.toLowerCase(), null, '_');
}; /**
    * Created by david on 19/03/2017.
    */
var resolveUrl = exports.resolveUrl = function resolveUrl(name) {
  'use strict';

  return _url2.default.resolve(_config2.default.site + '/manga/', toName(name));
};
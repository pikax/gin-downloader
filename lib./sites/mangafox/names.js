'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveUrl = exports.toName = exports.names = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _noCase = require('no-case');

var _noCase2 = _interopRequireDefault(_noCase);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var names = exports.names = {
  'Renai Tsuu -Akka-': 'renaitsuu_akka',
  'Tarepanda Goes on an Adventure': 'tarepanda_goes_on_adventure'
}; /**
    * Created by david on 19/03/2017.
    */
var toName = exports.toName = function toName(name) {
  'use strict';

  if (names.hasOwnProperty(name)) return names[name];

  return (0, _noCase2.default)(name.toLowerCase(), null, '_');
};

var resolveUrl = exports.resolveUrl = function resolveUrl(name) {
  'use strict';

  return _url2.default.resolve(_config2.default.mangas_url, toName(name));
};
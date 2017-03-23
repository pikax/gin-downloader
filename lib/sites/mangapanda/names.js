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
  'I\'m Kagome': 'i039m-kagome',
  '009 Re:Cyborg': '009-recyborg',
  '17 Years Old, That Summer Day\'s Miracle': '17-years-old-that-summer-days-miracle',
  'Kapon (>_[Completed]': 'kapon-_', //parser issue
  'Utopia\'s Avenger': 'utopia039s-avenger'
}; /**
    * Created by david on 19/03/2017.
    */

var toName = exports.toName = function toName(name) {
  'use strict';

  if (names.hasOwnProperty(name)) return names[name];

  var n = name.replace(/[\/\.+':’×;&"]/g, '');

  return (0, _noCase2.default)(n.toLowerCase(), null, '-');
};

var resolveUrl = exports.resolveUrl = function resolveUrl(name) {
  'use strict';

  return _url2.default.resolve(_config2.default.site, toName(name));
};
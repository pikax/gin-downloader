'use strict';

/**
 * Created by david on 19/03/2017.
 */

var mangafox = require('./mangafox');
var mangahere = require('./mangahere');
var mangapanda = require('./mangapanda');

module.exports = {
  mangafox: mangafox.default,
  mangahere: mangahere.default,
  mangapanda: mangapanda.default
};
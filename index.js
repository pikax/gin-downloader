/**
 * Created by david on 19/03/2017.
 */


const mangafox = require('./dist/mangafox');
const mangahere = require('./dist/mangahere');
const mangapanda = require('./dist/mangapanda');



module.exports = {
  mangafox:mangafox.default,
  mangahere:mangahere.default,
  mangapanda:mangapanda.default
};


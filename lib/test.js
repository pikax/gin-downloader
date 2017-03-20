'use strict';

/**
 * Created by david on 19/03/2017.
 */

var dd = require('../index');

var mangafox = dd.mangafox;

mangafox.mangas().then(console.log);
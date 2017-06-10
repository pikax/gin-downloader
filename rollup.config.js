/**
 * Created by pikax on 04/06/2017.
 */
var cleanUp = require('rollup-plugin-cleanup');
var pkg = require( './package.json' );


module.exports =  {
  entry: './build/index.js',

  plugins:[
    cleanUp({maxEmptyLines:1}),
  ],
  format:'cjs', //probably changing to es when node supports it

  dest: pkg.main,
  external: [ 'cheerio', 'lodash', 'debug', 'url', 'vm', 'util']
};
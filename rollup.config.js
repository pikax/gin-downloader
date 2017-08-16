/**
 * Created by pikax on 04/06/2017.
 */
var cleanUp = require('rollup-plugin-cleanup');
var pkg = require( './package.json' );
import typescript from 'rollup-plugin-typescript2';

module.exports =  {
  entry: './src/index.ts',

  plugins:[
    typescript({clean:true}),
    cleanUp({maxEmptyLines:1}),
  ],
  format:'cjs', //probably changing to es when node supports it

  sourceMap:true,
  dest: pkg.main,
  external: [ 'cheerio', 'lodash', 'debug', 'url', 'vm', 'util']
};
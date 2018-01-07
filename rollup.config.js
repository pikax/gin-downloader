/**
 * Created by pikax on 04/06/2017.
 */
// var cleanUp = require('rollup-plugin-cleanup');
const pkg = require('./package.json');
import typescript from 'rollup-plugin-typescript2';

module.exports = {
  input: './src/index.ts',

  plugins: [
    typescript({clean: true}),
    // cleanUp({maxEmptyLines:1}),
  ],

  output: {
    file: pkg.main,
    format: 'cjs'
  },
  external: ['cheerio', 'lodash', 'debug', 'url', 'vm', 'util', 'querystring']
};
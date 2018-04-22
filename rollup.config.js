const pkg = require('./package.json');
import typescript from 'rollup-plugin-typescript2';

module.exports = {
  input: 'src/index.ts',

  plugins: [
    typescript({clean: true}),
    // cleanUp({maxEmptyLines:1}),
  ],

  output: {
    file: "dist/index.js",
    format: 'cjs' //probably changing to es when node supports it
  },
  external: ['cheerio', 'lodash', 'debug', 'url', 'vm', 'util', 'querystring']
};
/**
 * Created by pikax on 04/06/2017.
 */
import typescript from 'rollup-plugin-typescript2';

var pkg = require( './package.json' );



export default {
  entry: './src/index.ts',

  plugins: [
    typescript()
  ],

  dest: 'out/asdasdasd',
  format: "cjs",


  external: [ 'cheerio', 'lodash']

  // targets: [
  //   {
  //     format: 'cjs',
  //     dest: pkg.main
  //   },
  //   {
  //     format: 'es',
  //     dest: pkg.module
  //   }
  // ]
}
/**
 * Created by pikax on 10/06/2017.
 */

const rollup = require('rollup');
const rollupAnalyzer = require('rollup-analyzer')({limit: 5})
const rollupConfig = require('./rollup.config');


rollup.rollup(rollupConfig)
  .then((bundle)=>{
  "use strict";
    return rollupAnalyzer.formatted(bundle)
  })
  .then(console.log).catch(console.error)

//
// const processBundles = (err, bundlePaths) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   let rollupCache;
//   Promise.all(bundlePaths.map(bundlePath => {
//     const bundleDest = bundlePath.replace('src', 'dist');
//     return rollup({
//       ...rollupConfig,
//       entry: bundlePath,
//       cache: rollupCache
//     }).then(bundle => rollupAnalyzer.formatted(bundle).then(result => {
//       console.log(result);
//       return bundle;
//     })).then(bundle => bundle.write({
//       format: rollupConfig.format,
//       dest: bundleDest
//     }));
//   })).then(result => {
//     console.log(`Built ${result.length} bundles`);
//   }).catch(err => {
//     console.error('err', err);
//   })
// };
//
// if (process.argv.length > 2) {
//   processBundles(null, process.argv.slice(2));
// }

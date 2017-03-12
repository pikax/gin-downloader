/**
 * Created by david on 12/03/2017.
 */


import program from 'commander';



program.version('0.0.3')
      .option('-s, --site <name>', 'set site')
  .option('-m, --manga <name>', 'manga name')
  .option('-c, --chapter <number>', 'chapter number');


program.command('site <name>')
  .alias('-s')
  .description('show mangas for site')
  .action((cmd,options)=>{
  'use strict';
  console.log(`exec ${cmd} using ${options}`);
  })
  .on('--help', ()=>{
    'use strict';
    console.log('  Examples:');
    console.log('  -s MangaFox');
    console.log('  -s MangaFox -m Gintama');
    console.log('  -s MangaFox -m Gintama -c 1');
  });






program.parse(process.argv);
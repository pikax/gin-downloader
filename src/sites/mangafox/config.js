/**
 * Created by rodriguesc on 03/03/2017.
 */


const site= 'http://mangafox.me';
const config = {
  name : 'MangaFox',
  site : site,
  mangas_url : site+'/manga/',
  latest_url : site+'/releases/'

};

export default config;

export debug = require('debug')('gin-downloader:mangafox');
export verbose = require('debug')('gin-downloader:mangafox:verbose');
verbose('using %O', config);

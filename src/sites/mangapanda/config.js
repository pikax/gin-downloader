/**
 * Created by rodriguesc on 05/03/2017.
 */

const debug = require('debug')('gin-downloader:mangapanda:config');

const site= 'http://www.mangapanda.com';
const config = {
  name : 'MangaPanda',
  site : site,
  mangas_url : site+'/alphabetical',
  latest_url : site+'/latest'
};


export default config;
debug('using %O', config);
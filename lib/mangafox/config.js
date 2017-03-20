/**
 * Created by rodriguesc on 03/03/2017.
 */

const debug = require('debug')('gin-downloader:mangafox:config');

const site= 'http://mangafox.me';
const config = {
  name : 'MangaFox',
  site : site,
  mangas_url : site+'/manga/',
  latest_url : site+'/releases/'
};

export default config;
debug('using %O', config);

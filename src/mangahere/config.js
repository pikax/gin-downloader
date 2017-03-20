/**
 * Created by rodriguesc on 03/03/2017.
 */

const debug = require('debug')('gin-downloader:mangahere:config');

const site= 'http://www.mangahere.co';
const config = {
  name : 'MangaHere',
  site : site,
  mangas_url : site+'/mangalist',
  latest_url : site+'/latest/'
};

export default config;
debug('using %O', config);

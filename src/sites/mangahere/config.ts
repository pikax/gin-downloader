/**
 * Created by rodriguesc on 03/03/2017.
 */
import {IConfig} from "../../common/declarations";
import * as url from 'url';

const site= 'http://www.mangahere.co';
export const config : IConfig = {
  name : 'MangaHere',
  site : site,
  mangas_url : url.resolve(site,'/mangalist/'),
  latest_url : url.resolve(site,'/latest/')

};
export default config;

export const debug = require('debug')('gin-downloader:mangahere');
export const verbose = require('debug')('gin-downloader:mangahere:verbose');
verbose('using %O', config);

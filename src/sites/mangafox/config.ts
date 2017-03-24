/**
 * Created by rodriguesc on 24/03/2017.
 */
import {IConfig} from "../../common/declarations";

const site= 'http://mangafox.me';
const config : IConfig = {
    name : 'MangaFox',
    site : site,
    mangas_url : site+'/manga/',
    latest_url : site+'/releases/'

};
export default config;

export const debug = require('debug')('gin-downloader:mangafox');
export const verbose = require('debug')('gin-downloader:mangafox:verbose');
verbose('using %O', config);

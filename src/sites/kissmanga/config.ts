/**
 * Created by rodriguesc on 24/03/2017.
 */
import {resolve} from "url";
import {gin} from "src/interface";
import SiteConfig = gin.SiteConfig;

const site = "http://kissmanga.com/";
export const config: SiteConfig = {
    name : "KissManga",
    site : site,
    mangas_url : resolve(site, "/MangaList/"),
    latest_url : resolve(site, "/MangaList/LatestUpdate")

};
export default config;

export const debug = require("debug")("gin-downloader:kissmanga");
export const verbose = require("debug")("gin-downloader:kissmanga:verbose");
export const error = require("debug")("gin-downloader:kissmanga:error");
verbose("using %O", config);

/**
 * Created by rodriguesc on 24/03/2017.
 */
import {SiteConfig} from "../../declarations";
import {resolve} from "url";

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
verbose("using %O", config);

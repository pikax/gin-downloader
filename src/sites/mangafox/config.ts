/**
 * Created by rodriguesc on 24/03/2017.
 */
import {SiteConfig} from "../../declarations";
import {resolve} from "url";

const site = "http://mangafox.me";
export const config: SiteConfig = {
    name : "MangaFox",
    site : site,
    mangas_url : resolve(site, "/manga/"),
    latest_url : resolve(site, "/releases/")

};
export default config;

export const debug = require("debug")("gin-downloader:mangafox");
export const verbose = require("debug")("gin-downloader:mangafox:verbose");
verbose("using %O", config);

/**
 * Created by rodriguesc on 24/03/2017.
 */
import {gin} from "./../../interface";
import {resolve} from "url";

const site = "http://mangafox.me";
export const config: gin.SiteConfig = {
    name : "MangaFox",
    site : site,
    mangas_url : resolve(site, "/manga/"),
    latest_url : resolve(site, "/releases/")
};
export default config;

export const debug = require("debug")("gin-downloader:mangafox");
export const verbose = require("debug")("gin-downloader:mangafox:verbose");
export const error = require("debug")("gin-downloader:mangafox:error");
verbose("using %O", config);

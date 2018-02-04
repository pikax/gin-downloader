/**
 * Created by rodriguesc on 03/03/2017.
 */
import {resolve} from "url";
import {gin} from "../../interface";
import SiteConfig = gin.SiteConfig;

const site = "http://www.mangahere.cc";
export const config: SiteConfig = {
  name : "MangaHere",
  site : site,
  mangas_url : resolve(site, "/mangalist/"),
  latest_url : resolve(site, "/latest/")

};
export default config;

export const debug = require("debug")("gin-downloader:mangahere");
export const verbose = require("debug")("gin-downloader:mangahere:verbose");
export const error = require("debug")("gin-downloader:mangahere:error");
verbose("using %O", config);

/**
 * Created by rodriguesc on 05/03/2017.
 */
import {SiteConfig} from "../../declarations";

const site = "http://www.mangapanda.com";
export const config: SiteConfig = {
  name : "MangaPanda",
  site : site,
  mangas_url : `${site}/alphabetical`,
  latest_url : `${site}/latest`

};
export default config;

export const debug = require("debug")("gin-downloader:mangapanda");
export const verbose = require("debug")("gin-downloader:mangapanda:verbose");
verbose("using %O", config);

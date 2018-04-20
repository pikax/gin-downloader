/**
 * Created by rodriguesc on 24/03/2017.
 */

import {resolve} from "url";
import {gin} from "./../../interface";
import SiteConfig = gin.SiteConfig;

const site = "https://bato.to/";
export const config: SiteConfig = {
    name : "Batoto",
    site : site,
    mangas_url : resolve(site, "/search_ajax"),
    latest_url : resolve(site, "/"),
};
export default config;

export const debug = require("debug")("gin-downloader:batoto");
export const verbose = require("debug")("gin-downloader:batoto:verbose");
export const error = require("debug")("gin-downloader:batoto:error");
verbose("using %O", config);

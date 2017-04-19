/**
 * Created by rodriguesc on 24/03/2017.
 */
import {SiteConfig} from "../../declarations";
import {resolve} from "url";

const site = "http://bato.to/";
export const config: SiteConfig = {
    name : "Batoto",
    site : site,
    mangas_url : resolve(site, "/search/"),
    latest_url : resolve(site, "/")

};
export default config;

export const debug = require("debug")("gin-downloader:batoto");
export const verbose = require("debug")("gin-downloader:batoto:verbose");
verbose("using %O", config);

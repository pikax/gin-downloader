import {MangaSite} from "../manga/interface";

const project = "gin-downloader";

export interface ILog {
    (format: string, ...argments);
}


export interface ILogger {
    debug: ILog; // default debug
    verbose: ILog; // verbose with html
    error: ILog; // error log
}


export const loggerFactory = (site: MangaSite): ILogger => (
    {
        debug: require("debug")([project, site].join(":")),
        verbose: require("debug")([project, site, "verbose"].join(":")),
        // verboseHtml: require("debug")([project, site, "verbose", "html"].join(":")),
        error: require("debug")([project, site, "error"].join(":"))
    });






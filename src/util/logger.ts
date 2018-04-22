import {MangaSite} from "../enum";

const project = "gin-downloader";

export interface ILog {
    (format: string, ...args);
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
        error: require("debug")([project, site, "error"].join(":"))
    });






import { MangaSite } from "../enum";
export interface ILog {
    (format: string, ...args: any[]): any;
}
export interface ILogger {
    debug: ILog;
    verbose: ILog;
    error: ILog;
}
export declare const loggerFactory: (site: MangaSite) => ILogger;

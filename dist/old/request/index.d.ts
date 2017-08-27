/// <reference types="request" />
/**
 * Created by pikax on 23/05/2017.
 */
import { MangaXDoc } from "../declarations";
import { RequestStrategy } from "./headers";
import { OptionsWithUrl } from "request";
export declare class GinRequest {
    readonly headers: {
        [id: string]: string;
    };
    private _headers;
    readonly strategy: RequestStrategy;
    private _strategy;
    constructor(strategy: RequestStrategy);
    request(uri: string | OptionsWithUrl, method?: string, params?: any): Promise<any>;
    getBytes(opts: string | OptionsWithUrl): Promise<any[]>;
    getHtml(opts: string | OptionsWithUrl): Promise<string>;
    getDoc(opts: OptionsWithUrl | string): Promise<MangaXDoc>;
    postBytes(opts: string | OptionsWithUrl, params?: any): Promise<any>;
    postHtml(opts: string | OptionsWithUrl, params?: any): Promise<string>;
    postDoc(opts: string | OptionsWithUrl, params?: any): Promise<any>;
}

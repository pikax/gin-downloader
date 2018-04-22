/// <reference types="cheerio" />
import { IMangaRequest } from "../interface";
export declare class MangaRequestResult implements IMangaRequest {
    private _uri;
    private _html;
    private _$;
    readonly uri: string;
    readonly html: string;
    readonly $: CheerioStatic;
    constructor(_uri: string, _html: string);
}

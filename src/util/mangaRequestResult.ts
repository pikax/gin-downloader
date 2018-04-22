import * as cheerio from "cheerio";
import {IMangaRequest} from "../interface";


export class MangaRequestResult implements IMangaRequest {
    private _$: CheerioStatic;

    get uri() {
        return this._uri;
    }

    get html() {
        return this._html;
    }

    get $() {
        return this._$ || (this._$ = cheerio.load(this.html));
    }

    constructor(private _uri: string, private _html: string) {
    }
}


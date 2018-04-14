import {Chapter, ChapterCollection, ILazy, IManga, IReadOnlyManga, MangaCollection, MangaInfo} from "../interface";
import {filter, FilteredResults, MangaSource} from "../filter";
import FilterSupport = filter.FilterSupport;
import {CheerioStatic} from "cheerio";
import * as cheerio from "cheerio";

import * as url from "url";
import {Genre} from "../enum";


export interface IMangaLogin {
    login(user: string, password: string): Promise;
}


export interface IMangaSite {
    mangas(): Promise<MangaCollection>;

    // info(): Promise<MangaInfo>;
    // chapters(): Promise<ChapterCollection>;
}


export interface IMangaFilter {
    filter(filter: FilterSupport): Promise<FilteredResults>;
}


export interface IMangaLatest {
    latest(): Promise<MangaCollection>;
}


export interface MangaXDoc extends CheerioStatic {
    location: string;
}

//
// export class MangaHereManga implements IReadOnlyManga {
//     private readonly _image: string;
//     private readonly _mature: boolean;
//     private readonly _name: string;
//     private readonly _status: string;
//     private _chapters: ILazy<Promise<ChapterCollection>>;
//     private _info: ILazy<Promise<MangaInfo>>;
//
//     get image() {
//         return this._image;
//     }
//
//     get mature() {
//         return this._mature;
//     }
//
//     get name() {
//         return this._name;
//     }
//
//     get status() {
//         return this._status;
//     }
//
//     get chapters() {
//         return this._chapters;
//     }
//
//     get info() {
//         return this._info;
//     }
//
//
//     constructor(manga: {
//         name: string,
//         status?: string,
//         mature?: boolean,
//         image?: string,
//     }, private _source: string,) {
//         this._name = manga.name;
//         this._status = manga.status;
//         this._mature = manga.mature;
//         this._image = manga.image;
//
//     }
// }


export interface IMangaRequest {
    readonly uri: url;

    readonly html: string;

    readonly $: CheerioStatic;
}


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


export interface IMangaParser {
    mangas(mangaRequest: MangaRequestResult): Iterable<MangaSource>;

    // latest chapters
    latest(mangaRequest: MangaRequestResult): Iterable<Chapter & { src: string }>;

    // info manga
    info(mangaRequest: MangaRequestResult): MangaInfo;

    // chapters
    chapters(mangaRequest: MangaRequestResult): Iterable<Chapter & { src: string }>;


    // image urls
    imagesPaths(mangaRequest: MangaRequestResult): Iterable<{ name: string; src: string }>;

    // single image
    image(mangaRequest: MangaRequestResult): string;


    // returns the current filter page
    filterPage(mangaRequest: MangaRequestResult): { page: number; total: number };
}


export interface IMangaConfig {
    readonly name: string;
    readonly site: string;

    readonly mangasUrl: string;
    readonly latestUrl: string;

}


export enum MangaSite {
    MangaHere = "mangahere",
}


export interface IGenreSite {
    toSiteGenre(genre: Genre): string;
    fromSiteGenre(genre: string): Genre;

    isSupported(genre: Genre): boolean;

    supported(): Genre[];
}

























import {
    IChapter,
    MangaCollection,
    MangaInfo,
    ChapterSource
} from "../interface";
import {filter, FilteredResults, MangaSource} from "../filter";
import FilterSupport = filter.FilterSupport;

import {Genre} from "../enum";
import {OptionsWithUri} from "request";

import * as cheerio from "cheerio";


export interface IMangaLogin {
    login(user: string, password: string): Promise<boolean>;
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

export interface IMangaVisitor {
    latest(): IterableIterator<{ href: string, page: number; total: number }>;

    mangas(): IterableIterator<{ href: string, page: number; total: number }>;
}

export interface IMangaRequest {
    readonly uri: string;

    readonly html: string;

    readonly $: CheerioStatic;
}

export interface IMangaRequestFactory {
    request(options: OptionsWithUri): Promise<IMangaRequest>;
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
    mangas(mangaRequest: IMangaRequest): IterableIterator<MangaSource>;

    // latest chapters
    latest(mangaRequest: IMangaRequest): IterableIterator<IChapter & { src: string }>;

    // info manga
    info(mangaRequest: IMangaRequest): MangaInfo;

    // chapters
    chapters(mangaRequest: IMangaRequest): IterableIterator<ChapterSource>;


    // image urls
    imagesPaths(mangaRequest: IMangaRequest): IterableIterator<{ name: string; src: string }>;

    // single image
    image(mangaRequest: IMangaRequest): string;


    // returns the current filter page
    filterPage(mangaRequest: IMangaRequest): { page: number; total: number };
}


export interface IMangaConfig {
    readonly name: string;
    readonly site: string;

    readonly mangasUrl: string;
    readonly latestUrl: string;
}


// resolves the url and params a website
export interface IFilterSource {
    process(filter: FilterSupport): IFilterSourceResult;
}

export interface IFilterSourceResult {
    src: string;
    params?: any;
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


//
// export class SuperMangaSite {
//
//     constructor(private _config: IMangaConfig, private _requestFactory: IMangaRequestFactory, private _parser: IMangaParser, private _visitor: IMangaVisitor) {
//
//     }
//
//     mangas(): Promise<IMangaExtended[]> {
//         return null;
//     }
//
//     async latest(): Promise<IChapterExtended> {
//         // const self = this;
//
//         // return co(function* () {
//         //
//         //     for (const c of self._visitor.latest()) {
//         //         yield *
//         //     }
//         //
//         // });
//
//
//         const it = await this.latestProc(this._config.latestUrl);
//
//         it.map(x => new SuperMangaChapter())
//
//
//     }
//
//     async latestProc(src: string) {
//         const result = await this._requestFactory.request({
//             uri: src
//         });
//
//         return [...this._parser.latest(result)];
//     }
//
//     /*
//         async* latest(): Promise<Iterable<IChapterExtended>> {
//             const latestUrl = this._config.latestUrl;
//
//             const result = await this._requestFactory.request({
//                 uri: latestUrl
//             });
//
//
//             for (const c of this._parser.latest(result)) {
//
//                 // yield new
//             }
//
//
//         }*/
//
//
//     async allImagesResolver(chapterSrc: string): Promise<ILazy<Promise<ImageSource>>[]> {
//         let href = url.resolve(this._config.site, chapterSrc).toString();
//         let result = await this._requestFactory.request({uri: href});
//
//         const paths = this._parser.imagesPaths(result);
//         paths.next(); // skip first, because we requested that already
//
//         let src = this._parser.image(result);
//
//         const promises = [
//             new Lazy<Promise<ImageSource>>(() => Promise.resolve({
//                 name: url.parse(src).pathname.split("/").reverse()[0],
//                 src
//             }))
//         ];
//
//
//         const promiseRequest = async (s): Promise<ImageSource> => {
//             const h = url.resolve(href, s).toString();
//             const result = await this._requestFactory.request({uri: h})
//             const src = this._parser.image(result);
//
//             return {
//                 name: url.parse(src).pathname.split("/").reverse()[0],
//                 src
//             };
//         };
//
//
//         for (const it of paths) {
//             promises.push(new Lazy<Promise<ImageSource>>(() => promiseRequest(it.src)));
//         }
//
//
//         return promises;
//     }
//
//
//     * allImagesResolver2(chapterSrc: string) {
//         const it = this._imagesResolver(chapterSrc);
//
//         it.next(); // first request
//
//         yield* it;
//     }
//
//     _request(href) {
//         return this._requestFactory.request({uri: href});
//     }
//
//
//     * _imagesResolver(chapterSrc: string) {
//         let href = url.resolve(this._config.site, chapterSrc).toString();
//         let result = yield this._requestFactory.request({uri: href});
//
//         const paths = this._parser.imagesPaths(result);
//         paths.next(); // skip first, because we requested that already
//
//         let src = this._parser.image(result);
//
//
//         yield new Lazy<Promise<ImageSource>>(() => Promise.resolve({
//             name: url.parse(src).pathname.split("/").reverse()[0],
//             src
//         }))
//
//
//         const promiseRequest = async (s): Promise<ImageSource> => {
//             const h = url.resolve(href, s).toString();
//             const result = await this._requestFactory.request({uri: h})
//             const src = this._parser.image(result);
//
//             return {
//                 name: url.parse(src).pathname.split("/").reverse()[0],
//                 src
//             };
//         };
//
//
//         for (const it of paths) {
//             yield new Lazy<Promise<ImageSource>>(() => promiseRequest(it.src));
//         }
//
//     }
//
//
//     //
//     // async* imagesResolver2(chapterSrc: string): Iterable<ImageSource> {
//     //     let href = url.resolve(this._config.site, chapterSrc).toString();
//     //
//     //     let result = await this._requestFactory.request({uri: href});
//     //
//     //     const paths = this._parser.imagesPaths(result);
//     //     paths.next(); // skip first, because we requested that already
//     //
//     //
//     //     let src = this._parser.image(result);
//     //
//     //     yield {
//     //         name: url.parse(src).pathname.split("/").reverse()[0],
//     //         src
//     //     };
//     //
//     //
//     //     for (const p of paths) {
//     //         const h = url.resolve(href, p.src).toString();
//     //         result = await this._requestFactory.request({uri: h})
//     //         src = this._parser.image(result);
//     //
//     //         yield {
//     //             name: url.parse(src).pathname.split("/").reverse()[0],
//     //             src
//     //         };
//     //     }
//     //
//     // }
//
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/// <reference types="node" />
declare module "declarations" {
    /**
     * Created by rodriguesc on 24/03/2017.
     */
    import { URL } from "url";
    import "cheerio";
    export interface MangaXDoc extends CheerioStatic {
        location: string;
    }
    export interface Request {
        getHtml(requestedPath: string | URL, params?: any): Promise<string>;
        getBytes(requestedPath: string | URL, params?: any): Promise<any>;
        getDoc(requestedPath: string): Promise<MangaXDoc>;
        postHtml(requestedPath: string | URL, params?: any): Promise<string>;
        postBytes(requestedPath: string | URL, params?: any): Promise<any>;
        postDoc(requestedPath: string | URL, params?: any): Promise<MangaXDoc>;
    }
    export interface NameHelper {
        toName(name: string): string;
        resolveUrl(name: string): string;
    }
    export interface SiteConfig {
        site: string;
        name: string;
        mangas_url: string;
        latest_url: string;
    }
    export interface MangaSource {
        name: string;
        src: string;
        status?: string;
        mature?: boolean;
    }
    export interface Chapter {
        chap_number?: string | number;
        src: string;
        volume?: string;
        name?: string;
        language?: string;
        scanlator?: string;
        dateAdded?: string;
    }
    export interface MangaInfo {
        image: string;
        title: string;
        synonyms?: string[];
        released?: string;
        authors?: string[];
        artists?: string[];
        genres?: string[];
        synopsis?: string;
        status?: string;
        ranked?: string;
        rating?: string;
        scanlators?: string[];
        similarmanga?: string[];
        direction?: string;
        views?: string;
        type?: string;
    }
    export interface ImageSource {
        src: string;
        name: string;
    }
    export interface SiteParser {
        mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
        filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults;
        latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];
        info(doc: MangaXDoc): Promise<MangaInfo> | MangaInfo;
        chapters(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];
        imagesPaths(doc: MangaXDoc): string[];
        image(html: string): string;
    }
    export interface Site {
        mangas(filter?: MangaFilter): Promise<MangaSource[]>;
        filter(filter?: MangaFilter): Promise<FilteredResults>;
        latest(): Promise<Chapter[]>;
        info(name: string): Promise<MangaInfo>;
        chapters(name: string): Promise<Chapter[]>;
        infoChapters(name: string): Promise<{
            info: MangaInfo;
            chapters: Chapter[];
        }>;
        images(name: string, chapter: number): Promise<Promise<ImageSource>[]>;
        resolveMangaUrl(name: string): Promise<string> | string;
    }
    global  {
        interface String {
            lastDigit(): number;
            firstDigit(): number;
            leftTrim(): string;
            decodeEscapeSequence(): string;
            getMatches(regex: RegExp, index?: number): string[];
        }
    }
    export enum Genre {
        Action,
        Adult,
        Adventure,
        AwardWinning,
        Comedy,
        Comic,
        Cooking,
        Demons,
        Doujinshi,
        Drama,
        Ecchi,
        Fantasy,
        FourKoma,
        GenderBender,
        Harem,
        Historical,
        Horror,
        Josei,
        Lolicon,
        Magic,
        Manga,
        Manhua,
        Manhwa,
        MartialArts,
        Mature,
        Mecha,
        Medical,
        Military,
        Music,
        Mystery,
        Oneshot,
        Psychological,
        Romance,
        SchoolLife,
        SciFi,
        Seinen,
        Shotacon,
        Shoujo,
        ShoujoAi,
        Shounen,
        ShounenAi,
        SliceOfLife,
        Smut,
        Sports,
        Supernatural,
        SuperPower,
        Tragedy,
        Vampire,
        Webtoon,
        Yaoi,
        Yuri,
        NoChapters,
    }
    export enum FilterCondition {
        Equal = 0,
        Contains = 1,
        NotContains = 2,
        StartsWith = 3,
        EndsWith = 4,
        Less = 5,
        Greater = 6,
        LessThan = 7,
        GreaterThan = 8,
    }
    export enum GenreCondition {
        And = 0,
        Or = 1,
    }
    export enum FilterStatus {
        Ongoing,
        Complete,
        Cancelled,
    }
    export enum FilterMangaType {
        Manga,
        Manhwa,
        Manhua,
        Comic,
        Artbook,
        Other,
    }
    export interface NameFilter {
        name: string;
        condition?: FilterCondition;
    }
    export interface ValueFilter {
        value: number;
        condition?: FilterCondition;
    }
    export interface GenreFilter {
        inGenres?: Genre[];
        outGenres?: Genre[];
        condition?: GenreCondition;
    }
    export interface RatingFilter {
        from?: number;
        to?: number;
    }
    export interface AuthorFilter extends NameFilter {
    }
    export interface ArtistFilter extends NameFilter {
    }
    export interface ReleaseFilter extends ValueFilter {
    }
    export interface MangaFilter {
        name?: string;
        page?: number;
        search?: {
            name?: NameFilter | string;
            author?: AuthorFilter | string;
            artist?: ArtistFilter | string;
            status?: FilterStatus;
            released?: ReleaseFilter | number;
            genre?: GenreFilter | Genre[];
            rating?: RatingFilter | number;
            mature?: boolean;
            type?: FilterMangaType;
        };
        sort?: {};
        genres?: Genre[];
        outGenres?: Genre[];
    }
    export interface FilterSupport {
        name?: string;
        page?: number;
        search?: {
            name?: NameFilter;
            author?: AuthorFilter;
            artist?: ArtistFilter;
            status?: FilterStatus;
            released?: ReleaseFilter;
            genre?: GenreFilter;
            rating?: RatingFilter;
            mature?: boolean;
            type?: FilterMangaType;
        };
        sort?: {};
    }
    export interface FilteredResults {
        results: MangaSource[];
        page: number;
        total: number;
    }
}
declare module "request/headers" {
    /**
     * Created by pikax on 23/05/2017.
     */
    import { Options } from "request";
    export const Headers: {
        "Accept-Charset": string;
        "Accept-Language": string;
        "Connection": string;
        "Accept": string;
        "User-Agent": string;
        "Accept-Encoding": string;
    };
    export interface RequestStrategy {
        request(options: string | Options): Promise<any>;
    }
}
declare module "common/helper" {
    import { FilterSupport, MangaFilter, MangaXDoc } from "declarations";
    export const parseDoc: (source: string, params?: {
        location: string;
    }) => MangaXDoc;
    export const sanitize: (children: CheerioElement[]) => CheerioElement[];
    export const procFilter: (condition: string | MangaFilter, def?: MangaFilter) => FilterSupport;
}
declare module "request/index" {
    /**
     * Created by pikax on 23/05/2017.
     */
    import { MangaXDoc } from "declarations";
    import { RequestStrategy } from "request/headers";
    import { OptionsWithUrl } from "request";
    export class GinRequest {
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
        postDoc(opts: string | OptionsWithUrl, params?: any): Promise<MangaXDoc>;
    }
}
declare module "common/mangasite" {
    /**
     * Created by rodriguesc on 24/03/2017.
     */
    import { Chapter, SiteConfig, ImageSource, MangaInfo, MangaSource, NameHelper, SiteParser, Site, MangaFilter, FilteredResults, MangaXDoc } from "declarations";
    import { IDebugger } from "debug";
    import { RequestStrategy } from "request/headers";
    import { GinRequest } from "request/index";
    import { OptionsWithUrl } from "request";
    export class MangaSite<C extends SiteConfig, P extends SiteParser, N extends NameHelper> implements Site {
        private _parser;
        protected verbose: IDebugger;
        protected debug: IDebugger;
        private _config;
        private _nameHelper;
        private _request;
        readonly parser: P;
        readonly config: C;
        readonly nameHelper: N;
        readonly request: GinRequest;
        protected constructor(config: C, parser: P, nameHelper: N, strategy: RequestStrategy);
        mangas(): Promise<MangaSource[]>;
        filter(filter?: MangaFilter): Promise<FilteredResults>;
        latest(): Promise<Chapter[]>;
        info(name: string): Promise<MangaInfo>;
        chapters(name: string): Promise<Chapter[]>;
        infoChapters(name: string): Promise<{
            info: MangaInfo;
            chapters: Chapter[];
        }>;
        images(name: string, chapter: any): Promise<Promise<ImageSource>[]>;
        resolveMangaUrl(name: string): Promise<string> | string;
        protected buildRequest(url: string): OptionsWithUrl;
        protected buildMangasRequest(url: string): OptionsWithUrl;
        protected buildLatestRequest(url: string): OptionsWithUrl;
        protected buildInfoRequest(url: string): OptionsWithUrl;
        protected buildChapterRequest(url: string): OptionsWithUrl;
        protected buildImagePathsRequest(url: string): OptionsWithUrl;
        protected getHtml(url: string | OptionsWithUrl): Promise<string>;
        protected getDoc(url: string | OptionsWithUrl): Promise<MangaXDoc>;
        protected postDoc(url: string | OptionsWithUrl, params?: any): Promise<MangaXDoc>;
        protected resolveChapterSource(name: string, chapter: number): Promise<string>;
        private processImagePath(opts);
    }
    export default Site;
}
declare module "sites/mangafox/config" {
    /**
     * Created by rodriguesc on 24/03/2017.
     */
    import { SiteConfig } from "declarations";
    export const config: SiteConfig;
    export default config;
    export const debug: any;
    export const verbose: any;
}
declare module "sites/mangafox/parser" {
    /**
     * Created by rodriguesc on 24/03/2017.
     */
    import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "declarations";
    export class Parser implements SiteParser {
        mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
        latest($: MangaXDoc): Promise<Chapter[]> | Chapter[];
        info($: MangaXDoc): Promise<MangaInfo> | MangaInfo;
        chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[];
        private static parseChapter(a, span, volume, date);
        imagesPaths($: MangaXDoc): string[];
        image(html: string): string;
        filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults;
    }
    export const parser: Parser;
    export default parser;
}
declare module "sites/mangafox/names" {
    import { NameHelper } from "declarations";
    export class Helper implements NameHelper {
        toName(name: string): string;
        resolveUrl(name: string): string;
    }
    export const helper: Helper;
    export default helper;
}
declare module "request/requestRetryStrategy" {
    import { RequestStrategy } from "request/headers";
    import { OptionsWithUrl } from "request";
    export class RequestRetryStrategy implements RequestStrategy {
        request(options: string | OptionsWithUrl): Promise<any>;
    }
    export const strategy: RequestRetryStrategy;
    export default strategy;
}
declare module "sites/mangafox/filter" {
    /**
     * Created by rodriguesc on 30/03/2017.
     */
    import { MangaFilter } from "declarations";
    export const processFilter: (mangafilter: MangaFilter) => {
        src: string;
        params: any;
    };
}
declare module "sites/mangafox/index" {
    /**
     * Created by david on 24/03/2017.
     */
    import { MangaSite } from "common/mangasite";
    import { Parser } from "sites/mangafox/parser";
    import { Helper } from "sites/mangafox/names";
    import { FilteredResults, MangaFilter, Site, SiteConfig } from "declarations";
    export class MangaFox extends MangaSite<SiteConfig, Parser, Helper> implements Site {
        constructor();
        filter(filter?: MangaFilter): Promise<FilteredResults>;
    }
    export const manga: Site;
    export default manga;
}
declare module "sites/mangahere/config" {
    /**
     * Created by rodriguesc on 03/03/2017.
     */
    import { SiteConfig } from "declarations";
    export const config: SiteConfig;
    export default config;
    export const debug: any;
    export const verbose: any;
}
declare module "sites/mangahere/parser" {
    /**
     * Created by rodriguesc on 03/03/2017.
     */
    import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "declarations";
    import "declarations";
    export class Parser implements SiteParser {
        mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
        latest($: MangaXDoc): Promise<Chapter[]> | Chapter[];
        info($: MangaXDoc): Promise<MangaInfo> | MangaInfo;
        chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[];
        private static parseChapter(a, span, date);
        imagesPaths($: MangaXDoc): string[];
        image(html: string): string;
        filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults;
    }
    export const parser: Parser;
    export default parser;
}
declare module "sites/mangahere/names" {
    import { NameHelper } from "declarations";
    export class Helper implements NameHelper {
        toName(name: string): string;
        resolveUrl(name: string): string;
    }
    export const helper: Helper;
    export default helper;
}
declare module "sites/mangahere/filter" {
    /**
     * Created by rodriguesc on 30/03/2017.
     */
    import { MangaFilter } from "declarations";
    export const processFilter: (mangafilter: MangaFilter) => {
        src: string;
        params?: any;
    };
}
declare module "sites/mangahere/index" {
    /**
     * Created by rodriguesc on 03/03/2017.
     */
    import { MangaSite } from "common/mangasite";
    import { Parser } from "sites/mangahere/parser";
    import { Helper } from "sites/mangahere/names";
    import { FilteredResults, MangaFilter, SiteConfig } from "declarations";
    export class MangaHere extends MangaSite<SiteConfig, Parser, Helper> {
        constructor();
        filter(filter?: MangaFilter): Promise<FilteredResults>;
    }
    export const manga: MangaHere;
    export default manga;
}
declare module "sites/mangapanda/config" {
    /**
     * Created by rodriguesc on 05/03/2017.
     */
    import { SiteConfig } from "declarations";
    export const config: SiteConfig;
    export default config;
    export const debug: any;
    export const verbose: any;
}
declare module "sites/mangapanda/parser" {
    import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "declarations";
    export class Parser implements SiteParser {
        private static fixNames;
        private static resolveName;
        mangas($: MangaXDoc): MangaSource[] | Promise<MangaSource[]>;
        latest($: MangaXDoc): Chapter[] | Promise<Chapter[]>;
        info($: MangaXDoc): MangaInfo | Promise<MangaInfo>;
        chapters($: MangaXDoc): Chapter[] | Promise<Chapter[]>;
        private static parseChapter(a, text, date);
        imagesPaths($: MangaXDoc): string[];
        image(html: string): string;
        filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults;
    }
    export const parser: Parser;
    export default parser;
}
declare module "sites/mangapanda/names" {
    import { NameHelper } from "declarations";
    export class Helper implements NameHelper {
        toName(name: string): string;
        resolveUrl(name: string): string;
    }
    export const helper: Helper;
    export default helper;
}
declare module "sites/mangapanda/filter" {
    /**
     * Created by rodriguesc on 30/03/2017.
     */
    import { MangaFilter } from "declarations";
    export const processFilter: (mangafilter: MangaFilter) => {
        src: string;
        params: any;
    };
}
declare module "sites/mangapanda/index" {
    /**
     * Created by rodriguesc on 05/03/2017.
     */
    import { MangaSite } from "common/mangasite";
    import { Parser } from "sites/mangapanda/parser";
    import { Helper } from "sites/mangapanda/names";
    import { FilteredResults, MangaFilter, SiteConfig } from "declarations";
    export class MangaPanda extends MangaSite<SiteConfig, Parser, Helper> {
        constructor();
        protected resolveChapterSource(name: string, chapter: number): Promise<string>;
        filter(filter?: MangaFilter): Promise<FilteredResults>;
    }
    export const manga: MangaPanda;
    export default manga;
}
declare module "sites/kissmanga/config" {
    /**
     * Created by rodriguesc on 24/03/2017.
     */
    import { SiteConfig } from "declarations";
    export const config: SiteConfig;
    export default config;
    export const debug: any;
    export const verbose: any;
}
declare module "sites/kissmanga/parser" {
    /**
     * Created by rodriguesc on 24/03/2017.
     */
    import "declarations";
    import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "declarations";
    import { Script } from "vm";
    export class Parser implements SiteParser {
        private _vm;
        private static fixNames;
        private static resolveName;
        mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
        latest($: MangaXDoc): Promise<Chapter[]> | Chapter[];
        info($: MangaXDoc): Promise<MangaInfo> | MangaInfo;
        chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[];
        imagesList(html: string, secret: string, vm: Script): string[];
        getSecret(html: string): string;
        imagesPaths(doc: MangaXDoc): string[];
        image(html: string): string;
        readonly VM: Script;
        buildVM(cajs: string, lojs: string): Script;
        filter(doc: MangaXDoc): Promise<FilteredResults> | FilteredResults;
        static ResolveChapterVolume(title: string): string;
        static ResolveChapterNumber(title: string): number;
        static ResolveChapterName(title: string): string;
    }
    export const parser: Parser;
    export default parser;
}
declare module "sites/kissmanga/names" {
    import { NameHelper } from "declarations";
    export class Helper implements NameHelper {
        toName(name: string): string;
        resolveUrl(name: string): string;
    }
    export const helper: Helper;
    export default helper;
}
declare module "sites/kissmanga/filter" {
    /**
     * Created by rodriguesc on 30/03/2017.
     */
    import { MangaFilter } from "declarations";
    export const processFilter: (mangafilter: MangaFilter) => {
        src: string;
        params: any;
    };
}
declare module "request/requestCloudFareStrategy" {
    /**
     * Created by pikax on 23/05/2017.
     */
    import { OptionsWithUrl } from "request";
    import { RequestStrategy } from "request/headers";
    export class RequestCloudFareStrategy implements RequestStrategy {
        request(options: string | OptionsWithUrl): Promise<any>;
    }
    export const strategy: RequestCloudFareStrategy;
    export default strategy;
}
declare module "sites/kissmanga/index" {
    /**
     * Created by david on 24/03/2017.
     */
    import { MangaSite } from "common/mangasite";
    import { Parser } from "sites/kissmanga/parser";
    import { Helper } from "sites/kissmanga/names";
    import { FilteredResults, MangaFilter, ImageSource, MangaSource, Site, SiteConfig } from "declarations";
    export class KissManga extends MangaSite<SiteConfig, Parser, Helper> implements Site {
        constructor();
        private getVM();
        mangas(filter?: MangaFilter): Promise<MangaSource[]>;
        filter(filter?: MangaFilter): Promise<FilteredResults>;
        images(name: string, chapNumber: number): Promise<Promise<ImageSource>[]>;
    }
    export const manga: Site;
    export default manga;
}
declare module "sites/batoto/config" {
    /**
     * Created by rodriguesc on 24/03/2017.
     */
    import { SiteConfig } from "declarations";
    export const config: SiteConfig;
    export default config;
    export const debug: any;
    export const verbose: any;
}
declare module "sites/batoto/parser" {
    /**
     * Created by rodriguesc on 19/04/2017.
     */
    import "declarations";
    import { Chapter, FilteredResults, MangaInfo, MangaSource, MangaXDoc, SiteParser } from "declarations";
    export class Parser implements SiteParser {
        mangas($: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
        latest($: MangaXDoc): Promise<Chapter[]> | Chapter[];
        info($: MangaXDoc): Promise<MangaInfo> | MangaInfo;
        chapters($: MangaXDoc): Promise<Chapter[]> | Chapter[];
        imagesPaths($: MangaXDoc): string[];
        static convertChapterReaderUrl(src: string): string;
        image(html: string): string;
        filter($: MangaXDoc): Promise<FilteredResults> | FilteredResults;
        static extractChapterNumber(text: string): number;
        static extractVolumeNumber(text: string): string;
        static extractChapterName(text: string): string;
    }
    export const parser: Parser;
    export default parser;
}
declare module "sites/batoto/names" {
    import { NameHelper } from "declarations";
    export class Helper implements NameHelper {
        toName(name: string): string;
        resolveUrl(name: string): string;
    }
    export const helper: Helper;
    export default helper;
}
declare module "sites/batoto/filter" {
    /**
     * Created by rodriguesc on 30/03/2017.
     */
    import { MangaFilter } from "declarations";
    export const processFilter: (mangafilter: MangaFilter) => {
        src: string;
    };
}
declare module "sites/batoto/index" {
    /**
     * Created by david on 24/03/2017.
     */
    import { MangaSite } from "common/mangasite";
    import { Parser } from "sites/batoto/parser";
    import { Helper } from "sites/batoto/names";
    import { FilteredResults, MangaFilter, MangaSource, Site, SiteConfig } from "declarations";
    import { OptionsWithUrl } from "request";
    export class Batoto extends MangaSite<SiteConfig, Parser, Helper> implements Site {
        private _urlCache;
        constructor();
        resolveMangaUrl(name: string): Promise<string>;
        mangas(filter?: MangaFilter): Promise<MangaSource[]>;
        filter(filter?: MangaFilter): Promise<FilteredResults>;
        resolveChapterSource(name: string, chapter: number): Promise<string>;
        buildChapterRequest(url: string): OptionsWithUrl;
        isLoggedIn(): Promise<boolean>;
        logIn(user: string, pw: string, rememberMe?: boolean): Promise<boolean>;
    }
    export const manga: Batoto;
    export default manga;
}
declare module "index" {
    /**
     * Created by david on 25/03/2017.
     */
    import "declarations";
    import { manga as mangafox } from "sites/mangafox/index";
    import { manga as mangahere } from "sites/mangahere/index";
    import { manga as mangapanda } from "sites/mangapanda/index";
    import { manga as kissmanga } from "sites/kissmanga/index";
    import { manga as batoto } from "sites/batoto/index";
    export { mangafox, mangahere, mangapanda, kissmanga, batoto };
}

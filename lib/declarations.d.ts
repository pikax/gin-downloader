/// <reference types="node" />
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
    mangas(filter?: FilterSupport): Promise<MangaSource[]>;
    filter(filter?: FilterSupport): Promise<FilteredResults>;
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
declare global  {
    interface String {
        lastDigit(): number;
        firstDigit(): number;
        leftTrim(): string;
        decodeEscapeSequence(): string;
        getMatches(regex: RegExp, index?: number): string[];
    }
}
export declare enum Genre {
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
export declare enum FilterCondition {
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
export declare enum GenreCondition {
    And = 0,
    Or = 1,
}
export declare enum FilterStatus {
    Ongoing,
    Complete,
    Cancelled,
}
export declare enum FilterMangaType {
    Manga = 0,
    Manhwa = 1,
    Manhua = 2,
    Comic = 3,
    Artbook = 4,
    Other = 5,
}
export interface FilterSupport {
    name?: string;
    page?: number;
    search?: {
        name?: {
            name: string;
            condition?: FilterCondition;
        };
        author?: {
            name: string;
            condition?: FilterCondition;
        };
        artist?: {
            name: string;
            condition?: FilterCondition;
        };
        status?: FilterStatus;
        released?: {
            value: number;
            condition?: FilterCondition;
        };
        genre?: {
            inGenres?: Genre[];
            outGenres?: Genre[];
            condition?: GenreCondition;
        };
        rating?: {};
        mature?: {};
        type?: FilterMangaType;
    };
    sort?: {};
    genres?: Genre[];
    outGenres?: Genre[];
}
export interface FilteredResults {
    results: MangaSource[];
    page: number;
    total: number;
}

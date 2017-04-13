/// <reference types="node" />
/**
 * Created by rodriguesc on 24/03/2017.
 */
import { HTMLDocument } from "libxmljs";
import { URL } from "url";
export interface MangaXDoc extends HTMLDocument {
    baseUrl: string;
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
}
export interface Chapter {
    chap_number?: string | number;
    src: string;
    volume?: string;
    name?: string;
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
}
export interface ImageSource {
    src: string;
    name: string;
}
export interface SiteParser {
    mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
    latest(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];
    info(doc: MangaXDoc): Promise<MangaInfo> | MangaInfo;
    chapters(doc: MangaXDoc): Promise<Chapter[]> | Chapter[];
    imagesPaths(doc: MangaXDoc): string[];
    image(html: string): string;
}
export interface Site {
    mangas(filter?: FilterSupport): Promise<MangaSource[]>;
    latest(): Promise<Chapter[]>;
    info(name: string): Promise<MangaInfo>;
    chapters(name: string): Promise<Chapter[]>;
    infoChapters(name: string): Promise<{
        info: MangaInfo;
        chapters: Chapter[];
    }>;
    images(name: string, chapter: number): Promise<Promise<ImageSource>[]>;
}
declare global  {
    interface Promise<T> {
        tap<U>(result?: (result: any) => U): Promise<T>;
    }
    interface String {
        lastDigit(): number;
        firstDigit(): number;
        leftTrim(): string;
        decodeEscapeSequence(): string;
        getMatches(regex: RegExp, index: number): string[];
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
    Manga,
    Manhua,
    Manhwa,
    MartialArts,
    Mature,
    Mecha,
    Medical,
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
    Tragedy,
    Webtoon,
    Yaoi,
    Yuri,
    NoChapters,
}
export declare enum FilterCondition {
    Contains = 0,
    NotContains = 1,
    StartsWith = 2,
    EndsWith = 3,
    Less = 4,
    Greater = 5,
    LessThan = 6,
    GreaterThan = 7,
}
export interface FilterSupport {
    name?: string;
    page?: number;
    search?: {
        name: {
            name: string;
            condition: FilterCondition;
        };
    };
    genres?: Genre[];
    outGenres?: Genre[];
}

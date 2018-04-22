/// <reference types="cheerio" />
/// <reference types="request" />
import { IChapter, MangaCollection, MangaInfo, ChapterSource } from "../interface";
import { filter, FilteredResults, MangaSource } from "../filter";
import FilterSupport = filter.FilterSupport;
import { Genre } from "../enum";
import { OptionsWithUri } from "request";
export interface IMangaLogin {
    login(user: string, password: string): Promise<boolean>;
}
export interface IMangaSite {
    mangas(): Promise<MangaCollection>;
}
export interface IMangaFilter {
    filter(filter: FilterSupport): Promise<FilteredResults>;
}
export interface IMangaLatest {
    latest(): Promise<MangaCollection>;
}
export interface IMangaVisitor {
    latest(): IterableIterator<{
        href: string;
        page: number;
        total: number;
    }>;
    mangas(): IterableIterator<{
        href: string;
        page: number;
        total: number;
    }>;
}
export interface IMangaRequest {
    readonly uri: string;
    readonly html: string;
    readonly $: CheerioStatic;
}
export interface IMangaRequestFactory {
    request(options: OptionsWithUri): Promise<IMangaRequest>;
}
export declare class MangaRequestResult implements IMangaRequest {
    private _uri;
    private _html;
    private _$;
    readonly uri: string;
    readonly html: string;
    readonly $: CheerioStatic;
    constructor(_uri: string, _html: string);
}
export interface IMangaParser {
    mangas(mangaRequest: IMangaRequest): IterableIterator<MangaSource>;
    latest(mangaRequest: IMangaRequest): IterableIterator<IChapter & {
        src: string;
    }>;
    info(mangaRequest: IMangaRequest): MangaInfo;
    chapters(mangaRequest: IMangaRequest): IterableIterator<ChapterSource>;
    imagesPaths(mangaRequest: IMangaRequest): IterableIterator<{
        name: string;
        src: string;
    }>;
    image(mangaRequest: IMangaRequest): string;
    filterPage(mangaRequest: IMangaRequest): {
        page: number;
        total: number;
    };
}
export interface IMangaConfig {
    readonly name: string;
    readonly site: string;
    readonly mangasUrl: string;
    readonly latestUrl: string;
}
export interface IFilterSource {
    process(filter: FilterSupport): IFilterSourceResult;
}
export interface IFilterSourceResult {
    src: string;
    params?: any;
}
export declare enum MangaSite {
    MangaHere = "mangahere",
}
export interface IGenreSite {
    toSiteGenre(genre: Genre): string;
    fromSiteGenre(genre: string): Genre;
    isSupported(genre: Genre): boolean;
    supported(): Genre[];
}

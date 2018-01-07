/// <reference types="cheerio" />
import { MangaFilter } from "./filter";
import { Lazy } from "./util";
import { Type } from "./enum";
export interface Source {
    src: string;
}
export interface Manga {
    name: string;
    status?: string;
    mature?: boolean;
    image?: string;
}
export interface Chapter {
    chap_number?: string;
    volume?: string;
    name?: string;
    language?: string;
    scanlator?: string;
    dateAdded?: string;
    licensed?: boolean;
}
export interface Synonym {
    title: string;
    language: string;
}
export interface Info {
    image: string;
    title: string;
    synonyms?: Synonym[];
    released?: string;
    authors?: string[];
    artists?: string[];
    genres?: string[];
    synopsis?: string;
    status?: string;
    type?: Type;
    licensed?: boolean;
    mature?: boolean;
    ranked?: string;
    rating?: string;
    scanlators?: string[];
    similar?: string[];
    views?: string;
}
export interface GinImage extends Source {
    name: string;
}
export interface MangaResults {
    results: Manga[];
    page: number;
    total: number;
}
export declare type GinImagePromise = Lazy<Promise<GinImage>>;
export declare type ChapterCollection = Chapter[];
export declare type MangaCollection = Manga[];
export declare type ImageCollection = GinImagePromise[];
export declare type InfoChapter = Info & {
    chapters: ChapterCollection;
};
export interface Site {
    mangas(filter?: MangaFilter): Promise<MangaCollection>;
    filter(filter?: MangaFilter): Promise<MangaResults>;
    latest(): Promise<ChapterCollection>;
    info(name: string): Promise<Info>;
    chapters(name: string): Promise<ChapterCollection>;
    infoChapters(name: string): Promise<InfoChapter>;
    images(name: string, chapter: string | number): Promise<ImageCollection>;
    infoChaptersByUrl(url: string): Promise<InfoChapter>;
    imagesByUrl(url: string): Promise<ImageCollection>;
}
export interface LoginSite extends Site {
    login(user: string, pw: string, rememberMe?: boolean): Promise<boolean>;
}
export declare namespace gin {
    interface Request {
        getHtml(requestedPath: string | URL, params?: any): Promise<string>;
        getBytes(requestedPath: string | URL, params?: any): Promise<any>;
        getDoc(requestedPath: string): Promise<MangaXDoc>;
        postHtml(requestedPath: string | URL, params?: any): Promise<string>;
        postBytes(requestedPath: string | URL, params?: any): Promise<any>;
        postDoc(requestedPath: string | URL, params?: any): Promise<MangaXDoc>;
    }
    interface MangaXDoc extends CheerioStatic {
        location: string;
    }
    interface SiteConfig {
        site: string;
        name: string;
        mangas_url: string;
        latest_url: string;
    }
    interface GinSite extends Site {
        resolveMangaUrl(name: string): Promise<string> | string;
    }
    type MangaSource = Manga & Source;
    type ChapterSource = Chapter & Source;
    type MangaInfoSource = Info & Source;
    interface SiteParser {
        mangas(doc: MangaXDoc): Promise<MangaSource[]> | MangaSource[];
        filter(doc: MangaXDoc): Promise<MangaResults> | MangaResults;
        latest(doc: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];
        info(doc: MangaXDoc): Promise<Info> | Info;
        chapters(doc: MangaXDoc): Promise<ChapterSource[]> | ChapterSource[];
        imagesPaths(doc: MangaXDoc): string[];
        image(html: string): string;
    }
    interface NameHelper {
        toName(name: string): string;
        resolveUrl(name: string): string;
    }
}

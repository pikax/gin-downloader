import {MangaFilter} from "./filter";
import {FilterStatus, Type} from "./enum";



export interface Source {
    src: string;
}

export interface IReadOnlyMangaOld {
    readonly name: string;
    readonly status?: string;
    readonly mature?: boolean;
    readonly image?: string;

    readonly info: ILazy<Promise<MangaInfo>>;
    readonly chapters: ILazy<Promise<ChapterCollection>>;
}


export interface IManga {
    name: string;
    status?: string;
    mature?: boolean;
    image?: string;

    info: ILazy<Promise<MangaInfo>>;
    chapters: ILazy<Promise<ChapterCollection>>;
}

export interface IReadOnlyManga extends Readonly<IManga> {

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


    // site specific
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
    results: IManga[];
    page: number;
    total: number;
}


export interface ILazy<T> {
    readonly value: T;
}




export interface MangaInfo {
    image: string;
    title: string;

    synonyms?: Synonym[];
    released?: string;
    authors?: string[];
    artists?: string[];
    genres?: string[];
    synopsis?: string;

    status?: FilterStatus;
    ranked?: string;
    rating?: string;
    scanlators?: string[];
    similarmanga?: string[];
    direction?: string;

    views?: string;
    type?: string;

    licensed?: boolean;
}

export type GinImagePromise = ILazy<Promise<GinImage>>;
export type ChapterCollection = Chapter[];
export type MangaCollection = IManga[];
export type ImageCollection = GinImagePromise[];
export type InfoChapter = Info & { chapters: ChapterCollection };


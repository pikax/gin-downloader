import {FilterStatus, Type} from "./enum";
import {Response, OptionsWithUri} from "request";
import {
    IFilterSource,
    IGenreSite,
    IMangaConfig,
    IMangaParser,
    IMangaVisitor
} from "./manga/interface";
import {ILogger} from "./util/logger";
import {IMangaRequestFactory} from "../build/manga/interface";
import {Partial} from "rollup-plugin-typescript2/dist/partial";


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

}


export interface IMangaExtended extends IReadOnlyManga {
    readonly info: Promise<MangaInfo>;
    readonly chapters: Promise<IChapterExtended[]>;
}

export interface IReadOnlyManga extends Readonly<IManga> {

}


export interface IChapter {
    chap_number?: string;
    volume?: string;
    name?: string;

    language?: string;
    scanlator?: string;
    dateAdded?: string;

    licensed?: boolean;
}

export interface IChapterExtended extends IChapter {

    readonly images: Promise<ImageCollection>;

    readonly manga: Promise<IMangaExtended>;
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


export interface IRequestStrategy {
    request(options: OptionsWithUri): Promise<Response>;
}


export interface IImageFactory {
    create();
}

export interface IMangaFactory {
    create(src: string, manga: IManga);
}


export interface IMangaBuildFactoryDependency {

}


export interface IChapterFactory {
    create();
}


export interface IMangaObject {

    info(): Promise<MangaInfo>;

    chapters(): Promise<IChapter[]>;

    images(chapter): Promise<ImageCollection>;
}


export interface IChapterResolver {
    chapters(src): Promise<ChapterSource[]>;
}

export interface IImageResolver {
    images(src): Promise<ImageCollection>;
}

export interface IMangaInfoResolver {
    info(src): Promise<MangaInfo>;
}


export interface IMangaConfigDependency {
    config: IMangaConfig;
}

export interface IMangaLoggerDependency {
    logger: ILogger;
}

export interface IMangaGenreDependency {
    genre: IGenreSite;
}

export interface IMangaFilterDependency {
    filter: IFilterSource;
}

export interface IMangaParserDependency {
    parser: IMangaParser;
}

export interface IMangaVisitorDependency {
    visitor: IMangaVisitor;
}

export interface IMangaRequestFactoryDependency {
    requestFactory: IMangaRequestFactory;
}


export interface IChapterResolverDependency {
    chapterResolver: IChapterResolver;
}


export interface IInfoResolverDependency {
    infoResolver: IMangaInfoResolver;
}

export interface IImageResolverDependency {
    imageResolver: IImageResolver;
}


export interface IMangaDependencies extends IMangaConfigDependency, IMangaLoggerDependency, IMangaGenreDependency, IMangaFilterDependency, IMangaParserDependency, IMangaVisitorDependency, IMangaRequestFactoryDependency {

}

export type RequestFactoryMangaDependencies = Partial<IMangaDependencies> & IMangaRequestFactoryDependency;


export interface IMangaResolvers extends IInfoResolverDependency, IChapterResolverDependency, IImageResolverDependency {

}

export interface IMangaResolversFactory {
    build(di: IMangaDependencies): IMangaResolvers;
}


export interface IMangaResolversFactoryDependency {
    resolverFactory: IMangaResolversFactory;
}

export interface IMangaBuilder {
    build(di: RequestFactoryMangaDependencies): IMangaDependencies;
}


export interface IMangaBuilderDependency {
    diBuilder: IMangaBuilder;
}

export type GinImagePromise = ILazy<Promise<GinImage>>;
export type ChapterCollection = IChapter[];
export type MangaCollection = IManga[];
export type ImageCollection = GinImagePromise[];
export type InfoChapter = Info & { chapters: ChapterCollection };


export type ChapterSource = IChapter & { src: string };

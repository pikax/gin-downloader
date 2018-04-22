import { IChapter, IMangaRequestFactoryDependency, IMangaResolversFactoryDependency } from "../../interface";
import { FilteredResults, MangaFilter } from "../../filter";
import { MangaObject } from "../../manga";
export declare type MangaHereDependencies = IMangaRequestFactoryDependency & IMangaResolversFactoryDependency;
export declare class MangaHere {
    private _requestFactory;
    private _logger;
    private _genre;
    private _config;
    private _filter;
    private _parser;
    private _visitor;
    private _di;
    private _resolvers;
    constructor(dependencies: MangaHereDependencies);
    mangas(): Promise<MangaObject[]>;
    latest(): Promise<IChapter[]>;
    filter(filter?: MangaFilter | string): Promise<FilteredResults>;
    private buildManga;
}

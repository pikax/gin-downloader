import { MangaHere } from "./manga/mangahere";
export declare type GinBuilderDependencies = {};
export declare class GinBuilder {
    private _mangahere;
    private _mangaHereBuilder;
    private _requestFactory;
    private _requestStrategy;
    private _resolverFactory;
    readonly mangahere: MangaHere;
    constructor(dependencies?: GinBuilderDependencies);
    private buildMangaHere();
}

import { filter } from "../../filter";
import FilterSupport = filter.FilterSupport;
import { IMangaGenreDependency, IFilterSource, IFilterSourceResult } from "../../interface";
export declare type MangaHereFilterDependencies = IMangaGenreDependency;
export declare class MangaHereFilter implements IFilterSource {
    private _genreSite;
    constructor(dependencies: MangaHereFilterDependencies);
    process(filter: FilterSupport): IFilterSourceResult;
}

import { ChapterSource, IChapterResolver, IMangaParserDependency, IMangaRequestFactoryDependency } from "../interface";
export declare type ChapterResolverDependencies = IMangaParserDependency & IMangaRequestFactoryDependency;
export declare class ChapterResolver implements IChapterResolver {
    private _parser;
    private _requestFactory;
    constructor(dependencies: ChapterResolverDependencies);
    chapters(src: string): Promise<ChapterSource[]>;
}

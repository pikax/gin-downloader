import {ChapterSource, IChapterResolver, IMangaParserDependency, IMangaRequestFactoryDependency} from "../interface";
import {IMangaParser, IMangaRequestFactory} from "../interface";



export type ChapterResolverDependencies = IMangaParserDependency & IMangaRequestFactoryDependency;

export class ChapterResolver implements IChapterResolver {
    private _parser: IMangaParser;
    private _requestFactory: IMangaRequestFactory;

    constructor(dependencies: ChapterResolverDependencies) {
        this._parser = dependencies.parser;
        this._requestFactory = dependencies.requestFactory;
    }

    async chapters(src: string): Promise<ChapterSource[]> {
        const result = await this._requestFactory.request({uri: src});
        return Array.from(this._parser.chapters(result));
    }
}



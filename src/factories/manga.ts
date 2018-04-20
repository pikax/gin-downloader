import {
    ChapterSource,
    IChapter,
    IChapterExtended,
    IChapterResolver,
    ILazy,
    ImageCollection,
    IManga, IMangaBuilder, IMangaBuilderDependency,
    IMangaExtended,
    IMangaFactory,
    IMangaInfoResolver,
    IMangaObject,
    IMangaParserDependency,
    IMangaRequestFactoryDependency,
    IMangaResolversFactory, IMangaResolversFactoryDependency,
    Info,
    IReadOnlyManga,
    MangaInfo
} from "../interface";
import {IMangaConfig, IMangaParser, IMangaRequest, IMangaRequestFactory, MangaRequestResult} from "../manga/interface";
import {Lazy} from "../util/lazy";
import {MangaObject} from "../manga";


type di =
    IMangaRequestFactoryDependency
    & IMangaParserDependency
    & IMangaResolversFactoryDependency
    & IMangaBuilderDependency;

export class ExtendedMangaFactory implements IMangaFactory {
    private _requestFactory: IMangaRequestFactory;
    private _parser: IMangaParser;
    private _resolverFactory: IMangaResolversFactory;
    private _diBuilder: IMangaBuilder;

    constructor(dependencies: di) {
        this._requestFactory = dependencies.requestFactory;
        this._parser = dependencies.parser;
        this._resolverFactory = dependencies.resolverFactory;
        this._diBuilder = dependencies.diBuilder;
    }


    create(src: string, manga: IManga): IMangaObject {
        const dependenciesBuilder = {
            requestFactory: this._requestFactory,
        };
        const m = new MangaObject(this._resolverFactory.build(this._diBuilder.build(dependenciesBuilder)), src, manga);

        return m;
    }


}


interface IImageResolver {
}




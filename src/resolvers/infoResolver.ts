import {
    IMangaConfigDependency,
    IMangaInfoResolver,
    IMangaParserDependency,
    IMangaRequestFactoryDependency,
    IMangaConfig, IMangaParser, IMangaRequestFactory,
    Info,
    MangaInfo
} from "../interface";


export type InfoResolverDependencies = IMangaParserDependency & IMangaConfigDependency & IMangaRequestFactoryDependency;

export class InfoResolver implements IMangaInfoResolver {
    private _parser: IMangaParser;
    private _config: IMangaConfig;
    private _requestFactory: IMangaRequestFactory;

    constructor(dependencies: InfoResolverDependencies) {
        this._parser = dependencies.parser;
        this._config = dependencies.config;
        this._requestFactory = dependencies.requestFactory;
    }

    async info(src): Promise<MangaInfo> {
        return this._requestFactory.request({uri: src})
            .then(x => this._parser.info(x));
    }

}
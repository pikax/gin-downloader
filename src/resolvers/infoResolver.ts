import {
    IMangaConfigDependency,
    IMangaInfoResolver,
    IMangaParserDependency,
    IMangaRequestFactoryDependency,
    Info,
    MangaInfo
} from "../interface";
import {IMangaConfig, IMangaParser, IMangaRequestFactory} from "../manga/interface";


type di = IMangaParserDependency & IMangaConfigDependency & IMangaRequestFactoryDependency;

export class InfoResolver implements IMangaInfoResolver {
    private _parser: IMangaParser;
    private _config: IMangaConfig;
    private _requestFactory: IMangaRequestFactory;

    constructor(dependencies: di) {
        this._parser = dependencies.parser;
        this._config = dependencies.config;
        this._requestFactory = dependencies.requestFactory;
    }

    async info(src): Promise<MangaInfo> {
        return this._requestFactory.request({uri: src})
            .then(this._parser.info);
    }

}
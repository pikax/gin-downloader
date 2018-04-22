import { IMangaConfigDependency, IMangaInfoResolver, IMangaParserDependency, IMangaRequestFactoryDependency, MangaInfo } from "../interface";
export declare type InfoResolverDependencies = IMangaParserDependency & IMangaConfigDependency & IMangaRequestFactoryDependency;
export declare class InfoResolver implements IMangaInfoResolver {
    private _parser;
    private _config;
    private _requestFactory;
    constructor(dependencies: InfoResolverDependencies);
    info(src: any): Promise<MangaInfo>;
}

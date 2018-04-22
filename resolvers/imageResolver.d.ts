import { IImageResolver, ImageCollection, IMangaConfigDependency, IMangaParserDependency, IMangaRequestFactoryDependency } from "../interface";
export declare type ImageResolverDependencies = IMangaParserDependency & IMangaConfigDependency & IMangaRequestFactoryDependency;
export declare class ImageResolver implements IImageResolver {
    private _parser;
    private _config;
    private _requestFactory;
    constructor(dependencies: ImageResolverDependencies);
    images(chapterSrc: any): Promise<ImageCollection>;
}

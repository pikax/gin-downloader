import {
    IImageResolver,
    ImageCollection, ImageSource,
    IMangaConfigDependency,
    IMangaParserDependency,
    IMangaRequestFactoryDependency
} from "../interface";
import {IMangaConfig, IMangaParser, IMangaRequestFactory} from "../manga/interface";
import {Lazy} from "../util/lazy";
import * as url from "url";


export type ImageResolverDependencies = IMangaParserDependency & IMangaConfigDependency & IMangaRequestFactoryDependency;


export class ImageResolver implements IImageResolver {
    private _parser: IMangaParser;
    private _config: IMangaConfig;
    private _requestFactory: IMangaRequestFactory;

    constructor(dependencies: ImageResolverDependencies) {
        this._parser = dependencies.parser;
        this._config = dependencies.config;
        this._requestFactory = dependencies.requestFactory;
    }

    async images(chapterSrc): Promise<ImageCollection> {
        let href = url.resolve(this._config.site, chapterSrc).toString();
        let result = await this._requestFactory.request({uri: href});

        const paths = this._parser.imagesPaths(result);
        paths.next(); // skip first, because we requested that already

        let src = this._parser.image(result);

        const promises = [
            new Lazy<Promise<ImageSource>>(() => Promise.resolve({
                name: url.parse(src).pathname.split("/").reverse()[0],
                src
            }))
        ];


        const promiseRequest = async (s): Promise<ImageSource> => {
            const h = url.resolve(href, s).toString();
            const result = await this._requestFactory.request({uri: h})
            const src = this._parser.image(result);

            return {
                name: url.parse(src).pathname.split("/").reverse()[0],
                src
            };
        };


        for (const it of paths) {
            promises.push(new Lazy<Promise<ImageSource>>(() => promiseRequest(it.src)));
        }


        return promises;
    }

}

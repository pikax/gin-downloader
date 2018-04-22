import * as url from "url";
import {MangaHereBuilder} from "./builder";
import {ILogger} from "../../util/logger";
import {
    IChapter,
    IManga, IMangaDependencies,
    IMangaRequestFactoryDependency, IMangaResolvers,
    IFilterSource, IGenreSite, IMangaConfig, IMangaParser,
    IMangaRequestFactory, IMangaVisitor,
    IMangaResolversFactoryDependency
} from "../../interface";
import {FilteredResults, MangaFilter, MangaSource} from "../../filter";
import {MangaObject} from "../../manga";
import {sanitizeFilter} from "../../util/filter";


const builder = new MangaHereBuilder();


export type MangaHereDependencies = IMangaRequestFactoryDependency & IMangaResolversFactoryDependency;

export class MangaHere {
    private _requestFactory: IMangaRequestFactory;
    private _logger: ILogger;
    private _genre: IGenreSite;
    private _config: IMangaConfig;
    private _filter: IFilterSource;
    private _parser: IMangaParser;
    private _visitor: IMangaVisitor;

    private _di: IMangaDependencies;
    private _resolvers: IMangaResolvers;


    constructor(dependencies: MangaHereDependencies) {
        const di = builder.build(dependencies);
        this._requestFactory = dependencies.requestFactory;
        this._logger = di.logger;
        this._genre = di.genre;
        this._config = di.config;
        this._filter = di.filter;
        this._parser = di.parser;
        this._visitor = di.visitor;


        this._resolvers = dependencies.resolverFactory.build(di);

    }


    async mangas() {
        const pages = Array.from(this._visitor.mangas()).slice(0, 5); // limit to 5 pages tops

        const pMangas = pages.map(x => this._requestFactory.request({uri: x.href}))
            .map(r => r.then(x => Array.from(this._parser.mangas(x))));

        const mangas = await Promise.all(pMangas);


        // TODO this should return MangaObject!
        return mangas.reduce((c, v) => {
            c.push(...v);
            return c;
        }, [])
            .map(this.buildManga)
            ;
    }


    async latest(): Promise<IChapter[]> {
        const pages = Array.from(this._visitor.latest()).slice(0, 5); // limit to 5 pages tops

        const pMangas = pages.map(x => this._requestFactory.request({uri: x.href}))
            .map(r => r.then(x => Array.from(this._parser.latest(x))));

        const mangas = await Promise.all(pMangas);

        // TODO this should return Chapter with MangaObject

        return mangas.reduce((c, v) => {
            c.push(...v);
            return c;
        }, []);
    }


    async filter(filter?: MangaFilter | string): Promise<FilteredResults> {
        const f = sanitizeFilter(filter);
        const processed = this._filter.process(f);

        const uri = url.resolve(this._config.mangasUrl, processed.src)

        const response = await this._requestFactory.request({uri, qs: processed.params});

        const mangas = Array.from(this._parser.mangas(response)).map(this.buildManga);
        const filterResult = this._parser.filterPage(response);


        return {
            ...filterResult,
            results: mangas,
        } as any;
    }


    private buildManga = ({src, ...manga}: MangaSource) => {
        return new MangaObject(this._resolvers, src, manga);
    }

}


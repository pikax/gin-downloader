import {MangaHereBuilder} from "./builder";
import {IFilterSource, IGenreSite, IMangaConfig, IMangaParser, IMangaRequestFactory, IMangaVisitor} from "../interface";
import {ILogger} from "../../util/logger";
import {
    IChapter,
    IManga, IMangaDependencies,
    IMangaRequestFactoryDependency, IMangaResolvers,
    IMangaResolversFactoryDependency
} from "../../interface";
import {MangaSource} from "../../filter";
import {MangaObject} from "../../manga";

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
        }, []);
    }


    async superMangas(): Promise<MangaObject[]> {
        const mangas = await this.mangas();

        return mangas.map(this.buildManga);
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


    private buildManga = ({src, ...manga}: MangaSource) => {
        return new MangaObject(this._resolvers, src, manga);
    }

}


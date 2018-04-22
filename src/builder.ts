import {MangaHere, MangaHereDependencies} from "./manga/mangahere";
import {MangaHereBuilder} from "./manga/mangahere/builder";
import {RequestRetryStrategy} from "./strategies/retry_strategy";
import {ConcurrentQueueRequestFactory} from "./factories/concurrentQueueRequest";
import {DefaultResolverFactory} from "./factories/resolvers";

const Queue = require("promise-queue");

export type GinBuilderDependencies = {};

export class GinBuilder {
    private _mangahere: MangaHere;
    private _mangaHereBuilder: MangaHereBuilder;
    private _requestFactory: ConcurrentQueueRequestFactory;
    private _requestStrategy: RequestRetryStrategy;
    private _resolverFactory: DefaultResolverFactory;


    get mangahere() {
        return this._mangahere || (this._mangahere = this.buildMangaHere());
    }


    constructor(dependencies: GinBuilderDependencies = {}) {
        this._requestStrategy = new RequestRetryStrategy();
        this._resolverFactory = new DefaultResolverFactory();
        this._requestFactory = new ConcurrentQueueRequestFactory(this._requestStrategy, new Queue(3));

        this._mangaHereBuilder = new MangaHereBuilder();
    }


    private buildMangaHere() {
        return new MangaHere({requestFactory: this._requestFactory, resolverFactory: this._resolverFactory});
    }


}


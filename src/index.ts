import {DefaultResolverFactory} from "./factories/resolvers";

export * from "./interface";

import {MangaHere} from "./manga/mangahere";
import {ConcurrentQueueRequestFactory} from "./factories/concurrentQueueRequest";
import {RequestRetryStrategy} from "./strategies/retry_strategy";
import {GinBuilder} from "./builder";
export {GinBuilder} from "./builder";
//
// const Queue = require("promise-queue");
//
//
// const requestStrategy = new RequestRetryStrategy();
// const resolverFactory = new DefaultResolverFactory();
// const requestFactory = new ConcurrentQueueRequestFactory(requestStrategy, new Queue(20));
//
//
// export const mangahere = new MangaHere({requestFactory, resolverFactory});




export const gin = new GinBuilder();


export * from "./enum";
export * from "./filter";

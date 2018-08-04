export * from "./interface";

import {GinBuilder} from "./builder";
export {GinBuilder, GinBuilderDependencies} from "./builder";

export * from "./enum";
export * from "./filter";


// export  * from "./parser";

export const gindownloader = new GinBuilder();



export {MangaHereConfig} from "./manga/mangahere/config";
export {RequestRetryStrategy} from "./strategies/retry_strategy";
export {MangaHereParser} from "./manga/mangahere/parser";
export {mangahereLogger} from "./manga/mangahere/logger";
export {MangaHereGenre} from "./manga/mangahere/genre";
export {MangaRequestResult} from "./util/mangaRequestResult";
export {RetryRequestFactory} from "./factories/retryRequest";

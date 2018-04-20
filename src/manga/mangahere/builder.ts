import {MangaHereFilter} from "./filter";
import {MangaHereGenre} from "./genre";
import {mangahereLogger} from "./logger";
import {MangaHereVisitor} from "./visitor";
import {MangaHereConfig} from "./config";
import {MangahereParser} from "./parser";
import {IMangaBuilder, IMangaDependencies, RequestFactoryMangaDependencies} from "../../interface";


export class MangaHereBuilder implements IMangaBuilder {
    build(di: RequestFactoryMangaDependencies): IMangaDependencies {
        const {requestFactory} = di;

        if (!requestFactory) {
            throw new Error("Please provide request factory");
        }

        const logger    = di.logger     || mangahereLogger;
        const genre     = di.genre      || new MangaHereGenre();
        const config    = di.config     || new MangaHereConfig();
        const filter    = di.filter     || new MangaHereFilter(genre);
        const parser    = di.parser     || new MangahereParser(logger, config, genre);
        const visitor   = di.visitor    || new MangaHereVisitor(requestFactory, config);

        return {
            requestFactory,
            logger,
            genre,
            config,
            filter,
            parser,
            visitor
        };
    }
}



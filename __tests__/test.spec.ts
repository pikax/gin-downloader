import 'babel-polyfill'

const Queue = require("promise-queue");

import {mangahereLogger} from "../src/manga/mangahere/logger";
import {MangaHereConfig} from "../src/manga/mangahere/config";
import {RequestRetryStrategy} from "../src/strategies/retry_strategy";
import {ConcurrentQueueRequestFactory, RetryRequestFactory, SuperMangaSite} from "../src/manga/interface";
import {MangaHereGenre} from "../src/manga/mangahere/genre";
import {MangahereParser} from "../src/manga/mangahere/parser";
import {MangaHereVisitor} from "../src/manga/mangahere/visitor";

describe("random", () => {



//     const config = new MangaHereConfig();
//     const strategy = new RequestRetryStrategy(10, 100);
// // const factory = new RetryRequestFactory(strategy);
//     const factory = new ConcurrentQueueRequestFactory(strategy, new Queue(3, 800));
//     const genre = new MangaHereGenre();
//     const parser = new MangahereParser(mangahereLogger, config, genre);
//     const visitor = new MangaHereVisitor(factory, config);
//     var site = new SuperMangaSite(config, factory, parser, visitor);



    it('should', async () => {
        // const src = "http://www.mangahere.cc/manga/hidan_no_aria/v04/c067/";
        //
        // for (const y of runGenerator(function *main(){ yield * site._imagesResolver(src)})) {
        //     console.log(await y.value);
        // }

    });


});


function runGenerator(g) {
    var it = g(), ret;

    // asynchronously iterate over generator
    (function iterate(val){
        ret = it.next( val );

        if (!ret.done) {
            // poor man's "is it a promise?" test
            if ("then" in ret.value) {
                // wait on the promise
                ret.value.then( iterate );
            }
            // immediate value: just send right back in
            else {
                // avoid synchronous recursion
                setTimeout( function(){
                    iterate( ret.value );
                }, 0 );
            }
        }
    })();
}
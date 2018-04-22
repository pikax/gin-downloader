import {MangaRequestResult, MangaSite} from "../../../src/manga/interface";

import {OfflineFileProvider} from "../../__mocks__/offlineFileProvider";
import {MangaHereParser} from "../../../src/manga/mangahere/parser";
import {loggerFactory} from "../../../src/util/logger";
import {MangaHereConfig} from "../../../src/manga/mangahere/config";
import {MangaHereGenre} from "../../../src/manga/mangahere/genre";


describe("mangahere parser", () => {

    // TODO MOCK DI
    const di = {
        logger: loggerFactory(MangaSite.MangaHere),
        config: new MangaHereConfig(),
        genre: new MangaHereGenre(),
    };
    const parser = new MangaHereParser(di);

    describe("offline", () => {
        const provider = new OfflineFileProvider("mangahere");

        it("should get latest", () => {
            const html = provider.getFile("latest.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);

            const latest = parser.latest(result);
            const array = Array.from(latest);

            expect(array).toMatchSnapshot();
        });

        it("should get mangas", () => {
            const html = provider.getFile("mangas.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);


            const mangas = parser.mangas(result);
            const array = Array.from(mangas);

            expect(array).toMatchSnapshot();
        });


        it("should parse Gintama info", () => {
            const html = provider.getFile("gintama.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);

            const gintama = parser.info(result);
            expect(gintama).toMatchSnapshot();
        });

        it("should parse Psyren info", () => {
            const html = provider.getFile("psyren.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);

            const gintama = parser.info(result);
            expect(gintama).toMatchSnapshot();
        });

        it("should parse Gintama chapters", () => {
            const html = provider.getFile("gintama.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);

            const chapters = parser.chapters(result);
            const array = Array.from(chapters);

            expect(array).toMatchSnapshot();
        });


        it("should throw licence error when getting imagePaths", () => {
            const html = provider.getFile("one_piece_chapter.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);

            const fn = () => parser.imagesPaths(result).next();
            expect(fn).toThrowErrorMatchingSnapshot();
        });


        it("should get image paths for gintama chapter", () => {
            const html = provider.getFile("gintama_chapter.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);

            const images = parser.imagesPaths(result);
            const array = Array.from(images);

            expect(array).toMatchSnapshot();
        });


        it("should get image from gintama chapter", () => {
            const html = provider.getFile("gintama_chapter.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);

            const image = parser.image(result);

            expect(image).toMatchSnapshot();
        });

        it("should not get image from one piece chapter", () => {
            const html = provider.getFile("one_piece_chapter.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);

            const fn = () => parser.image(result);
            expect(fn).toThrowErrorMatchingSnapshot();
        });


        it("should get the first page when search 'gin'", () => {
            const html = provider.getFile("gin_search.html");

            const uri = "www.mangahere.cc/search.php?direction=&name_method=cw&name=gin&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1";
            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult(uri, html);

            const pg = parser.filterPage(result);
            expect(pg).toMatchSnapshot();
        });

        it("should get the second page when search 'gin'", () => {
            const html = provider.getFile("gin_search_2.html");

            const uri = "www.mangahere.cc/search.php?direction=&name_method=cw&name=gin&author_method=cw&author=&artist_method=cw&artist=&genres[Action]=0&genres[Adventure]=0&genres[Comedy]=0&genres[Doujinshi]=0&genres[Drama]=0&genres[Ecchi]=0&genres[Fantasy]=0&genres[Gender%20Bender]=0&genres[Harem]=0&genres[Historical]=0&genres[Horror]=0&genres[Josei]=0&genres[Martial%20Arts]=0&genres[Mature]=0&genres[Mecha]=0&genres[Mystery]=0&genres[One%20Shot]=0&genres[Psychological]=0&genres[Romance]=0&genres[School%20Life]=0&genres[Sci-fi]=0&genres[Seinen]=0&genres[Shoujo]=0&genres[Shoujo%20Ai]=0&genres[Shounen]=0&genres[Shounen%20Ai]=0&genres[Slice%20of%20Life]=0&genres[Sports]=0&genres[Supernatural]=0&genres[Tragedy]=0&genres[Yaoi]=0&genres[Yuri]=0&released_method=eq&released=&is_completed=&advopts=1&page=2";
            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult(uri, html);

            const pg = parser.filterPage(result);
            expect(pg).toMatchSnapshot();
        });


        it("should get the last page when search 'gin'", () => {
            const html = provider.getFile("gin_search_last.html");

            const uri = "http://www.mangahere.cc/search.php?direction=&name_method=cw&name=gin&author_method=cw&author=&artist_method=cw&artist=&genres[Action]=0&genres[Adventure]=0&genres[Comedy]=0&genres[Doujinshi]=0&genres[Drama]=0&genres[Ecchi]=0&genres[Fantasy]=0&genres[Gender%20Bender]=0&genres[Harem]=0&genres[Historical]=0&genres[Horror]=0&genres[Josei]=0&genres[Martial%20Arts]=0&genres[Mature]=0&genres[Mecha]=0&genres[Mystery]=0&genres[One%20Shot]=0&genres[Psychological]=0&genres[Romance]=0&genres[School%20Life]=0&genres[Sci-fi]=0&genres[Seinen]=0&genres[Shoujo]=0&genres[Shoujo%20Ai]=0&genres[Shounen]=0&genres[Shounen%20Ai]=0&genres[Slice%20of%20Life]=0&genres[Sports]=0&genres[Supernatural]=0&genres[Tragedy]=0&genres[Yaoi]=0&genres[Yuri]=0&released_method=eq&released=&is_completed=&advopts=1&page=6";
            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult(uri, html);

            const pg = parser.filterPage(result);
            expect(pg).toMatchSnapshot();
        });

        it("should get the search without query", () => {
            const html = provider.getFile("search.html");

            const uri = "http://www.mangahere.cc/search.php";
            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult(uri, html);

            const pg = parser.filterPage(result);
            expect(pg).toMatchSnapshot();
        });

        it("should get one page when search 'gintama'", () => {
            const html = provider.getFile("gintama_search.html");

            const uri = "www.mangahere.cc/search.php?direction=&name_method=cw&name=gintama&author_method=cw&author=&artist_method=cw&artist=&genres%5BAction%5D=0&genres%5BAdventure%5D=0&genres%5BComedy%5D=0&genres%5BDoujinshi%5D=0&genres%5BDrama%5D=0&genres%5BEcchi%5D=0&genres%5BFantasy%5D=0&genres%5BGender+Bender%5D=0&genres%5BHarem%5D=0&genres%5BHistorical%5D=0&genres%5BHorror%5D=0&genres%5BJosei%5D=0&genres%5BMartial+Arts%5D=0&genres%5BMature%5D=0&genres%5BMecha%5D=0&genres%5BMystery%5D=0&genres%5BOne+Shot%5D=0&genres%5BPsychological%5D=0&genres%5BRomance%5D=0&genres%5BSchool+Life%5D=0&genres%5BSci-fi%5D=0&genres%5BSeinen%5D=0&genres%5BShoujo%5D=0&genres%5BShoujo+Ai%5D=0&genres%5BShounen%5D=0&genres%5BShounen+Ai%5D=0&genres%5BSlice+of+Life%5D=0&genres%5BSports%5D=0&genres%5BSupernatural%5D=0&genres%5BTragedy%5D=0&genres%5BYaoi%5D=0&genres%5BYuri%5D=0&released_method=eq&released=&is_completed=&advopts=1";
            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult(uri, html);

            const pg = parser.filterPage(result);
            expect(pg).toMatchSnapshot();
        });

    });

});


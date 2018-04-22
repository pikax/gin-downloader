import {MangaHereGenre} from "../../../src/manga/mangahere/genre";
import {Genre} from "../../../src/enum";
import {OfflineFileProvider} from "../../__mocks__/offlineFileProvider";
import {MangaRequestResult} from "../../../src/util/mangaRequestResult";


describe("mangahere genre", () => {
    const mangahereGenre = new MangaHereGenre();

    it("Should support genre", () => {
        const genre = Genre.Shounen;

        expect(mangahereGenre.isSupported(genre)).toBeTruthy();
    });


    it("Should not support genre", () => {
        const genre = Genre.SuperPower;

        expect(mangahereGenre.isSupported(genre)).toBeFalsy();
    });


    it("Should get Genre from site", () => {
        const genre = "One Shot";
        const expected = Genre.Oneshot;

        const result = mangahereGenre.fromSiteGenre(genre);


        expect(result).toBe(expected);
    });


    it("Should resolve ginGenre", () => {
        const genre = Genre.Oneshot;
        const expected = "One Shot";

        const result = mangahereGenre.toSiteGenre(genre);

        expect(result).toBe(expected);
    });


    describe("Genre validation", () => {
        const provider = new OfflineFileProvider("mangahere");
        let supported: string[];


        // resolve supported genres
        beforeAll(() => {
            const html = provider.getFile("advance_search.html");

            // TODO MOCK MangaRequestResult
            const result = new MangaRequestResult("test", html);

            supported = result.$("#genres > li > a").toArray().map((x) => x.lastChild.nodeValue);
        });

        it("Should check if the genres are valid", () => {
            for (const i of supported) {
                const g = mangahereGenre.fromSiteGenre(i);

                if (!g) {
                    // noinspection TsLint
                    console.log(`'${i}' is not supported`);
                }

                expect(g).toBeDefined();
                expect(mangahereGenre.isSupported(g)).toBeTruthy();
            }
        });

        it("Should check if any genre has been dropped", () => {
            const allGenres = Object.keys(Genre).map(x => Genre[x]);

            for (const g of allGenres) {
                const isSupported = mangahereGenre.isSupported(g);

                if (isSupported) {
                    expect(supported).toContain(mangahereGenre.toSiteGenre(g));
                } else {
                    expect(supported).not.toContain(g);
                }
            }
        });

        it("Validate supported", () => {
            const ginSupported = mangahereGenre.supported().map(x => mangahereGenre.toSiteGenre(x));

            expect(ginSupported).toEqual(supported);
        });

    });

});

import '../../__config__/init_mocks';

import {manga} from "./../../../src/sites/mangahere/index";
import results from './_results';
import {MangaFilter} from "../../../src/filter";
import {FilterCondition, FilterStatus, Genre, Type} from "../../../src/enum";


describe("MangaHere live", () => {

    it("should get all mangas", async () => {

        const mangas = await manga.mangas();

        expect(mangas).toBeDefined();

        expect(mangas.length).toBeGreaterThanOrEqual(19000);
    });

    it("should get latest chaps", async () => {
        let latest = await manga.latest();

        expect(latest).toBeDefined();
        expect(latest.length).toBeGreaterThanOrEqual(98)
    });

    it("should get info", async () => {
        let name = "Gintama";
        let info = await manga.info(name);
        expect(info).toBeDefined();

        expect(info.title).toBe(results.manga.title);
        expect(info.synopsis).toContain(results.manga.synopsis);
        expect(info.status).toBe(results.manga.status);


        expect(info.synonyms).toEqual(results.manga.synonyms);
        expect(info.authors).toEqual(results.manga.authors);
        expect(info.artists).toEqual(results.manga.artists);
        expect(info.genres).toEqual(results.manga.genres);
    });

    it("should resolve name to name", async () => {

        let mangas = await manga.mangas();

        for (let obj of mangas) {
            let expected = obj.src;
            let origName = obj.name;
            let finalUrl = manga.resolveMangaUrl(origName);

            expect(finalUrl).toContain(expected)
        }
    });


    it("should not find manga by name", async () => {
        expect.assertions(1);
        let name = "my stupid name";
        let chapter = 1;

        try {
            await manga.images(name, chapter);
        } catch (e) {
            expect(e.message).toContain("Chapter not found");
        }
    });


    it("should not find get chapters", async () => {
        expect.assertions(1);

        let name = "Gintamass132334";

        try {
            await manga.chapters(name);


        } catch (e) {
            expect(e.message).toContain("Chapter not found");
        }
    });

    it("should not find chapter", async () => {
        expect.assertions(1);
        let name = "Gintama";
        let chapter = -354564;

        try {
            await manga.images(name, chapter);
        } catch (e) {
            expect(e.message).toContain("Chapter not found");
        }
    });

    it("should not find images chapter", async () => {
        expect.assertions(1);

        let name = "Gintama";
        let chapter = -5151;

        try {
            let images = await manga.images(name, chapter);

        } catch (e) {
            expect(e.message).toContain("Chapter not found");
        }
    });


    it("should get chapters", async () => {
        let name = "Gintama";

        let chapters = await manga.chapters(name);

        expect(chapters).toBeDefined();
        expect(chapters.length).toBeGreaterThanOrEqual(results.chapter_count);
    });

    it("should get Gintama : chapter 41", async () => {
        let name = "Gintama";
        let chapter = 41;

        let images = await manga.images(name, chapter);
        expect(images).toBeDefined();

        expect(images.length).toBeGreaterThanOrEqual(17)
        let img = await images[0].value;
        expect(img.src).toContain("store/manga/551/041.0/compressed/M7_Gintama_ch041_00.jpg");
    });

    describe("filter", () => {
        beforeEach(function (done) {
            if (!process.env.mock) {
                setTimeout(done, 6000); // mangahere only allow to search per 5 seconds
            }
            else {
                done();
            }
        });

        it("should filter by name", async () => {
            let filter: MangaFilter = {
                name: "Gintama"
            };

            let mangas = await manga.filter(filter);
            expect(mangas).toBeDefined();

            expect(mangas.results.length).toBeGreaterThanOrEqual(14);


            const obj = {
                name: "Gintama",
                src: "//www.mangahere.cc/manga/gintama/"
            };
            const gintama = mangas.results.filter(x => x.name === obj.name);
            expect(gintama).toMatchObject([obj])


        });

        it("should filter by name endWith", async () => {


            let filter: MangaFilter = {
                search: {
                    name: {
                        name: "Gintama",
                        condition: FilterCondition.EndsWith
                    }
                }
            };

            let mangas = await manga.filter(filter);
            expect(mangas).toBeDefined();
            expect(mangas.results.length).toBeGreaterThanOrEqual(1);


            const obj = {
                name: "Gintama",
                src: "//www.mangahere.cc/manga/gintama/"
            };
            const gintama = mangas.results.filter(x => x.name === obj.name);
            expect(gintama).toMatchObject([obj])
        });

        it("should filter by name startsWith", async () => {
            let filter: MangaFilter = {
                search: {
                    name: {
                        name: "Gintama",
                        condition: FilterCondition.StartsWith
                    }
                }
            };

            let mangas = await manga.filter(filter);

            expect(mangas).toBeDefined();
            expect(mangas.results.length).toBeGreaterThanOrEqual(14);


            const obj = {
                name: "Gintama",
                src: "//www.mangahere.cc/manga/gintama/"
            };
            const gintama = mangas.results.filter(x => x.name === obj.name);
            expect(gintama).toMatchObject([obj])
        });

        it("should filter by in genre", async () => {

            let filter: MangaFilter = {
                search: {
                    genre: {
                        inGenres: [Genre.Action, Genre.Adventure, Genre.Comedy, Genre.Drama, Genre.Historical, Genre.SciFi, Genre.Shounen, Genre.Supernatural]
                    }
                }
            };

            let mangas = await manga.filter(filter);

            expect(mangas).toBeDefined();
            expect(mangas.results.length).toBeGreaterThanOrEqual(1);


            const obj = {
                name: "Gintama",
                src: "//www.mangahere.cc/manga/gintama/"
            };
            const gintama = mangas.results.filter(x => x.name === obj.name);
            expect(gintama).toMatchObject([obj])
        });

        it("should filter by out genre", async () => {

            let filter: MangaFilter = {

                search: {
                    name: {
                        name: "gin",
                        condition: FilterCondition.StartsWith
                    },
                    author: {
                        name: "Sora",
                    },
                    genre: {
                        outGenres: [Genre.Romance],
                    }
                }

            };
            let mangas = await manga.filter(filter);

            expect(mangas).toBeDefined();
            expect(mangas.results.length).toBeGreaterThanOrEqual(1);


            const obj = {
                name: "Gintama",
                src: "//www.mangahere.cc/manga/gintama/"
            };
            const gintama = mangas.results.filter(x => x.name === obj.name);
            expect(gintama).toMatchObject([obj])
        });

        it("should filter by Author", async () => {

            let filter: MangaFilter = {
                search: {
                    author: {
                        name: "Sorachi",
                    }
                }
            };

            let mangas = await manga.filter(filter);

            expect(mangas).toBeDefined();
            expect(mangas.results.length).toBeGreaterThanOrEqual(1);
            expect(mangas.results.length).toBeLessThanOrEqual(10);

            const obj = {
                name: "Gintama",
                src: "//www.mangahere.cc/manga/gintama/"
            };
            const gintama = mangas.results.filter(x => x.name === obj.name);
            expect(gintama).toMatchObject([obj])
        });

        it("should filter by Status", async () => {
            let filter: MangaFilter = {
                search: {
                    status: FilterStatus.Complete,
                    name: {
                        name: "kenichi"
                    }
                }
            };

            let mangas = await manga.filter(filter);

            expect(mangas).toBeDefined();
            expect(mangas.results.length).toBeGreaterThanOrEqual(1);

            const obj = {
                name: "Historys Strongest Disciple Kenichi",
                src: "//www.mangahere.cc/manga/historys_strongest_disciple_kenichi/"
            };
            const gintama = mangas.results.filter(x => x.name === obj.name);
            expect(gintama).toMatchObject([obj])
        });

        it("should filter by Type", async () => {

            let filter: MangaFilter = {
                search: {
                    name: {
                        name: "10"
                    },
                    type: Type.Manhwa
                }
            };

            let mangas = await manga.filter(filter);

            expect(mangas).toBeDefined();
            expect(mangas.results.length).toBeGreaterThanOrEqual(1);

            const obj = {
                name: "100 Ways to Kill A Seal",
                src: "//www.mangahere.cc/manga/100_ways_to_kill_a_seal/"
            };
            const gintama = mangas.results.filter(x => x.name === obj.name);
            expect(gintama).toMatchObject([obj])

        });
    });
});

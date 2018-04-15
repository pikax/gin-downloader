import {MangaHereFilter} from "../../../src/manga/mangahere/filter";
import {MangaHereGenre} from "../../../src/manga/mangahere/genre";


describe("mangahere filter", () => {
    const filter = new MangaHereFilter(new MangaHereGenre());


    describe("should get the correct result", () => {

        describe("Series type", () => {
            it("by Japanese Manga", () => {
                expect(1).toBeFalsy();
            });


            it("by Korean Manhwa", () => {
                expect(1).toBeFalsy();
            });


            it("by invalid (comics)", () => {
                expect(1).toBeFalsy();
            });

        });


        describe("Series name", () => {
            it("by contain", () => {
                expect(1).toBeFalsy();
            });

            it("by begin", () => {
                expect(1).toBeFalsy();
            });

            it("by end", () => {
                expect(1).toBeFalsy();
            });

            it("by unsupported", () => {
                expect(1).toBeFalsy();
            });

        });


        describe("Author name", () => {
            it("by contain", () => {
                expect(1).toBeFalsy();
            });

            it("by begin", () => {
                expect(1).toBeFalsy();
            });

            it("by end", () => {
                expect(1).toBeFalsy();
            });

            it("by unsupported", () => {
                expect(1).toBeFalsy();
            });

        });


        describe("Artist name", () => {
            it("by contain", () => {
                expect(1).toBeFalsy();
            });

            it("by begin", () => {
                expect(1).toBeFalsy();
            });

            it("by end", () => {
                expect(1).toBeFalsy();
            });

            it("by unsupported", () => {
                expect(1).toBeFalsy();
            });

        });


        describe("Genres", () => {
            it("by Action", () => {
                expect(1).toBeFalsy();
            });

            it("by Mature, One-shot", () => {
                expect(1).toBeFalsy();
            });

            it("by not Yaoi", () => {
                expect(1).toBeFalsy();
            });

            it("by Scifi, Mecha and Fantasy but not Harem, Ecchi, Comedy", () => {
                expect(1).toBeFalsy();
            });

            it("by not supported", () => {
                expect(1).toBeFalsy();
            });

        });


        describe("Year of release", () => {
            it("by on", () => {
                expect(1).toBeFalsy();
            });

            it("by before", () => {
                expect(1).toBeFalsy();
            });

            it("by after", () => {
                expect(1).toBeFalsy();
            });

            it("by 2000", () => {
                expect(1).toBeFalsy();
            });

            it("by invalid number", () => {
                expect(1).toBeFalsy();
            });
        });


        it("by type", () => {
            expect(1).toBeFalsy();
        });


    });

});

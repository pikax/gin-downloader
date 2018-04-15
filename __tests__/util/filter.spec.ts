import {sanitizeFilter} from "../../src/util/filter";
import {MangaFilter} from "../../src/filter";
import {FilterCondition, FilterStatus, Genre, GenreCondition, Type} from "../../src/enum";


describe("filter util", () => {


    it("should sanitize filter: string", () => {
        const filter = "gintama";

        const filterSupport = sanitizeFilter(filter);

        expect(filterSupport).toMatchSnapshot();
    });

    it("should sanitize filter: user search ", () => {

        const dirtyFilter: MangaFilter = {
            search: {
                genre: [Genre.Shounen, Genre.Action],
                artist: "Sorachi Hideaki",
                author: "Sorachi Hideaki",
                mature: true,
                name: "gintama",
                rating: 1,
                released: 2000,
                status: FilterStatus.Ongoing,
                type: Type.Manga
            }
        };


        const filter = sanitizeFilter(dirtyFilter);

        expect(filter).toMatchSnapshot();
    });

    it("should sanitize filter: full", () => {
        const dirtyFilter: MangaFilter = {
            search: {
                genre: {inGenres: [Genre.Shounen, Genre.Action], outGenres: [Genre.Comic], condition: GenreCondition.Or},
                artist: {name: "Sorachi Hideaki", condition: FilterCondition.Contains},
                author: {name: "Sorachi Hideaki", condition: FilterCondition.Contains},
                mature: true,
                name: {name: "gintama", condition: FilterCondition.Contains},
                rating: {from: 1, to: 4},
                released: {value: 2000, condition: FilterCondition.Equal},
                status: FilterStatus.Ongoing,
                type: Type.Manga
            }
        };

        const filter = sanitizeFilter(dirtyFilter);

        // they should be the same
        expect(filter).toEqual(dirtyFilter);
    });

    describe("invalid inputs", () => {

        describe("Genre", () => {
            it("by Genre", () => {
                const fn = () => sanitizeFilter(null);

                expect(fn).not.toThrow();
                expect(fn()).toMatchSnapshot();
            });

            it("by inGenre", () => {
                const condition: any = {
                    search: {
                        genre: {
                            inGenres: false
                        }
                    }
                };
                const fn = () => sanitizeFilter(condition);

                expect(fn).not.toThrow();
                expect(fn()).toMatchSnapshot();
            });

            it("by outGenre", () => {
                expect(1).toBeFalsy();
            });

        });

        it("by Artist", () => {
            expect(1).toBeFalsy();
        });

        it("by Author", () => {
            expect(1).toBeFalsy();
        });

        it("by Mature", () => {
            expect(1).toBeFalsy();
        });

        describe("Name", () => {
            it("by Name", () => {
                expect(1).toBeFalsy();
            });

            it("by Name condition", () => {
                expect(1).toBeFalsy();
            });
        });


        describe("Rating", () => {
            it("by Rating", () => {
                expect(1).toBeFalsy();
            });
            it("by Rating from", () => {
                expect(1).toBeFalsy();
            });
            it("by Rating to", () => {
                expect(1).toBeFalsy();
            });
        });


        it("by Released", () => {
            expect(1).toBeFalsy();
        });
        it("by Status", () => {
            expect(1).toBeFalsy();
        });
        it("by type", () => {
            expect(1).toBeFalsy();
        });

    });
});

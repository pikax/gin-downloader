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
                genre: {
                    inGenres: [Genre.Shounen, Genre.Action],
                    outGenres: [Genre.Comic],
                    condition: GenreCondition.Or
                },
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
                const condition: any = {
                    search: {
                        genre: {
                            outGenres: false
                        }
                    }
                };
                const fn = () => sanitizeFilter(condition);

                expect(fn).not.toThrow();
                expect(fn()).toMatchSnapshot();
            });

        });

        it("by Artist", () => {
            const condition: any = {
                search: {
                    artist: true
                }
            };
            const fn = () => sanitizeFilter(condition);

            expect(fn).not.toThrow();
            expect(fn()).toMatchSnapshot();
        });

        it("by Author", () => {
            const condition: any = {
                search: {
                    author: true
                }
            };
            const fn = () => sanitizeFilter(condition);

            expect(fn).not.toThrow();
            expect(fn()).toMatchSnapshot();
        });

        it("by Mature", () => {
            const condition: any = {
                search: {
                    mature: {value: true}
                }
            };
            const fn = () => sanitizeFilter(condition);

            expect(fn).not.toThrow();
            expect(fn()).toMatchSnapshot();
        });

        describe("Name", () => {
            it("by Name", () => {
                const condition: any = {
                    search: {
                        name: {name: {test: "ttt"}}
                    }
                };
                const fn = () => sanitizeFilter(condition);

                expect(fn).not.toThrow();
                expect(fn()).toMatchSnapshot();
            });

            it("by Name condition", () => {
                const condition: any = {
                    search: {
                        name: {condition: {test: "ttt"}}
                    }
                };
                const fn = () => sanitizeFilter(condition);

                expect(fn).not.toThrow();
                expect(fn()).toMatchSnapshot();
            });
        });


        describe("Rating", () => {
            it("by Rating", () => {
                const condition: any = {
                    search: {
                        rating: "NaN"
                    }
                };
                const fn = () => sanitizeFilter(condition);

                expect(fn).not.toThrow();
                expect(fn()).toMatchSnapshot();
            });
            it("by Rating from", () => {
                const condition: any = {
                    search: {
                        rating: {from: "NaN", to: 5}
                    }
                };
                const fn = () => sanitizeFilter(condition);

                expect(fn).not.toThrow();
                expect(fn()).toMatchSnapshot();
            });
            it("by Rating to", () => {
                const condition: any = {
                    search: {
                        rating: {from: 4, to: "NaN"}
                    }
                };
                const fn = () => sanitizeFilter(condition);

                expect(fn).not.toThrow();
                expect(fn()).toMatchSnapshot();
            });
        });


        it("by Released", () => {
            const condition: any = {
                search: {
                    released: "BackIn2000"
                }
            };
            const fn = () => sanitizeFilter(condition);

            expect(fn).not.toThrow();
            expect(fn()).toMatchSnapshot();
        });
        it("by Status", () => {
            const condition: any = {
                search: {
                    status: "NotCancelled2"
                }
            };
            const fn = () => sanitizeFilter(condition);

            expect(fn).not.toThrow();
            expect(fn()).toMatchSnapshot();
        });
        it("by type", () => {
            const condition: any = {
                search: {
                    type: "InvalidType"
                }
            };
            const fn = () => sanitizeFilter(condition);

            expect(fn).not.toThrow();
            expect(fn()).toMatchSnapshot();
        });

    });
});

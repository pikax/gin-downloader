import {sanitizeFilter} from "../../src/util/filter";
import {MangaFilter} from "../../src/filter";
import {FilterCondition, FilterStatus, Genre, Type} from "../../src/enum";


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
                genre: {inGenres: [Genre.Shounen, Genre.Action], outGenres: [Genre.Comic]},
                artist: {name: "Sorachi Hideaki"},
                author: {name: "Sorachi Hideaki"},
                mature: true,
                name: {name: "gintama", condition: FilterCondition.Contains},
                rating: {from: 1, to: 4},
                released: {value: 2000},
                status: FilterStatus.Ongoing,
                type: Type.Manga
            }
        };

        const filter = sanitizeFilter(dirtyFilter);

        // they should be the same
        expect(filter).toEqual(dirtyFilter);
    });
});

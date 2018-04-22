import {
    filter,
    GenreCollection,
    GenreFilter,
    MangaFilter,
    NameFilter,
    NameFilterCondition,
    RatingFilter, ReleaseFilter,
    Search
} from "../filter";
import FilterSupport = filter.FilterSupport;
import {FilterCondition, FilterStatus, Genre, GenreCondition, Type} from "../enum";

import sanitizedSearch = filter.Search;

export const sanitizeFilter = (condition: MangaFilter | string): FilterSupport => {
        const search: sanitizedSearch = {};
        const result: FilterSupport = {search};

        if (condition) {
            if (typeof condition === "string") {
                search.name = sanitizeName(condition);
            }
            else {
                // const ns: filter.Search = (condition && condition.search) || undefined as any;
                search.name = sanitizeName(condition.name);

                if (condition.search) {
                    const {genre, name, author, artist, released, rating, mature, type, status} = condition.search;

                    search.genre = sanitizeGenre(genre);

                    /*if (typeof name === "string") {
                        search.name = {
                            name: name as string
                        };
                    }


                    if (typeof author === "string") {
                        search.author = {
                            name: author as string
                        };
                    }
                    if (typeof artist === "string") {
                        search.artist = {
                            name: artist as string
                        };
                    }
*/

                    if (name) {
                        search.name = sanitizeName(name);
                    }

                    if (author) {
                        search.author = sanitizeName(author);
                    }

                    if (artist) {
                        search.artist = sanitizeName(artist);
                    }
                    /*
                                        if (typeof released === "number") {
                                            search.released = {
                                                value: released as number
                                            };
                                        }

                                        if (typeof rating === "number") {
                                            search.rating = {
                                                from: rating as number
                                            };
                                        }
                                        */
                    if (released) {
                        search.released = sanitizeReleased(released);
                    }

                    if (rating) {
                        search.rating = sanitizeRating(rating);
                    }

                    if (typeof mature === "boolean") {
                        search.mature = mature;
                    }

                    if (!!Type[type]) {
                        search.type = type;
                    }

                    if (!!FilterStatus[status]) {
                        search.status = status as FilterStatus;
                    }

                }
            }
        }

        return result;
    }
;


export const sanitizeGenre = (genre: GenreFilter | GenreCollection | any): GenreFilter => {
    const result: GenreFilter = {
        inGenres: [],
        outGenres: [],
        condition: GenreCondition.And
    };


    if (genre) {
        if (Array.isArray(genre)) { // is array of ['Comedy', 'Action'], as default sets as InGenre
            result.inGenres.push(...genre as GenreCollection);
        } else { // if genre is an object
            const g: GenreFilter = genre;

            if (!!g.inGenres) {
                if (Array.isArray(g.inGenres)) {
                    // add only valid gin genres
                    result.inGenres.push(...g.inGenres.filter(isValidGenre));
                } else {
                    const s = (g.inGenres as any).toString();
                    if (isValidGenre(s)) {
                        result.inGenres.push(s as Genre);
                    }
                }
            }

            if (!!g.outGenres) {
                if (Array.isArray(g.outGenres)) {
                    // add only valid gin genres
                    result.outGenres.push(...g.outGenres.filter(isValidGenre));
                } else {
                    const s = (g.outGenres as any).toString();
                    if (isValidGenre(s)) {
                        result.outGenres.push(s as Genre);
                    }
                }
            }

        }
        // if genre condition is invalid we set to be GenreCondition.And
        if (GenreCondition[(genre as GenreFilter).condition]) {
            result.condition = (genre as GenreFilter).condition;
        }
    }

    return result;
};

const isValidGenre = (s) => !!Genre[s];


const sanitizeName = (name: string | NameFilter): NameFilterCondition => {
    const result: NameFilterCondition = {
        name: "",
        condition: FilterCondition.Contains
    };

    if (typeof name === "string" || typeof  name === "object") {
        if (typeof name === "string") {
            result.name = name;
        } else {
            if (typeof name.name === "string") {
                result.name = name.name;
            }
            if (!!FilterCondition[name.condition]) {
                result.condition = name.condition;
            }
        }
    }

    return result;
};

const sanitizeRating = (rating: number | RatingFilter): RatingFilter => {
    const result: RatingFilter = {};

    if (rating) {
        if (typeof rating === "number") {
            result.from = rating;
        } else {
            if (typeof rating === "string" || typeof  rating === "object") {
                if (!!rating.from || !rating.to) {
                    const from = +rating.from;
                    const to = +rating.to;

                    if (!isNaN(from)) {
                        result.from = from;
                    }
                    if (!isNaN(to)) {
                        result.to = to;
                    }
                } else {
                    const n = +rating; // in case rating is a string convert to number
                    if (!isNaN(n)) {
                        result.from = n;
                    }
                }
            }
        }
    }

    return result;
};


const sanitizeReleased = (released: number | ReleaseFilter): ReleaseFilter => {
    const result: ReleaseFilter = {
        value: null,
        condition: FilterCondition.Equal
    };

    if (released) {
        if (typeof released === "number" || typeof released === "string") {
            const value = +released;
            if (!isNaN(value)) {
                result.value = value;
            }
        } else {
            if (typeof  released === "object") {
                if (released.value) {
                    const value = +released.value;

                    if (!isNaN(value)) {
                        result.value = value;
                    }
                }
                if (released.condition && FilterCondition[released.condition]) {
                    result.condition = released.condition;
                }
            }
        }
    }

    return result;
};


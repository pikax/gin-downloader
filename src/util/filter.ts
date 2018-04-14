import {filter, GenreCollection, GenreFilter, MangaFilter, NameFilterCondition, Search} from "../filter";
import FilterSupport = filter.FilterSupport;
import {GenreCondition} from "../enum";

export const sanitizeFilter = (condition: MangaFilter | string, def?: MangaFilter): FilterSupport => {
        let search: Search | filter.Search = (def && def.search) || {} as any;

        if (typeof condition === "string") {
            search.name = {
                name: condition as string
            };
            return {search} as FilterSupport;
        }
        else {
            const nc: NameFilterCondition = (condition && condition.name && {name: condition.name}) || undefined;
            const ns: filter.Search = (condition && condition.search) || undefined as any;

            search = {name: nc, ...search, ...ns};

            if (search) {
                let {genre, name, author, artist, released, rating} = search;

                if (Array.isArray(genre)) { // is array of ['Comedy', 'Action'], as default sets as InGenre
                    const inGenres = genre as GenreCollection;
                    search.genre = {
                        inGenres: inGenres,
                        condition: GenreCondition.And,
                    } as GenreFilter;
                }

                if (typeof name === "string") {
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
            }
        }
//
// if (filter.name) {
//   filter.name = sanitizeName(filter.name);
// }
// if (filter.search && filter.search.name) {
//   const name = filter.search.name;
//
//   if (typeof name !== "string") {
//     name.name = sanitizeName(name.name);
//   }
// }

        return {...(condition as FilterSupport), search};
    }
;

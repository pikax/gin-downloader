import {filter, MangaFilter} from "../../filter";
import {FilterCondition, FilterStatus, Genre, Type} from "../../enum";
import FilterSupport = filter.FilterSupport;
import {IMangaGenreDependency, IFilterSource, IFilterSourceResult, IGenreSite} from "../../interface";


export type MangaHereFilterDependencies = IMangaGenreDependency;

// TODO add logger and log
export class MangaHereFilter implements IFilterSource {
    private _genreSite: IGenreSite;

    constructor(dependencies: MangaHereFilterDependencies) {
        this._genreSite = dependencies.genre;
    }

    process(filter: FilterSupport): IFilterSourceResult {
        const {search, page} = filter;

        let filterType = null;

        let filterName = filter.search.name && filter.search.name.name || filter.search.name;
        let filterAuthor = null;
        let filterArtist = null;
        let filterReleased = null;
        let status = "";

        let methodName = "cw";
        let methodAuthor = "cw";
        let methodArtist = "cw";
        let methodReleased = "eq";

        let inGenres: Genre[] = [];
        let outGenres: Genre[] = [];


        if (search) {
            let {name, author, artist, released, type, genre} = search;

            filterType = resolveType(type) || filterType;

            if (name) {
                methodName = searchMethod(name.condition);
            }

            if (search.status) {
                status = resolveStatus(search.status);
            }

            if (author) {
                filterAuthor = author.name;
                methodAuthor = searchMethod(author.condition);
            }

            if (artist) {
                filterArtist = artist.name;
                methodArtist = searchMethod(artist.condition);
            }

            if (released) {
                filterReleased = released.value;
                methodReleased = yearSearchMethod(released.condition);
            }
            if (genre) {
                inGenres = genre.inGenres;
                outGenres = genre.outGenres;
            }
        }

        const type = `direction=${filterType || ""}`;
        const nameMethod = `name_method=${methodName}`; // NOTE name search set to contains
        const mangaName = `name=${filterName || ""}`;
        const authorMethod = `author_method=${methodAuthor}`;
        const author = `author=${filterAuthor || ""}`;
        const artistMethod = `artist_method=${methodArtist}`;
        const artist = `artist=${filterArtist || ""}`;
        const genreFilter = this._genreSite.supported().map(x => `genres%5B${this._genreSite.toSiteGenre(x).replace(/ /g, "+")}%5D=${inOutGenre(x, inGenres, outGenres)}`).join("&");
        const releaseMethod = `released_method=${methodReleased}`;
        const release = `released=${filterReleased || ""}`;
        const completed = `is_completed=${status}`;

        let advopts = "advopts=1"; // NOTE not sure what is this

        if (page) {
            advopts += `&page=${page}`;
        }

        return {
            src: "/search.php?" + [type, nameMethod,
                mangaName,

                authorMethod, author,
                artistMethod, artist,
                genreFilter,
                releaseMethod, release,
                completed, advopts].join("&")
        };
    }

}


function resolveType(type: Type) {
    switch (type) {
        case Type.Manga:
            return "rl";
        case Type.Manhwa:
            return "lr";
        default:
            return null;
    }
}

function resolveStatus(status: FilterStatus) {
    switch (status) {
        case FilterStatus.Ongoing:
            return "0";
        case FilterStatus.Complete:
            return "1";
        default:
            return "";
    }
}

function nameSearchMethod(condition: FilterCondition) {
    switch (condition) {
        case FilterCondition.StartsWith:
            return "bw";
        case FilterCondition.EndsWith:
            return "ew";
        case FilterCondition.Contains:
        default:
            return "cw";
    }
}


function yearSearchMethod(condition: FilterCondition) {
    switch (condition) {
        case FilterCondition.LessThan:
            return "lt";
        case FilterCondition.GreaterThan:
            return "gt";
        case FilterCondition.Equal:
        default:
            return "eq";
    }

}

function searchMethod(condition: FilterCondition) {
    // switch (condition) {
    //     case FilterCondition.Contains:
    //         return "cw";
    //     case FilterCondition.StartsWith:
    //         return "bw";
    //     case FilterCondition.EndsWith:
    //         return "ew";
    //     case FilterCondition.Equal:
    //         return "eq";
    //     case FilterCondition.LessThan:
    //         return "lt";
    //     case FilterCondition.GreaterThan:
    //         return "gt";
    //     default:
    //         return "cw";
    // }

    switch (condition) {
        case FilterCondition.StartsWith:
            return "bw";
        case FilterCondition.EndsWith:
            return "ew";
        case FilterCondition.Contains:
        default:
            return "cw";
    }
}

function inOutGenre(genre: Genre, inGenre: Genre[], outGenre: Genre[]): number {
    if (inGenre && inGenre.indexOf(genre) > -1) {
        return 1;
    }
    if (outGenre && outGenre.indexOf(genre) > -1) {
        return 2;
    }
    return 0;
}

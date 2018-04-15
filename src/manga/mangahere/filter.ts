import {IFilterSource, IFilterSourceResult, IGenreSite} from "../interface";
import {filter, MangaFilter} from "../../filter";
import {FilterCondition, FilterStatus, Genre, Type} from "../../enum";
import FilterSupport = filter.FilterSupport;
import {config} from "../mangahereOld/config";


export class MangaHereFilter implements IFilterSource {

    constructor(private _genreSite: IGenreSite) {

    }

    process(filter: FilterSupport): IFilterSourceResult {
        const {search, page} = filter;

        let filterType = null;

        let filterName = filter.search.name && filter.search.name.name || filter.search.name;
        let filterAuthor = null;
        let filterArtist = null;
        let filterReleased = null;
        let status = null;

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
                methodName = searchMethod(name.condition) || methodName;
            }

            if (search.status) {
                status = resolveStatus(search.status) || status;
            }

            if (author) {
                filterAuthor = author.name || filterAuthor;
                methodAuthor = searchMethod(author.condition) || methodAuthor;
            }

            if (artist) {
                filterArtist = artist.name || filterArtist;
                methodArtist = searchMethod(artist.condition) || methodArtist;
            }

            if (released) {
                filterReleased = released.value || filterReleased;
                methodReleased = searchMethod(released.condition) || methodReleased;
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
        const completed = `is_completed=${status || ""}`;

        let advopts = "advopts=1"; // NOTE not sure what is this

        if (page) {
            advopts += `&page=${page}`;
        }

        return {
            src: "/search.php?" + [nameMethod, mangaName,
                type,
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
            return 0;
        case FilterStatus.Complete:
            return 1;
        default:
            return null;
    }
}

function searchMethod(condition: FilterCondition) {
    switch (condition) {
        case FilterCondition.Contains:
            return "cw";
        case FilterCondition.StartsWith:
            return "bw";
        case FilterCondition.EndsWith:
            return "ew";
        case FilterCondition.Equal:
            return "eq";
        case FilterCondition.LessThan:
            return "lt";
        case FilterCondition.GreaterThan:
            return "gt";
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
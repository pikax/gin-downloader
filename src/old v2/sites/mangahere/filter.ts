import {resolve} from "url";

import {config} from "./config";
import {map} from "lodash";
import {FilterCondition, FilterStatus, Genre, Type} from "../../enum";
import {MangaFilter} from "../../../filter";
import {procFilter} from "../../util";

const Supported: { [id: string]: Genre } = {};
Supported[Genre.Action] = Genre.Action;
Supported[Genre.Adult] = Genre.Adult;
Supported[Genre.Adventure] = Genre.Adventure;
Supported[Genre.Comedy] = Genre.Comedy;
Supported[Genre.Doujinshi] = Genre.Doujinshi;
Supported[Genre.Drama] = Genre.Drama;
Supported[Genre.Ecchi] = Genre.Ecchi;
Supported[Genre.Fantasy] = Genre.Fantasy;
Supported[Genre.GenderBender] = Genre.GenderBender;
Supported[Genre.Harem] = Genre.Harem;
Supported[Genre.Historical] = Genre.Historical;
Supported[Genre.Horror] = Genre.Horror;
Supported[Genre.Josei] = Genre.Josei;
Supported[Genre.Lolicon] = Genre.Lolicon;
Supported[Genre.MartialArts] = Genre.MartialArts;
Supported[Genre.Mature] = Genre.Mature;
Supported[Genre.Mecha] = Genre.Mecha;
Supported[Genre.Mystery] = Genre.Mystery;
Supported[Genre.Oneshot] = Genre.Oneshot;
Supported[Genre.Psychological] = Genre.Psychological;
Supported[Genre.Romance] = Genre.Romance;
Supported[Genre.SchoolLife] = Genre.SchoolLife;
Supported[Genre.SciFi] = Genre.SciFi;
Supported[Genre.Seinen] = Genre.Seinen;
Supported[Genre.Shotacon] = Genre.Shotacon;
Supported[Genre.Shoujo] = Genre.Shoujo;
Supported[Genre.ShoujoAi] = Genre.ShoujoAi;
Supported[Genre.Shounen] = Genre.Shounen;
Supported[Genre.ShounenAi] = Genre.ShounenAi;
Supported[Genre.SliceOfLife] = Genre.SliceOfLife;
Supported[Genre.Smut] = Genre.Smut;
Supported[Genre.Sports] = Genre.Sports;
Supported[Genre.Supernatural] = Genre.Supernatural;
Supported[Genre.Tragedy] = Genre.Tragedy;
Supported[Genre.Yaoi] = Genre.Yaoi;
Supported[Genre.Yuri] = Genre.Yuri;


const correctName: { [id: string]: string } = {};
correctName[Genre.Adult] = Genre.Adult;
correctName[Genre.Action] = Genre.Action;
correctName[Genre.Adventure] = Genre.Adventure;
correctName[Genre.Comedy] = Genre.Comedy;
correctName[Genre.Doujinshi] = Genre.Doujinshi;
correctName[Genre.Drama] = Genre.Drama;
correctName[Genre.Ecchi] = Genre.Ecchi;
correctName[Genre.Fantasy] = Genre.Fantasy;
correctName[Genre.GenderBender] = "Gender Bender";
correctName[Genre.Harem] = Genre.Harem;
correctName[Genre.Historical] = Genre.Historical;
correctName[Genre.Horror] = Genre.Horror;
correctName[Genre.Josei] = Genre.Josei;
correctName[Genre.Lolicon] = Genre.Lolicon;
correctName[Genre.MartialArts] = "Martial Arts";
correctName[Genre.Mature] = Genre.Mature;
correctName[Genre.Mecha] = Genre.Mecha;
correctName[Genre.Mystery] = Genre.Mystery;
correctName[Genre.Oneshot] = "One Shot";
correctName[Genre.Psychological] = Genre.Psychological;
correctName[Genre.Romance] = Genre.Romance;
correctName[Genre.SchoolLife] = Genre.SchoolLife;
correctName[Genre.SciFi] = "Sci-fi";
correctName[Genre.Seinen] = Genre.Seinen;
correctName[Genre.Shotacon] = Genre.Shotacon;
correctName[Genre.Shoujo] = Genre.Shoujo;
correctName[Genre.ShoujoAi] = "Shoujo Ai";
correctName[Genre.Shounen] = Genre.Shounen;
correctName[Genre.ShounenAi] = "Shounen Ai";
correctName[Genre.SliceOfLife] = "Slice of Life";
correctName[Genre.Smut] = Genre.Smut;
correctName[Genre.Sports] = Genre.Sports;
correctName[Genre.Supernatural] = Genre.Supernatural;
correctName[Genre.Tragedy] = Genre.Tragedy;
correctName[Genre.Yaoi] = Genre.Yaoi;
correctName[Genre.Yuri] = Genre.Yuri;


export const processFilter = (mangafilter: MangaFilter): { src: string, params?: any } => {
    let filter = procFilter(mangafilter);
    let {search, page} = filter;

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
        let {name, author, artist, rating, released, type, genre} = search;

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
    const genreFilter = map(Supported, x => `genres%5B${correctName[x].replace(/ /g, "+")}%5D=${inOutGenre(x, inGenres, outGenres)}`).join("&");
    const releaseMethod = `released_method=${methodReleased}`;
    const release = `released=${filterReleased || ""}`;
    const completed = `is_completed=${status || ""}`;


    let advopts = "advopts=1"; // NOTE not sure what is this

    if (page) {
        advopts += `&page=${page}`;
    }


    return {
        src: resolve(config.site, "/search.php?" + [nameMethod, mangaName,
            type,
            authorMethod, author,
            artistMethod, artist,
            genreFilter,
            releaseMethod, release,
            completed, advopts].join("&"))
    };
};


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



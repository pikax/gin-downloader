"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rodriguesc on 30/03/2017.
 */
var declarations_1 = require("../../declarations");
var config_1 = require("./config");
var Supported = [];
Supported[declarations_1.Genre.Action] = declarations_1.Genre.Action;
Supported[declarations_1.Genre.Adventure] = declarations_1.Genre.Adventure;
Supported[declarations_1.Genre.Comedy] = declarations_1.Genre.Comedy;
Supported[declarations_1.Genre.Mystery] = declarations_1.Genre.Mystery;
Supported[declarations_1.Genre.Psychological] = declarations_1.Genre.Psychological;
Supported[declarations_1.Genre.Romance] = declarations_1.Genre.Romance;
Supported[declarations_1.Genre.SchoolLife] = declarations_1.Genre.SchoolLife;
Supported[declarations_1.Genre.SciFi] = declarations_1.Genre.SciFi;
Supported[declarations_1.Genre.Doujinshi] = declarations_1.Genre.Doujinshi;
Supported[declarations_1.Genre.Drama] = declarations_1.Genre.Drama;
Supported[declarations_1.Genre.Ecchi] = declarations_1.Genre.Ecchi;
Supported[declarations_1.Genre.Fantasy] = declarations_1.Genre.Fantasy;
Supported[declarations_1.Genre.GenderBender] = declarations_1.Genre.GenderBender;
Supported[declarations_1.Genre.ShoujoAi] = declarations_1.Genre.ShoujoAi;
Supported[declarations_1.Genre.Harem] = declarations_1.Genre.Harem;
Supported[declarations_1.Genre.ShounenAi] = declarations_1.Genre.ShounenAi;
Supported[declarations_1.Genre.Historical] = declarations_1.Genre.Historical;
Supported[declarations_1.Genre.SliceOfLife] = declarations_1.Genre.SliceOfLife;
Supported[declarations_1.Genre.Horror] = declarations_1.Genre.Horror;
Supported[declarations_1.Genre.Smut] = declarations_1.Genre.Smut;
Supported[declarations_1.Genre.Sports] = declarations_1.Genre.Sports;
Supported[declarations_1.Genre.Supernatural] = declarations_1.Genre.Supernatural;
Supported[declarations_1.Genre.MartialArts] = declarations_1.Genre.MartialArts;
Supported[declarations_1.Genre.Tragedy] = declarations_1.Genre.Tragedy;
Supported[declarations_1.Genre.Yaoi] = declarations_1.Genre.Yaoi;
Supported[declarations_1.Genre.Mecha] = declarations_1.Genre.Mecha;
Supported[declarations_1.Genre.Yuri] = declarations_1.Genre.Yuri;
Supported[declarations_1.Genre.Seinen] = declarations_1.Genre.Seinen;
Supported[declarations_1.Genre.Shounen] = declarations_1.Genre.Shounen;
Supported[declarations_1.Genre.Josei] = declarations_1.Genre.Josei;
Supported[declarations_1.Genre.Shoujo] = declarations_1.Genre.Shoujo;
Supported[declarations_1.Genre.Webtoon] = declarations_1.Genre.Webtoon;
Supported[declarations_1.Genre.Music] = declarations_1.Genre.Music;
Supported[declarations_1.Genre.Oneshot] = declarations_1.Genre.Oneshot;
Supported[declarations_1.Genre.AwardWinning] = declarations_1.Genre.AwardWinning;
Supported[declarations_1.Genre.FourKoma] = declarations_1.Genre.FourKoma;
Supported[declarations_1.Genre.Cooking] = declarations_1.Genre.Cooking;
Supported[declarations_1.Genre.Medical] = declarations_1.Genre.Medical;
Supported[declarations_1.Genre.NoChapters] = declarations_1.Genre.NoChapters;
var ordered = [
    declarations_1.Genre.Action,
    declarations_1.Genre.Adventure,
    declarations_1.Genre.Comedy,
    declarations_1.Genre.Mystery,
    declarations_1.Genre.Psychological,
    declarations_1.Genre.Romance,
    declarations_1.Genre.SchoolLife,
    declarations_1.Genre.SciFi,
    declarations_1.Genre.Doujinshi,
    declarations_1.Genre.Drama,
    declarations_1.Genre.Ecchi,
    declarations_1.Genre.Fantasy,
    declarations_1.Genre.GenderBender,
    declarations_1.Genre.ShoujoAi,
    declarations_1.Genre.Harem,
    declarations_1.Genre.ShounenAi,
    declarations_1.Genre.Historical,
    declarations_1.Genre.SliceOfLife,
    declarations_1.Genre.Horror,
    declarations_1.Genre.Smut,
    declarations_1.Genre.Sports,
    declarations_1.Genre.Supernatural,
    declarations_1.Genre.MartialArts,
    declarations_1.Genre.Tragedy,
    declarations_1.Genre.Yaoi,
    declarations_1.Genre.Mecha,
    declarations_1.Genre.Yuri,
    declarations_1.Genre.Seinen,
    declarations_1.Genre.Shounen,
    declarations_1.Genre.Josei,
    declarations_1.Genre.Shoujo,
    declarations_1.Genre.Webtoon,
    declarations_1.Genre.Music,
    declarations_1.Genre.Oneshot,
    declarations_1.Genre.AwardWinning,
    declarations_1.Genre.FourKoma,
    declarations_1.Genre.Cooking,
    declarations_1.Genre.Medical,
    declarations_1.Genre.NoChapters,
];
var dic = {};
dic[declarations_1.Genre.Action] = "1";
dic[declarations_1.Genre.Adventure] = "2";
dic[declarations_1.Genre.Comedy] = "3";
dic[declarations_1.Genre.Mystery] = "4";
dic[declarations_1.Genre.Psychological] = "5";
dic[declarations_1.Genre.Romance] = "6";
dic[declarations_1.Genre.SchoolLife] = "7";
dic[declarations_1.Genre.SciFi] = "8";
dic[declarations_1.Genre.Doujinshi] = "9";
dic[declarations_1.Genre.Drama] = "10";
dic[declarations_1.Genre.Ecchi] = "12";
dic[declarations_1.Genre.Fantasy] = "13";
dic[declarations_1.Genre.GenderBender] = "15";
dic[declarations_1.Genre.ShoujoAi] = "16";
dic[declarations_1.Genre.Harem] = "17";
dic[declarations_1.Genre.ShounenAi] = "19";
dic[declarations_1.Genre.Historical] = "20";
dic[declarations_1.Genre.SliceOfLife] = "21";
dic[declarations_1.Genre.Horror] = "22";
dic[declarations_1.Genre.Smut] = "23";
dic[declarations_1.Genre.Sports] = "25";
dic[declarations_1.Genre.Supernatural] = "26";
dic[declarations_1.Genre.MartialArts] = "27";
dic[declarations_1.Genre.Tragedy] = "28";
dic[declarations_1.Genre.Yaoi] = "29";
dic[declarations_1.Genre.Mecha] = "30";
dic[declarations_1.Genre.Yuri] = "31";
dic[declarations_1.Genre.Seinen] = "32";
dic[declarations_1.Genre.Shounen] = "33";
dic[declarations_1.Genre.Josei] = "34";
dic[declarations_1.Genre.Shoujo] = "35";
dic[declarations_1.Genre.Webtoon] = "36";
dic[declarations_1.Genre.Music] = "37";
dic[declarations_1.Genre.Oneshot] = "38";
dic[declarations_1.Genre.AwardWinning] = "39";
dic[declarations_1.Genre.FourKoma] = "40";
dic[declarations_1.Genre.Cooking] = "41";
dic[declarations_1.Genre.Medical] = "42";
dic[declarations_1.Genre.NoChapters] = "44";
exports.processFilter = function (filter) {
    filter = filter || {};
    var genres = filter.genres, outGenres = filter.outGenres, search = filter.search;
    var fauthor = null;
    var fstatus = null;
    var ftype = null;
    var fname = filter.name;
    var nameCondition = null;
    var authorCondition = null;
    var genreCondition = null;
    if (search) {
        var nameFilter = search.name;
        if (nameFilter) {
            fname = nameFilter.name;
            nameCondition = resolveCondition(nameFilter.condition); // not support equals just Starts|Ends|Contains
        }
        var authorFilter = search.author || search.artist;
        if (authorFilter) {
            fauthor = authorFilter.name;
            authorCondition = resolveCondition(authorFilter.condition);
        }
        var statusFilter = search.status;
        if (statusFilter) {
            fstatus = resolveStatus(statusFilter);
        }
        var genreFilter_1 = search.genre;
        if (genreFilter_1) {
            genres = genreFilter_1.inGenres;
            outGenres = genreFilter_1.outGenres;
            genreCondition = resolveGenreCondition(genreFilter_1.condition);
        }
        var type_1 = search.type;
        if (type_1) {
            ftype = resolveType(type_1);
        }
    }
    var mangaName = "name=" + (fname || "");
    var nameCond = nameCondition && "name_cond=" + nameCondition;
    var authorArtist = "artist_name=" + (fauthor || "");
    var authorCond = authorCondition && "artist_name_cond=" + authorCondition;
    var genreFilter = "genres=" + ordered.map(function (x) { return inOutGenre(x, genres, outGenres); }).filter(function (x) { return x !== ""; }).join(";");
    var genreCon = (genreCondition && "genre_cond=" + genreCondition) || "genre_cond=and"; // todo change me
    var status = "status=" + (fstatus || "");
    var type = "type=" + ftype;
    var page = "p=" + (filter.page || 1);
    // TODO implement me
    var rating_high = 0; // 0~5
    var rating_low = 0; // 0~5
    var mature = false; // n == false
    return { src: config_1.config.mangas_url + "?" + [mangaName, nameCond, authorArtist, authorCond, genreFilter, genreCon, status, type, page].join("&")
    };
};
function resolveType(type) {
    switch (type) {
        case declarations_1.FilterMangaType.Manga:
            return "jp";
        case declarations_1.FilterMangaType.Manhwa:
            return "kr";
        case declarations_1.FilterMangaType.Manhua:
            return "cn";
        case declarations_1.FilterMangaType.Artbook:
            return "ar";
        case declarations_1.FilterMangaType.Other:
            return "ot";
        default:
            throw new Error("Unknown type");
    }
}
function resolveCondition(condition) {
    switch (condition) {
        case declarations_1.FilterCondition.Contains:
            return "c";
        case declarations_1.FilterCondition.EndsWith:
            return "e";
        case declarations_1.FilterCondition.StartsWith:
            return "s";
        case declarations_1.FilterCondition.Equal:
            return "is";
        default:
            return "c";
    }
}
function resolveGenreCondition(condition) {
    switch (condition) {
        case declarations_1.GenreCondition.And:
            return "and";
        case declarations_1.GenreCondition.Or:
            return "or";
        default:
            return "and";
    }
}
function resolveStatus(status) {
    switch (status) {
        case declarations_1.FilterStatus.Ongoing:
            return "i";
        case declarations_1.FilterStatus.Complete:
            return "c";
        default:
            return null;
    }
}
function inOutGenre(genre, inGenre, outGenre) {
    if (inGenre && inGenre.indexOf(genre) > -1) {
        return "i" + dic[genre];
    }
    if (outGenre && outGenre.indexOf(genre) > -1) {
        return "e" + dic[genre];
    }
    return "";
}
//# sourceMappingURL=filter.js.map
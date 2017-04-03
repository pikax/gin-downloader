"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rodriguesc on 30/03/2017.
 */
var declarations_1 = require("../../declarations");
var config_1 = require("./config");
var url_1 = require("url");
var Supported = [];
Supported[declarations_1.Genre.FourKoma] = declarations_1.Genre.FourKoma;
Supported[declarations_1.Genre.Action] = declarations_1.Genre.Action;
Supported[declarations_1.Genre.Adult] = declarations_1.Genre.Adult;
Supported[declarations_1.Genre.Adventure] = declarations_1.Genre.Adventure;
Supported[declarations_1.Genre.Comedy] = declarations_1.Genre.Comedy;
Supported[declarations_1.Genre.Comic] = declarations_1.Genre.Comic;
Supported[declarations_1.Genre.Cooking] = declarations_1.Genre.Cooking;
Supported[declarations_1.Genre.Doujinshi] = declarations_1.Genre.Doujinshi;
Supported[declarations_1.Genre.Drama] = declarations_1.Genre.Drama;
Supported[declarations_1.Genre.Ecchi] = declarations_1.Genre.Ecchi;
Supported[declarations_1.Genre.Fantasy] = declarations_1.Genre.Fantasy;
Supported[declarations_1.Genre.GenderBender] = declarations_1.Genre.GenderBender;
Supported[declarations_1.Genre.Harem] = declarations_1.Genre.Harem;
Supported[declarations_1.Genre.Historical] = declarations_1.Genre.Historical;
Supported[declarations_1.Genre.Horror] = declarations_1.Genre.Horror;
Supported[declarations_1.Genre.Josei] = declarations_1.Genre.Josei;
Supported[declarations_1.Genre.Lolicon] = declarations_1.Genre.Lolicon;
Supported[declarations_1.Genre.Manga] = declarations_1.Genre.Manga;
Supported[declarations_1.Genre.Manhua] = declarations_1.Genre.Manhua;
Supported[declarations_1.Genre.Manhwa] = declarations_1.Genre.Manhwa;
Supported[declarations_1.Genre.MartialArts] = declarations_1.Genre.MartialArts;
Supported[declarations_1.Genre.Mature] = declarations_1.Genre.Mature;
Supported[declarations_1.Genre.Mecha] = declarations_1.Genre.Mecha;
Supported[declarations_1.Genre.Medical] = declarations_1.Genre.Medical;
Supported[declarations_1.Genre.Music] = declarations_1.Genre.Music;
Supported[declarations_1.Genre.Mystery] = declarations_1.Genre.Mystery;
Supported[declarations_1.Genre.Oneshot] = declarations_1.Genre.Oneshot;
Supported[declarations_1.Genre.Psychological] = declarations_1.Genre.Psychological;
Supported[declarations_1.Genre.Romance] = declarations_1.Genre.Romance;
Supported[declarations_1.Genre.SchoolLife] = declarations_1.Genre.SchoolLife;
Supported[declarations_1.Genre.SciFi] = declarations_1.Genre.SciFi;
Supported[declarations_1.Genre.Seinen] = declarations_1.Genre.Seinen;
Supported[declarations_1.Genre.Shotacon] = declarations_1.Genre.Shotacon;
Supported[declarations_1.Genre.Shoujo] = declarations_1.Genre.Shoujo;
Supported[declarations_1.Genre.ShoujoAi] = declarations_1.Genre.ShoujoAi;
Supported[declarations_1.Genre.Shounen] = declarations_1.Genre.Shounen;
Supported[declarations_1.Genre.ShounenAi] = declarations_1.Genre.ShounenAi;
Supported[declarations_1.Genre.SliceOfLife] = declarations_1.Genre.SliceOfLife;
Supported[declarations_1.Genre.Smut] = declarations_1.Genre.Smut;
Supported[declarations_1.Genre.Sports] = declarations_1.Genre.Sports;
Supported[declarations_1.Genre.Supernatural] = declarations_1.Genre.Supernatural;
Supported[declarations_1.Genre.Tragedy] = declarations_1.Genre.Tragedy;
Supported[declarations_1.Genre.Webtoon] = declarations_1.Genre.Webtoon;
Supported[declarations_1.Genre.Yaoi] = declarations_1.Genre.Yaoi;
Supported[declarations_1.Genre.Yuri] = declarations_1.Genre.Yuri;
var ordered = [
    declarations_1.Genre.FourKoma,
    declarations_1.Genre.Action,
    declarations_1.Genre.Adult,
    declarations_1.Genre.Adventure,
    declarations_1.Genre.Comedy,
    declarations_1.Genre.Comic,
    declarations_1.Genre.Cooking,
    declarations_1.Genre.Doujinshi,
    declarations_1.Genre.Drama,
    declarations_1.Genre.Ecchi,
    declarations_1.Genre.Fantasy,
    declarations_1.Genre.GenderBender,
    declarations_1.Genre.Harem,
    declarations_1.Genre.Historical,
    declarations_1.Genre.Horror,
    declarations_1.Genre.Josei,
    declarations_1.Genre.Lolicon,
    declarations_1.Genre.Manga,
    declarations_1.Genre.Manhua,
    declarations_1.Genre.Manhwa,
    declarations_1.Genre.MartialArts,
    declarations_1.Genre.Mature,
    declarations_1.Genre.Mecha,
    declarations_1.Genre.Medical,
    declarations_1.Genre.Music,
    declarations_1.Genre.Mystery,
    declarations_1.Genre.Oneshot,
    declarations_1.Genre.Psychological,
    declarations_1.Genre.Romance,
    declarations_1.Genre.SchoolLife,
    declarations_1.Genre.SciFi,
    declarations_1.Genre.Seinen,
    declarations_1.Genre.Shotacon,
    declarations_1.Genre.Shoujo,
    declarations_1.Genre.Shoujo,
    declarations_1.Genre.Shounen,
    declarations_1.Genre.Shounen,
    declarations_1.Genre.SliceOfLife,
    declarations_1.Genre.Smut,
    declarations_1.Genre.Sports,
    declarations_1.Genre.Supernatural,
    declarations_1.Genre.Tragedy,
    declarations_1.Genre.Webtoon,
    declarations_1.Genre.Yaoi,
    declarations_1.Genre.Yuri,
];
exports.processFilter = function (filter) {
    filter = filter || {};
    var genres = filter.genres, outGenres = filter.outGenres;
    var mangaName = "mangaName=" + (filter.name || "");
    var authorArtist = "authorArtist=";
    var genreFilter = ordered.map(function (x) { return inOutGenre(x, genres, outGenres); }).map(function (x) { return "genres=" + x; }).join("&");
    var status = "status=";
    return { src: url_1.resolve(config_1.config.site, "/AdvanceSearch"),
        params: [mangaName, authorArtist, genreFilter, status].join("&")
    };
};
function inOutGenre(genre, inGenre, outGenre) {
    if (inGenre && inGenre.indexOf(genre) > -1) {
        return 1;
    }
    if (outGenre && outGenre.indexOf(genre) > -1) {
        return 2;
    }
    return 0;
}
//# sourceMappingURL=filter.js.map
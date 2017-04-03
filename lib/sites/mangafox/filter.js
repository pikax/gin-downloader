"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rodriguesc on 30/03/2017.
 */
var declarations_1 = require("../../declarations");
var config_1 = require("./config");
var url_1 = require("url");
var Supported = [];
Supported[declarations_1.Genre.Action] = declarations_1.Genre.Action;
Supported[declarations_1.Genre.Adult] = declarations_1.Genre.Adult;
Supported[declarations_1.Genre.Adventure] = declarations_1.Genre.Adventure;
Supported[declarations_1.Genre.Comedy] = declarations_1.Genre.Comedy;
Supported[declarations_1.Genre.Doujinshi] = declarations_1.Genre.Doujinshi;
Supported[declarations_1.Genre.Drama] = declarations_1.Genre.Drama;
Supported[declarations_1.Genre.Ecchi] = declarations_1.Genre.Ecchi;
Supported[declarations_1.Genre.Fantasy] = declarations_1.Genre.Fantasy;
Supported[declarations_1.Genre.GenderBender] = declarations_1.Genre.GenderBender;
Supported[declarations_1.Genre.Harem] = declarations_1.Genre.Harem;
Supported[declarations_1.Genre.Historical] = declarations_1.Genre.Historical;
Supported[declarations_1.Genre.Horror] = declarations_1.Genre.Horror;
Supported[declarations_1.Genre.Josei] = declarations_1.Genre.Josei;
Supported[declarations_1.Genre.MartialArts] = declarations_1.Genre.MartialArts;
Supported[declarations_1.Genre.Mature] = declarations_1.Genre.Mature;
Supported[declarations_1.Genre.Mecha] = declarations_1.Genre.Mecha;
Supported[declarations_1.Genre.Mystery] = declarations_1.Genre.Mystery;
Supported[declarations_1.Genre.Oneshot] = declarations_1.Genre.Oneshot;
Supported[declarations_1.Genre.Psychological] = declarations_1.Genre.Psychological;
Supported[declarations_1.Genre.Romance] = declarations_1.Genre.Romance;
Supported[declarations_1.Genre.SchoolLife] = declarations_1.Genre.SchoolLife;
Supported[declarations_1.Genre.SciFi] = declarations_1.Genre.SciFi;
Supported[declarations_1.Genre.Seinen] = declarations_1.Genre.Seinen;
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
var correctName = [];
correctName[declarations_1.Genre.Action] = declarations_1.Genre.Action;
correctName[declarations_1.Genre.Adult] = declarations_1.Genre.Adult;
correctName[declarations_1.Genre.Adventure] = declarations_1.Genre.Adventure;
correctName[declarations_1.Genre.Comedy] = declarations_1.Genre.Comedy;
correctName[declarations_1.Genre.Doujinshi] = declarations_1.Genre.Doujinshi;
correctName[declarations_1.Genre.Drama] = declarations_1.Genre.Drama;
correctName[declarations_1.Genre.Ecchi] = declarations_1.Genre.Ecchi;
correctName[declarations_1.Genre.Fantasy] = declarations_1.Genre.Fantasy;
correctName[declarations_1.Genre.GenderBender] = "Gender Bender";
correctName[declarations_1.Genre.Harem] = declarations_1.Genre.Harem;
correctName[declarations_1.Genre.Historical] = declarations_1.Genre.Historical;
correctName[declarations_1.Genre.Horror] = declarations_1.Genre.Horror;
correctName[declarations_1.Genre.Josei] = declarations_1.Genre.Josei;
correctName[declarations_1.Genre.MartialArts] = "Martial Arts";
correctName[declarations_1.Genre.Mature] = declarations_1.Genre.Mature;
correctName[declarations_1.Genre.Mecha] = declarations_1.Genre.Mecha;
correctName[declarations_1.Genre.Mystery] = declarations_1.Genre.Mystery;
correctName[declarations_1.Genre.Oneshot] = "One Shot";
correctName[declarations_1.Genre.Psychological] = declarations_1.Genre.Psychological;
correctName[declarations_1.Genre.Romance] = declarations_1.Genre.Romance;
correctName[declarations_1.Genre.SchoolLife] = declarations_1.Genre.SchoolLife;
correctName[declarations_1.Genre.SciFi] = "Sci-fi";
correctName[declarations_1.Genre.Seinen] = declarations_1.Genre.Seinen;
correctName[declarations_1.Genre.Shoujo] = declarations_1.Genre.Shoujo;
correctName[declarations_1.Genre.ShoujoAi] = "Shoujo Ai";
correctName[declarations_1.Genre.Shounen] = declarations_1.Genre.Shounen;
correctName[declarations_1.Genre.ShounenAi] = "Shounen Ai";
correctName[declarations_1.Genre.SliceOfLife] = "Slice of Life";
correctName[declarations_1.Genre.Smut] = declarations_1.Genre.Smut;
correctName[declarations_1.Genre.Sports] = declarations_1.Genre.Sports;
correctName[declarations_1.Genre.Supernatural] = declarations_1.Genre.Supernatural;
correctName[declarations_1.Genre.Tragedy] = declarations_1.Genre.Tragedy;
correctName[declarations_1.Genre.Webtoon] = "Webtoons";
correctName[declarations_1.Genre.Yaoi] = declarations_1.Genre.Yaoi;
correctName[declarations_1.Genre.Yuri] = declarations_1.Genre.Yuri;
exports.processFilter = function (filter) {
    filter = filter || {};
    var genres = filter.genres, outGenres = filter.outGenres;
    var nameMethod = "name_method=cw"; // NOTE name search set to contains
    var mangaName = "name=" + (filter.name || "");
    var type = "type=";
    var authorMethod = "author_method=";
    var author = "author=";
    var artistMethod = "artist_method=";
    var artist = "artist=";
    var genreFilter = Supported.map(function (x) { return "genre[" + x + "]=" + inOutGenre(x, genres, outGenres); }).join("&");
    var releaseMethod = "release_method=eq";
    var release = "released=";
    var rating_method = "rating_method=eq";
    var rating = "rating=";
    var completed = "is_completed=";
    var advopts = "advopts=1"; // NOTE not sure what is this
    var status = "status=";
    return { src: url_1.resolve(config_1.config.site, "/search.php"),
        params: [nameMethod, mangaName,
            authorMethod, author,
            artistMethod, artist,
            genreFilter,
            releaseMethod, release,
            rating_method, rating,
            completed].join("&")
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
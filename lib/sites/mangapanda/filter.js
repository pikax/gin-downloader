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
Supported[declarations_1.Genre.Adventure] = declarations_1.Genre.Adventure;
Supported[declarations_1.Genre.Comedy] = declarations_1.Genre.Comedy;
Supported[declarations_1.Genre.Demons] = declarations_1.Genre.Demons;
Supported[declarations_1.Genre.Drama] = declarations_1.Genre.Drama;
Supported[declarations_1.Genre.Ecchi] = declarations_1.Genre.Ecchi;
Supported[declarations_1.Genre.Fantasy] = declarations_1.Genre.Fantasy;
Supported[declarations_1.Genre.GenderBender] = declarations_1.Genre.GenderBender;
Supported[declarations_1.Genre.Harem] = declarations_1.Genre.Harem;
Supported[declarations_1.Genre.Historical] = declarations_1.Genre.Historical;
Supported[declarations_1.Genre.Horror] = declarations_1.Genre.Horror;
Supported[declarations_1.Genre.Josei] = declarations_1.Genre.Josei;
Supported[declarations_1.Genre.Magic] = declarations_1.Genre.Magic;
Supported[declarations_1.Genre.MartialArts] = declarations_1.Genre.MartialArts;
Supported[declarations_1.Genre.Mature] = declarations_1.Genre.Mature;
Supported[declarations_1.Genre.Mecha] = declarations_1.Genre.Mecha;
Supported[declarations_1.Genre.Military] = declarations_1.Genre.Military;
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
Supported[declarations_1.Genre.SuperPower] = declarations_1.Genre.SuperPower;
Supported[declarations_1.Genre.Supernatural] = declarations_1.Genre.Supernatural;
Supported[declarations_1.Genre.Tragedy] = declarations_1.Genre.Tragedy;
Supported[declarations_1.Genre.Vampire] = declarations_1.Genre.Vampire;
Supported[declarations_1.Genre.Yaoi] = declarations_1.Genre.Yaoi;
Supported[declarations_1.Genre.Yuri] = declarations_1.Genre.Yuri;
var ordered = [
    declarations_1.Genre.Action,
    declarations_1.Genre.Adventure,
    declarations_1.Genre.Comedy,
    declarations_1.Genre.Demons,
    declarations_1.Genre.Drama,
    declarations_1.Genre.Ecchi,
    declarations_1.Genre.Fantasy,
    declarations_1.Genre.GenderBender,
    declarations_1.Genre.Harem,
    declarations_1.Genre.Historical,
    declarations_1.Genre.Horror,
    declarations_1.Genre.Josei,
    declarations_1.Genre.Magic,
    declarations_1.Genre.MartialArts,
    declarations_1.Genre.Mature,
    declarations_1.Genre.Mecha,
    declarations_1.Genre.Military,
    declarations_1.Genre.Mystery,
    declarations_1.Genre.Oneshot,
    declarations_1.Genre.Psychological,
    declarations_1.Genre.Romance,
    declarations_1.Genre.SchoolLife,
    declarations_1.Genre.SciFi,
    declarations_1.Genre.Seinen,
    declarations_1.Genre.Shoujo,
    declarations_1.Genre.ShoujoAi,
    declarations_1.Genre.Shounen,
    declarations_1.Genre.ShounenAi,
    declarations_1.Genre.SliceOfLife,
    declarations_1.Genre.Smut,
    declarations_1.Genre.Sports,
    declarations_1.Genre.SuperPower,
    declarations_1.Genre.Supernatural,
    declarations_1.Genre.Tragedy,
    declarations_1.Genre.Vampire,
    declarations_1.Genre.Yaoi,
    declarations_1.Genre.Yuri,
];
exports.processFilter = function (filter) {
    filter = filter || {};
    var genres = filter.genres, outGenres = filter.outGenres, search = filter.search, name = filter.name, page = filter.page;
    var mainsearch = name;
    var fstatus = null;
    var ftype = null;
    if (search) {
        if (!mainsearch) {
            var authorFilter = search.author || search.artist;
            if (authorFilter) {
                mainsearch = authorFilter.name;
            }
        }
        var statusFilter = search.status;
        if (statusFilter) {
            fstatus = resolveStatus(statusFilter);
        }
        ftype = resolveType(search.type) || ftype;
    }
    var msearch = "w=" + (mainsearch || "");
    var genreFilter = "genre=" + ordered.map(function (x) { return inOutGenre(x, genres, outGenres); }).join("");
    var status = "status=" + (fstatus || "");
    var pg = "p=" + (page || 0);
    var type = "rd=" + (ftype || 0);
    return { src: url_1.resolve(config_1.config.site, "/search/"),
        params: [msearch, type, status, genreFilter, pg].join("&")
    };
};
function resolveType(type) {
    switch (type) {
        case declarations_1.FilterMangaType.Manga:
            return 2;
        case declarations_1.FilterMangaType.Manhwa:
            return 1;
        default:
            return null;
    }
}
function resolveStatus(status) {
    switch (status) {
        case declarations_1.FilterStatus.Ongoing:
            return 1;
        case declarations_1.FilterStatus.Complete:
            return 2;
        default:
            return null;
    }
}
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
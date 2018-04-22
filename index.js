'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var url = require('url');
var cheerio = require('cheerio');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

(function (Genre) {
    Genre["Action"] = "Action";
    Genre["Adult"] = "Adult";
    Genre["Adventure"] = "Adventure";
    Genre["AwardWinning"] = "Award Winning";
    Genre["Comedy"] = "Comedy";
    Genre["Comic"] = "Comic";
    Genre["Cooking"] = "Cooking";
    Genre["Demons"] = "Demons";
    Genre["Doujinshi"] = "Doujinshi";
    Genre["Drama"] = "Drama";
    Genre["Ecchi"] = "Ecchi";
    Genre["Fantasy"] = "Fantasy";
    Genre["FourKoma"] = "4-Koma";
    Genre["GenderBender"] = "Gender Bender";
    Genre["Harem"] = "Harem";
    Genre["Historical"] = "Historical";
    Genre["Horror"] = "Horror";
    Genre["Josei"] = "Josei";
    Genre["Lolicon"] = "Lolicon";
    Genre["Magic"] = "Magic";
    Genre["Manga"] = "Manga";
    Genre["Manhua"] = "Manhua";
    Genre["Manhwa"] = "Manhwa";
    Genre["MartialArts"] = "Martial Arts";
    Genre["Mature"] = "Mature";
    Genre["Mecha"] = "Mecha";
    Genre["Medical"] = "Medical";
    Genre["Military"] = "Military";
    Genre["Music"] = "Music";
    Genre["Mystery"] = "Mystery";
    Genre["Oneshot"] = "Oneshot";
    Genre["Psychological"] = "Psychological";
    Genre["Romance"] = "Romance";
    Genre["SchoolLife"] = "School Life";
    Genre["SciFi"] = "Sci-fi";
    Genre["Seinen"] = "Seinen";
    Genre["Shotacon"] = "Shotacon";
    Genre["Shoujo"] = "Shoujo";
    Genre["ShoujoAi"] = "Shoujo Ai";
    Genre["Shounen"] = "Shounen";
    Genre["ShounenAi"] = "Shounen Ai";
    Genre["SliceOfLife"] = "Slice of Life";
    Genre["Smut"] = "Smut";
    Genre["Sports"] = "Sports";
    Genre["Supernatural"] = "Supernatural";
    Genre["SuperPower"] = "SuperPower";
    Genre["Tragedy"] = "Tragedy";
    Genre["Vampire"] = "Vampire";
    Genre["Webtoon"] = "Webtoon";
    Genre["Yaoi"] = "Yaoi";
    Genre["Yuri"] = "Yuri";
    Genre["NoChapters"] = "[no chapters]";
})(exports.Genre || (exports.Genre = {}));
(function (Type) {
    Type["Manga"] = "Manga";
    Type["Manhwa"] = "Manhwa";
    Type["Manhua"] = "Manhua";
    Type["Comic"] = "Comic";
    Type["Artbook"] = "Artbook";
    Type["Other"] = "Other";
})(exports.Type || (exports.Type = {}));
(function (GenreCondition) {
    GenreCondition[GenreCondition["And"] = 0] = "And";
    GenreCondition[GenreCondition["Or"] = 1] = "Or";
})(exports.GenreCondition || (exports.GenreCondition = {}));
(function (FilterStatus) {
    FilterStatus["Ongoing"] = "Ongoing";
    FilterStatus["Complete"] = "Complete";
    FilterStatus["Cancelled"] = "Cancelled";
})(exports.FilterStatus || (exports.FilterStatus = {}));
(function (FilterCondition) {
    FilterCondition[FilterCondition["Equal"] = 0] = "Equal";
    FilterCondition[FilterCondition["Contains"] = 1] = "Contains";
    FilterCondition[FilterCondition["NotContains"] = 2] = "NotContains";
    FilterCondition[FilterCondition["StartsWith"] = 3] = "StartsWith";
    FilterCondition[FilterCondition["EndsWith"] = 4] = "EndsWith";
    FilterCondition[FilterCondition["Less"] = 5] = "Less";
    FilterCondition[FilterCondition["Greater"] = 6] = "Greater";
    FilterCondition[FilterCondition["LessThan"] = 7] = "LessThan";
    FilterCondition[FilterCondition["GreaterThan"] = 8] = "GreaterThan";
})(exports.FilterCondition || (exports.FilterCondition = {}));
(function (MangaSite) {
    MangaSite["MangaHere"] = "mangahere";
})(exports.MangaSite || (exports.MangaSite = {}));

// TODO add logger and log
class MangaHereFilter {
    constructor(dependencies) {
        this._genreSite = dependencies.genre;
    }
    process(filter) {
        const { search, page } = filter;
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
        let inGenres = [];
        let outGenres = [];
        if (search) {
            let { name, author, artist, released, type, genre } = search;
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
function resolveType(type) {
    switch (type) {
        case exports.Type.Manga:
            return "rl";
        case exports.Type.Manhwa:
            return "lr";
        default:
            return null;
    }
}
function resolveStatus(status) {
    switch (status) {
        case exports.FilterStatus.Ongoing:
            return "0";
        case exports.FilterStatus.Complete:
            return "1";
        default:
            return "";
    }
}
function yearSearchMethod(condition) {
    switch (condition) {
        case exports.FilterCondition.LessThan:
            return "lt";
        case exports.FilterCondition.GreaterThan:
            return "gt";
        case exports.FilterCondition.Equal:
        default:
            return "eq";
    }
}
function searchMethod(condition) {
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
        case exports.FilterCondition.StartsWith:
            return "bw";
        case exports.FilterCondition.EndsWith:
            return "ew";
        case exports.FilterCondition.Contains:
        default:
            return "cw";
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

const supported = {
    [exports.Genre.Action]: exports.Genre.Action,
    [exports.Genre.Adventure]: exports.Genre.Adventure,
    [exports.Genre.Comedy]: exports.Genre.Comedy,
    [exports.Genre.Doujinshi]: exports.Genre.Doujinshi,
    [exports.Genre.Drama]: exports.Genre.Drama,
    [exports.Genre.Ecchi]: exports.Genre.Ecchi,
    [exports.Genre.Fantasy]: exports.Genre.Fantasy,
    [exports.Genre.GenderBender]: exports.Genre.GenderBender,
    [exports.Genre.Harem]: exports.Genre.Harem,
    [exports.Genre.Historical]: exports.Genre.Historical,
    [exports.Genre.Horror]: exports.Genre.Horror,
    [exports.Genre.Josei]: exports.Genre.Josei,
    [exports.Genre.MartialArts]: exports.Genre.MartialArts,
    [exports.Genre.Mature]: exports.Genre.Mature,
    [exports.Genre.Mecha]: exports.Genre.Mecha,
    [exports.Genre.Mystery]: exports.Genre.Mystery,
    [exports.Genre.Oneshot]: exports.Genre.Oneshot,
    [exports.Genre.Psychological]: exports.Genre.Psychological,
    [exports.Genre.Romance]: exports.Genre.Romance,
    [exports.Genre.SchoolLife]: exports.Genre.SchoolLife,
    [exports.Genre.SciFi]: exports.Genre.SciFi,
    [exports.Genre.Seinen]: exports.Genre.Seinen,
    [exports.Genre.Shoujo]: exports.Genre.Shoujo,
    [exports.Genre.ShoujoAi]: exports.Genre.ShoujoAi,
    [exports.Genre.Shounen]: exports.Genre.Shounen,
    [exports.Genre.ShounenAi]: exports.Genre.ShounenAi,
    [exports.Genre.SliceOfLife]: exports.Genre.SliceOfLife,
    [exports.Genre.Sports]: exports.Genre.Sports,
    [exports.Genre.Supernatural]: exports.Genre.Supernatural,
    [exports.Genre.Tragedy]: exports.Genre.Tragedy,
    [exports.Genre.Yaoi]: exports.Genre.Yaoi,
    [exports.Genre.Yuri]: exports.Genre.Yuri,
};
const ginGenres = {
    [exports.Genre.Action]: exports.Genre.Action,
    [exports.Genre.Adventure]: exports.Genre.Adventure,
    [exports.Genre.Comedy]: exports.Genre.Comedy,
    [exports.Genre.Doujinshi]: exports.Genre.Doujinshi,
    [exports.Genre.Drama]: exports.Genre.Drama,
    [exports.Genre.Ecchi]: exports.Genre.Ecchi,
    [exports.Genre.Fantasy]: exports.Genre.Fantasy,
    [exports.Genre.GenderBender]: exports.Genre.GenderBender,
    [exports.Genre.Harem]: exports.Genre.Harem,
    [exports.Genre.Historical]: exports.Genre.Historical,
    [exports.Genre.Horror]: exports.Genre.Horror,
    [exports.Genre.Josei]: exports.Genre.Josei,
    [exports.Genre.MartialArts]: exports.Genre.MartialArts,
    [exports.Genre.Mature]: exports.Genre.Mature,
    [exports.Genre.Mecha]: exports.Genre.Mecha,
    [exports.Genre.Mystery]: exports.Genre.Mystery,
    [exports.Genre.Oneshot]: "One Shot",
    [exports.Genre.Psychological]: exports.Genre.Psychological,
    [exports.Genre.Romance]: exports.Genre.Romance,
    [exports.Genre.SchoolLife]: exports.Genre.SchoolLife,
    [exports.Genre.SciFi]: exports.Genre.SciFi,
    [exports.Genre.Seinen]: exports.Genre.Seinen,
    [exports.Genre.Shoujo]: exports.Genre.Shoujo,
    [exports.Genre.ShoujoAi]: exports.Genre.ShoujoAi,
    [exports.Genre.Shounen]: exports.Genre.Shounen,
    [exports.Genre.ShounenAi]: exports.Genre.ShounenAi,
    [exports.Genre.SliceOfLife]: exports.Genre.SliceOfLife,
    [exports.Genre.Sports]: exports.Genre.Sports,
    [exports.Genre.Supernatural]: exports.Genre.Supernatural,
    [exports.Genre.Tragedy]: exports.Genre.Tragedy,
    [exports.Genre.Yaoi]: exports.Genre.Yaoi,
    [exports.Genre.Yuri]: exports.Genre.Yuri,
};
const mangaHereGenres = Object.keys(ginGenres)
    .map(k => ({ k, v: ginGenres[k] }))
    .reduce((c, v) => {
    c[v.v] = v.k;
    return c;
}, {});
class MangaHereGenre {
    constructor() {
        this._site = mangaHereGenres;
        this._gin = ginGenres;
        this._supported = supported;
    }
    fromSiteGenre(genre) {
        return this._site[genre];
    }
    toSiteGenre(genre) {
        return this._gin[genre];
    }
    isSupported(genre) {
        return !!this._supported[genre];
    }
    supported() {
        return Object.keys(this._gin);
    }
}

const project = "gin-downloader";
const loggerFactory = (site) => ({
    debug: require("debug")([project, site].join(":")),
    verbose: require("debug")([project, site, "verbose"].join(":")),
    error: require("debug")([project, site, "error"].join(":"))
});

const mangahereLogger = loggerFactory(exports.MangaSite.MangaHere);

class MangaHereVisitor {
    constructor(dependencies) {
        this._config = dependencies.config;
    }
    *latest() {
        const total = 100;
        const latest = this._config.latestUrl;
        yield {
            href: latest,
            page: 1,
            total
        };
        for (let i = 2; i <= total; ++i) {
            yield {
                href: url.resolve(this._config.latestUrl, i.toString()),
                page: i,
                total
            };
        }
    }
    *mangas() {
        yield {
            href: this._config.mangasUrl,
            page: 1,
            total: 1
        };
    }
}

class MangaHereConfig {
    get name() {
        return "MangaHere";
    }
    get site() {
        return "http://www.mangahere.cc";
    }
    get mangasUrl() {
        return url.resolve(this.site, "/mangalist/");
    }
    get latestUrl() {
        return url.resolve(this.site, "/latest/");
    }
}

/* LicencedError */
function LicencedError(mangaSite, mangaName) {
    const instance = new Error(`${mangaSite} has '${mangaName}' licenced.`);
    instance.mangaSite = mangaSite;
    instance.mangaName = mangaName;
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, LicencedError);
    }
    return instance;
}
LicencedError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
if (Object.setPrototypeOf) {
    Object.setPrototypeOf(LicencedError, Error);
}
else {
    // LicencedError.__proto__ = Error;
}
/* /LicencedError */
/* ImageNotFoundError */
function ImageNotFoundError(mangaSite, uri, errorId) {
    const instance = new Error(`Image not found: ${errorId}`);
    instance.mangaSite = mangaSite;
    instance.errorId = errorId;
    instance.uri = uri;
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, ImageNotFoundError);
    }
    return instance;
}
ImageNotFoundError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ImageNotFoundError, Error);
}
else {
    // ImageNotFoundError.__proto__ = Error;
}
/* /LicencedError */

const regexLastDigit = /\d+(\.\d{1,3})?$/;
const regexFirstDigit = /\d+(\.\d{1,3})?/;
const lastDigit = (s) => {
    const match = s.match(regexLastDigit);
    if (!match) { // can't be to smart if the last digit is 0
        return null;
    }
    return +match[0];
};
const firstDigit = (s) => {
    const match = s.match(regexFirstDigit);
    if (!match) { // can't be to smart if the last digit is 0
        return null;
    }
    return +match[0];
};
const leftTrim = (s) => {
    return s.replace(/^\s+/, "");
};
String.prototype.lastDigit = function () {
    return lastDigit(this);
};
String.prototype.firstDigit = function () {
    return firstDigit(this);
};
String.prototype.leftTrim = function () {
    return leftTrim(this);
};
String.prototype.decodeEscapeSequence = function () {
    return this.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
        return String.fromCharCode(parseInt(arguments[1], 16));
    });
};
String.prototype.getMatches = function (regex, index) {
    index || (index = 1); // default to the first capturing group
    const matches = [];
    let match;
    while (match = regex.exec(this)) {
        matches.push(match[index]);
    }
    return matches;
};

const sanitizeChildren = (children) => children.filter(x => x.type !== "text");

class MangaHereParser {
    constructor(dependencies) {
        this._logger = dependencies.logger;
        this._config = dependencies.config;
        this._genreSite = dependencies.genre;
    }
    *mangas(mangaRequest) {
        const { $, uri, html } = mangaRequest;
        this._logger.debug("parsing mangas:\n\turl:%s", uri);
        this._logger.verbose("parsing mangas:\n\turl:%s\n\thtml:\n%s", uri, html);
        const elements = $(".manga_info").toArray();
        this._logger.debug("processing %d elements", elements.length);
        this._logger.verbose("processing elements:\n%j", elements);
        for (const item of elements) {
            this._logger.verbose("processing element: %j", item);
            const result = {
                name: item.lastChild.nodeValue,
                src: url.resolve(this._config.site, item.attribs["href"]),
            };
            this._logger.debug("processed with: %o", result);
            this._logger.verbose("element %j converted to %o", result);
            yield result;
        }
    }
    *latest(mangaRequest) {
        const { $, uri, html } = mangaRequest;
        this._logger.debug("parsing latest:\n\turl:%s", uri);
        this._logger.verbose("parsing latest:\n\turl:%s\n\thtml:\n%s", uri, html);
        const elements = $(".manga_updates > dl").toArray();
        this._logger.debug("processing %d elements", elements.length);
        this._logger.verbose("processing elements:\n%j", elements);
        for (const item of elements) {
            this._logger.verbose("processing element: %j", item);
            const divChildren = sanitizeChildren(item.children);
            const aManga = divChildren[0].children.find(x => x.name === "a");
            const mangaSrc = url.resolve(this._config.site, aManga.attribs.href);
            const mangaName = aManga.lastChild.nodeValue;
            const date = divChildren[0].children.find(x => x.name === "span").lastChild.nodeValue;
            const dts = sanitizeChildren(divChildren.slice(1));
            this._logger.debug("found [%s] with [%d] chapters", mangaName, dts.length);
            this._logger.verbose("found [%s] with [%d] chapters", mangaName, dts.length);
            for (const dt of dts) {
                this._logger.verbose("processing child element: %j", dt);
                const a = dt.children.find(x => x.name === "a");
                const src = url.resolve(this._config.site, a.attribs.href);
                const title = a.lastChild.nodeValue;
                const chapNumber = lastDigit(title);
                const result = {
                    name: mangaName,
                    src: src,
                    chap_number: chapNumber.toString(),
                    dateAdded: date,
                    mangaSrc,
                };
                this._logger.debug("processed [%s] with: %o", mangaName, result);
                this._logger.verbose("element %j converted to %o", dt, result);
                yield result;
            }
        }
    }
    info(mangaRequest) {
        const { $, uri, html } = mangaRequest;
        this._logger.debug("parsing manga:\n\turl:%s", uri);
        this._logger.verbose("parsing manga:\n\turl:%s\n\thtml:\n%s", uri, html);
        const image = $("img.img").attr("src");
        const title = $("div.title > h3").text().slice(5, -7);
        const li = $(".detail_topText > li").toArray();
        const synonyms = li[2].lastChild.nodeValue.split("; ").map(resolveSynonym);
        const genres = li[3].lastChild.nodeValue.split(", ").map(x => this._genreSite.fromSiteGenre(x));
        const authors = li[4].children.filter(x => x.name === "a").map(x => x.lastChild.nodeValue);
        const artists = li[5].children.filter(x => x.name === "a").map(x => x.lastChild.nodeValue);
        const status = li[6].children[0].next.nodeValue.trim() === "Ongoing"
            ? exports.FilterStatus.Ongoing
            : exports.FilterStatus.Complete;
        const synopsis = li.reverse()[0].children.reverse().find(x => x.name === "p").children[0].nodeValue;
        const licensed = $("#main > article > div > div.manga_detail > div.detail_list > div > strong").length > 0;
        const result = {
            image,
            title,
            synonyms,
            authors,
            artists,
            genres,
            synopsis,
            status,
            licensed
        };
        this._logger.debug("processed with: %o", result);
        this._logger.verbose("element %j converted to %o", result);
        return result;
    }
    *chapters(mangaRequest) {
        const { $, uri, html } = mangaRequest;
        this._logger.debug("parsing chapter:\n\turl:%s", uri);
        this._logger.verbose("parsing chapter:\n\turl:%s\n\thtml:\n%s", uri, html);
        const elements = $("span.left > a").toArray();
        this._logger.debug("processing %d elements", elements.length);
        this._logger.verbose("processing elements:\n%j", elements);
        for (const item of elements) {
            this._logger.verbose("processing element: %j", item);
            const span = item.parent;
            const li = span.parent;
            const liChildren = sanitizeChildren(li.children);
            const a = item;
            const date = liChildren[liChildren.length - 1].lastChild.nodeValue;
            const aText = a.lastChild.nodeValue.trim(); // chapter number
            const name = (span && span.lastChild.nodeValue) || aText; // does it has a name or we use the chapter number
            const href = a.attribs.href;
            const chap_number = aText.lastDigit().toString();
            const result = {
                chap_number,
                name,
                src: url.resolve(this._config.site, href),
                dateAdded: date
            };
            this._logger.debug("processed with: %o", result);
            this._logger.verbose("element %j converted to %o", item, result);
            yield result;
        }
    }
    *imagesPaths(mangaRequest) {
        const { $, uri, html } = mangaRequest;
        this._logger.debug("parsing images paths:\n\turl:%s", uri);
        this._logger.verbose("parsing images paths:\n\turl:%s\n\thtml:\n%s", uri, html);
        const licensed = $("body > section > div.mangaread_error > div.mt10.color_ff00.mb10.center > strong").text();
        if (licensed) {
            this._logger.debug("Is licensed %s", licensed);
            this._logger.verbose("Is licensed %s", licensed);
            throw LicencedError(this._config.name, licensed);
        }
        const elements = $("body > section.readpage_top > div.go_page.clearfix > span > select > option").toArray();
        this._logger.debug("processing %d elements", elements.length);
        this._logger.verbose("processing elements:\n%j", elements);
        for (const item of elements) {
            this._logger.verbose("processing element: %j", item);
            const src = item.attribs.value;
            const name = item.lastChild.nodeValue;
            // NOTE mangahere inserts Feature image at the end with 'Ad'
            if (name === "Featured") {
                this._logger.debug("skipping [Feature] because is an Ad");
                this._logger.verbose("skipping [Feature] because is an Ad");
                continue;
            }
            const result = { src, name };
            this._logger.debug("processed with: %o", result);
            this._logger.verbose("element %j converted to %o", item, result);
            yield result;
        }
    }
    image(mangaRequest) {
        const { uri, html } = mangaRequest;
        this._logger.debug("parsing image:\n\turl:%s", uri);
        this._logger.verbose("parsing image:\n\turl:%s\n\thtml:\n%s", uri, html);
        const match = html.match(/(?:src=")([^"]*)(?:.*id="image")/m);
        if (!match) {
            this._logger.debug("Image not found, please check if the url is correct and if it works on your browser.");
            this._logger.verbose("Image not found, please check if the url is correct and if it works on your browser.");
            throw ImageNotFoundError(this._config.name, uri, "ADB0");
        }
        const result = match[1];
        this._logger.debug("resolved with: %o", result);
        this._logger.verbose("resolved with: %o", result);
        return result;
    }
    filterPage(mangaRequest) {
        const { $, uri, html } = mangaRequest;
        this._logger.debug("get filter current page:\n\turl:%s", uri);
        this._logger.verbose("get filter current page:\n\turl:%s\n\thtml:\n%s", uri, html);
        let page = 1;
        let query = url.parse(uri).query;
        if (query) {
            this._logger.verbose("using query to retrieve current page", uri, html);
            const m = query.toString().match(/(?:page=)(\d+)/);
            if (m) {
                this._logger.verbose("page found in query with value %s", m[0]);
                this._logger.verbose("setting page to [%s] with %d", m[1], m[1]);
                page = +m[1];
            }
        }
        else {
            this._logger.verbose("query not found setting page to 1");
        }
        const lastPageElement = $("div.next-page > a").slice(-2, -1);
        this._logger.verbose("resolved last element %j", lastPageElement);
        const lastPage = lastPageElement && lastPageElement[0]
            ? +lastPageElement.text()
            : 1;
        const result = {
            page: page,
            total: lastPage
        };
        this._logger.debug("resolved with: %o", result);
        this._logger.verbose("resolved with: %o", result);
        return result;
    }
}
const regexSynonymLang = /\((.*)\)$/;
const defaultLang = "";
const resolveSynonym = (dirtyTitle) => {
    const match = dirtyTitle.match(regexSynonymLang);
    if (match) {
        const language = match[1];
        const title = dirtyTitle.replace(` ${match[0]}`, "");
        return {
            title,
            language
        };
    }
    return {
        title: dirtyTitle,
        language: defaultLang,
    };
};

class MangaHereBuilder {
    build(di) {
        const { requestFactory } = di;
        if (!requestFactory) {
            throw new Error("Please provide request factory");
        }
        const logger = di.logger || mangahereLogger;
        const genre = di.genre || new MangaHereGenre();
        const config = di.config || new MangaHereConfig();
        const filter = di.filter || new MangaHereFilter({ genre });
        const parser = di.parser || new MangaHereParser({ logger, config, genre });
        const visitor = di.visitor || new MangaHereVisitor({ config });
        return {
            requestFactory,
            logger,
            genre,
            config,
            filter,
            parser,
            visitor
        };
    }
}

class MangaObject {
    constructor(dependencies, _src, _manga) {
        this._src = _src;
        this._manga = _manga;
        this._chapterResolver = dependencies.chapterResolver;
        this._infoResolver = dependencies.infoResolver;
        this._imageResolver = dependencies.imageResolver;
    }
    get name() {
        return this._manga.name;
    }
    get status() {
        return this._manga.status;
    }
    get mature() {
        return this._manga.mature;
    }
    get image() {
        return this._manga.image;
    }
    manga() {
        return Object.assign({}, this._manga);
    }
    async chapters() {
        const chapters = await this._chapterResolver.chapters(this._src);
        this._chapters = chapters;
        return chapters.map(x => ({
            chap_number: x.chap_number,
            volume: x.volume,
            name: x.name,
            language: x.language,
            scanlator: x.scanlator,
            dateAdded: x.dateAdded,
            licensed: x.licensed
        }));
    }
    async images(chapter) {
        const chap_number = typeof chapter === "string"
            ? chapter
            : typeof chapter === "number"
                ? chapter.toString()
                : !!chapter.chap_number
                    ? chapter.chap_number
                    : undefined;
        if (!chap_number) {
            throw new Error("Invalid chapter provider");
        }
        // resolve chapters if not resolved yet
        if (!this._chapters) {
            await this.chapters();
        }
        const chapters = this._chapters;
        const chap = chapters.find(x => x.chap_number === chap_number);
        if (!chap) {
            throw new Error("Chapter not found");
        }
        const src = chap.src;
        return this._imageResolver.images(src);
    }
    info() {
        return this._info || (this._info = this._infoResolver.info(this._src));
    }
}

const sanitizeFilter = (condition) => {
    const search = {};
    const result = { search };
    if (condition) {
        if (typeof condition === "string") {
            search.name = sanitizeName(condition);
        }
        else {
            // const ns: filter.Search = (condition && condition.search) || undefined as any;
            search.name = sanitizeName(condition.name);
            if (condition.search) {
                const { genre, name, author, artist, released, rating, mature, type, status } = condition.search;
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
                if (!!exports.Type[type]) {
                    search.type = type;
                }
                if (!!exports.FilterStatus[status]) {
                    search.status = status;
                }
            }
        }
    }
    return result;
};
const sanitizeGenre = (genre) => {
    const result = {
        inGenres: [],
        outGenres: [],
        condition: exports.GenreCondition.And
    };
    if (genre) {
        if (Array.isArray(genre)) { // is array of ['Comedy', 'Action'], as default sets as InGenre
            result.inGenres.push(...genre);
        }
        else { // if genre is an object
            const g = genre;
            if (!!g.inGenres) {
                if (Array.isArray(g.inGenres)) {
                    // add only valid gin genres
                    result.inGenres.push(...g.inGenres.filter(isValidGenre));
                }
                else {
                    const s = g.inGenres.toString();
                    if (isValidGenre(s)) {
                        result.inGenres.push(s);
                    }
                }
            }
            if (!!g.outGenres) {
                if (Array.isArray(g.outGenres)) {
                    // add only valid gin genres
                    result.outGenres.push(...g.outGenres.filter(isValidGenre));
                }
                else {
                    const s = g.outGenres.toString();
                    if (isValidGenre(s)) {
                        result.outGenres.push(s);
                    }
                }
            }
        }
        // if genre condition is invalid we set to be GenreCondition.And
        if (exports.GenreCondition[genre.condition]) {
            result.condition = genre.condition;
        }
    }
    return result;
};
const isValidGenre = (s) => !!exports.Genre[s];
const sanitizeName = (name) => {
    const result = {
        name: "",
        condition: exports.FilterCondition.Contains
    };
    if (typeof name === "string" || typeof name === "object") {
        if (typeof name === "string") {
            result.name = name;
        }
        else {
            if (typeof name.name === "string") {
                result.name = name.name;
            }
            if (!!exports.FilterCondition[name.condition]) {
                result.condition = name.condition;
            }
        }
    }
    return result;
};
const sanitizeRating = (rating) => {
    const result = {};
    if (rating) {
        if (typeof rating === "number") {
            result.from = rating;
        }
        else {
            if (typeof rating === "string" || typeof rating === "object") {
                if (!!rating.from || !rating.to) {
                    const from = +rating.from;
                    const to = +rating.to;
                    if (!isNaN(from)) {
                        result.from = from;
                    }
                    if (!isNaN(to)) {
                        result.to = to;
                    }
                }
                else {
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
const sanitizeReleased = (released) => {
    const result = {
        value: null,
        condition: exports.FilterCondition.Equal
    };
    if (released) {
        if (typeof released === "number" || typeof released === "string") {
            const value = +released;
            if (!isNaN(value)) {
                result.value = value;
            }
        }
        else {
            if (typeof released === "object") {
                if (released.value) {
                    const value = +released.value;
                    if (!isNaN(value)) {
                        result.value = value;
                    }
                }
                if (released.condition && exports.FilterCondition[released.condition]) {
                    result.condition = released.condition;
                }
            }
        }
    }
    return result;
};

const builder = new MangaHereBuilder();
class MangaHere {
    constructor(dependencies) {
        this.buildManga = (_a) => {
            var { src } = _a, manga = __rest(_a, ["src"]);
            return new MangaObject(this._resolvers, src, manga);
        };
        const di = builder.build(dependencies);
        this._requestFactory = dependencies.requestFactory;
        this._logger = di.logger;
        this._genre = di.genre;
        this._config = di.config;
        this._filter = di.filter;
        this._parser = di.parser;
        this._visitor = di.visitor;
        this._resolvers = dependencies.resolverFactory.build(di);
    }
    async mangas() {
        const pages = Array.from(this._visitor.mangas()).slice(0, 5); // limit to 5 pages tops
        const pMangas = pages.map(x => this._requestFactory.request({ uri: x.href }))
            .map(r => r.then(x => Array.from(this._parser.mangas(x))));
        const mangas = await Promise.all(pMangas);
        // TODO this should return MangaObject!
        return mangas.reduce((c, v) => {
            c.push(...v);
            return c;
        }, [])
            .map(this.buildManga);
    }
    async latest() {
        const pages = Array.from(this._visitor.latest()).slice(0, 5); // limit to 5 pages tops
        const pMangas = pages.map(x => this._requestFactory.request({ uri: x.href }))
            .map(r => r.then(x => Array.from(this._parser.latest(x))));
        const mangas = await Promise.all(pMangas);
        // TODO this should return Chapter with MangaObject
        return mangas.reduce((c, v) => {
            c.push(...v);
            return c;
        }, []);
    }
    async filter(filter) {
        const f = sanitizeFilter(filter);
        const processed = this._filter.process(f);
        const uri = url.resolve(this._config.mangasUrl, processed.src);
        const response = await this._requestFactory.request({ uri, qs: processed.params });
        const mangas = Array.from(this._parser.mangas(response)).map(this.buildManga);
        const filterResult = this._parser.filterPage(response);
        return Object.assign({}, filterResult, { results: mangas });
    }
}

const requestRetry = require("requestretry");
// specific options for requestretry lib
const DefaultOptions = {
    retryStrategy: requestRetry.RetryStrategies.HTTPOrNetworkError,
    fullResponse: true
};
const maxAttempts = 20, retryDelay = 300;
// retries if the request fails
class RequestRetryStrategy {
    constructor(_maxAttempts = maxAttempts, _retryDelay = retryDelay) {
        this._maxAttempts = _maxAttempts;
        this._retryDelay = _retryDelay;
    }
    request(options) {
        const opts = Object.assign({}, options, DefaultOptions, { maxAttempts: this._maxAttempts, retryDelay: this._retryDelay });
        return requestRetry(opts);
    }
}

class MangaRequestResult {
    constructor(_uri, _html) {
        this._uri = _uri;
        this._html = _html;
    }
    get uri() {
        return this._uri;
    }
    get html() {
        return this._html;
    }
    get $() {
        return this._$ || (this._$ = cheerio.load(this.html));
    }
}

class ConcurrentQueueRequestFactory {
    constructor(_requestStrategy, _queue) {
        this._requestStrategy = _requestStrategy;
        this._queue = _queue;
    }
    request(options) {
        return this._queue.add(() => this._requestStrategy.request(options)
            .then(response => new MangaRequestResult(options.uri.toString(), response.body.toString())));
    }
}

class Lazy {
    constructor(_func) {
        this._func = _func;
    }
    get value() {
        return this._value || (this._value = this._func());
    }
}

class ImageResolver {
    constructor(dependencies) {
        this._parser = dependencies.parser;
        this._config = dependencies.config;
        this._requestFactory = dependencies.requestFactory;
    }
    async images(chapterSrc) {
        let href = url.resolve(this._config.site, chapterSrc).toString();
        let result = await this._requestFactory.request({ uri: href });
        const paths = this._parser.imagesPaths(result);
        paths.next(); // skip first, because we requested that already
        let src = this._parser.image(result);
        const promises = [
            new Lazy(() => Promise.resolve({
                name: url.parse(src).pathname.split("/").reverse()[0],
                src
            }))
        ];
        const promiseRequest = async (s) => {
            const h = url.resolve(href, s).toString();
            const result = await this._requestFactory.request({ uri: h });
            const src = this._parser.image(result);
            return {
                name: url.parse(src).pathname.split("/").reverse()[0],
                src
            };
        };
        for (const it of paths) {
            promises.push(new Lazy(() => promiseRequest(it.src)));
        }
        return promises;
    }
}

class ChapterResolver {
    constructor(dependencies) {
        this._parser = dependencies.parser;
        this._requestFactory = dependencies.requestFactory;
    }
    async chapters(src) {
        const result = await this._requestFactory.request({ uri: src });
        return Array.from(this._parser.chapters(result));
    }
}

class InfoResolver {
    constructor(dependencies) {
        this._parser = dependencies.parser;
        this._config = dependencies.config;
        this._requestFactory = dependencies.requestFactory;
    }
    async info(src) {
        return this._requestFactory.request({ uri: src })
            .then(x => this._parser.info(x));
    }
}

class DefaultResolverFactory {
    build(di) {
        const imageResolver = new ImageResolver(di);
        const chapterResolver = new ChapterResolver(di);
        const infoResolver = new InfoResolver(di);
        return {
            imageResolver,
            chapterResolver,
            infoResolver,
        };
    }
}

const Queue = require("promise-queue");
class GinBuilder {
    get mangahere() {
        return this._mangahere || (this._mangahere = this.buildMangaHere());
    }
    constructor(dependencies = {}) {
        this._requestStrategy = new RequestRetryStrategy();
        this._resolverFactory = new DefaultResolverFactory();
        this._requestFactory = new ConcurrentQueueRequestFactory(this._requestStrategy, new Queue(20));
        this._mangaHereBuilder = new MangaHereBuilder();
    }
    buildMangaHere() {
        return new MangaHere({ requestFactory: this._requestFactory, resolverFactory: this._resolverFactory });
    }
}

const gindownloader = new GinBuilder();

exports.gindownloader = gindownloader;
exports.GinBuilder = GinBuilder;

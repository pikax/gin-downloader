/**
 * Created by rodriguesc on 24/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Promise.prototype.tap = function (func) {
    return this.then(function (x) {
        func(x);
        return x;
    });
};
var regexLastDigit = /\d+(\.\d{1,2})?$/g;
var regexFirstDigit = /\d+(\.\d{1,2})?/g;
String.prototype.lastDigit = function () {
    var match = this.match(regexLastDigit);
    return (match && +match[0]) || null;
};
String.prototype.firstDigit = function () {
    var match = this.match(regexFirstDigit);
    return (match && +match[0]) || null;
};
String.prototype.leftTrim = function () {
    return this.replace(/^\s+/, "");
};
String.prototype.decodeEscapeSequence = function () {
    return this.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
        return String.fromCharCode(parseInt(arguments[1], 16));
    });
};
String.prototype.getMatches = function (regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(this)) {
        matches.push(match[index]);
    }
    return matches;
};
var Genre;
(function (Genre) {
    Genre[Genre["Action"] = "Action"] = "Action";
    Genre[Genre["Adult"] = "Adult"] = "Adult";
    Genre[Genre["Adventure"] = "Adventure"] = "Adventure";
    Genre[Genre["AwardWinning"] = "Award Winning"] = "AwardWinning";
    Genre[Genre["Comedy"] = "Comedy"] = "Comedy";
    Genre[Genre["Comic"] = "Comic"] = "Comic";
    Genre[Genre["Cooking"] = "Cooking"] = "Cooking";
    Genre[Genre["Doujinshi"] = "Doujinshi"] = "Doujinshi";
    Genre[Genre["Drama"] = "Drama"] = "Drama";
    Genre[Genre["Ecchi"] = "Ecchi"] = "Ecchi";
    Genre[Genre["Fantasy"] = "Fantasy"] = "Fantasy";
    Genre[Genre["FourKoma"] = "4-Koma"] = "FourKoma";
    Genre[Genre["GenderBender"] = "Gender Bender"] = "GenderBender";
    Genre[Genre["Harem"] = "Harem"] = "Harem";
    Genre[Genre["Historical"] = "Historical"] = "Historical";
    Genre[Genre["Horror"] = "Horror"] = "Horror";
    Genre[Genre["Josei"] = "Josei"] = "Josei";
    Genre[Genre["Lolicon"] = "Lolicon"] = "Lolicon";
    Genre[Genre["Manga"] = "Manga"] = "Manga";
    Genre[Genre["Manhua"] = "Manhua"] = "Manhua";
    Genre[Genre["Manhwa"] = "Manhwa"] = "Manhwa";
    Genre[Genre["MartialArts"] = "Martial Arts"] = "MartialArts";
    Genre[Genre["Mature"] = "Mature"] = "Mature";
    Genre[Genre["Mecha"] = "Mecha"] = "Mecha";
    Genre[Genre["Medical"] = "Medical"] = "Medical";
    Genre[Genre["Music"] = "Music"] = "Music";
    Genre[Genre["Mystery"] = "Mystery"] = "Mystery";
    Genre[Genre["Oneshot"] = "Oneshot"] = "Oneshot";
    Genre[Genre["Psychological"] = "Psychological"] = "Psychological";
    Genre[Genre["Romance"] = "Romance"] = "Romance";
    Genre[Genre["SchoolLife"] = "School Life"] = "SchoolLife";
    Genre[Genre["SciFi"] = "Sci-fi"] = "SciFi";
    Genre[Genre["Seinen"] = "Seinen"] = "Seinen";
    Genre[Genre["Shotacon"] = "Shotacon"] = "Shotacon";
    Genre[Genre["Shoujo"] = "Shoujo"] = "Shoujo";
    Genre[Genre["ShoujoAi"] = "Shoujo Ai"] = "ShoujoAi";
    Genre[Genre["Shounen"] = "Shounen"] = "Shounen";
    Genre[Genre["ShounenAi"] = "Shounen Ai"] = "ShounenAi";
    Genre[Genre["SliceOfLife"] = "Slice of Life"] = "SliceOfLife";
    Genre[Genre["Smut"] = "Smut"] = "Smut";
    Genre[Genre["Sports"] = "Sports"] = "Sports";
    Genre[Genre["Supernatural"] = "Supernatural"] = "Supernatural";
    Genre[Genre["Tragedy"] = "Tragedy"] = "Tragedy";
    Genre[Genre["Webtoon"] = "Webtoon"] = "Webtoon";
    Genre[Genre["Yaoi"] = "Yaoi"] = "Yaoi";
    Genre[Genre["Yuri"] = "Yuri"] = "Yuri";
    Genre[Genre["NoChapters"] = "[no chapters]"] = "NoChapters";
})(Genre = exports.Genre || (exports.Genre = {}));
var FilterCondition;
(function (FilterCondition) {
    FilterCondition[FilterCondition["Contains"] = 0] = "Contains";
    FilterCondition[FilterCondition["NotContains"] = 1] = "NotContains";
    FilterCondition[FilterCondition["StartsWith"] = 2] = "StartsWith";
    FilterCondition[FilterCondition["EndsWith"] = 3] = "EndsWith";
    FilterCondition[FilterCondition["Less"] = 4] = "Less";
    FilterCondition[FilterCondition["Greater"] = 5] = "Greater";
    FilterCondition[FilterCondition["LessThan"] = 6] = "LessThan";
    FilterCondition[FilterCondition["GreaterThan"] = 7] = "GreaterThan";
})(FilterCondition = exports.FilterCondition || (exports.FilterCondition = {}));
//# sourceMappingURL=declarations.js.map
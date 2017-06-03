"use strict";
/**
 * Created by rodriguesc on 05/03/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var config_1 = require("./config");
var declarations_1 = require("../../declarations");
var url = require("url");
var lodash_1 = require("lodash");
var helper_1 = require("../../common/helper");
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var mangas = [];
        $("ul.series_alpha > li > a").each(function (i, el) {
            mangas[i] = {
                name: Parser.resolveName(el.attribs.href) || el.lastChild.nodeValue.leftTrim(),
                src: url_1.resolve(config_1.default.site, el.attribs.href),
                status: el.parent.children.find(function (x) { return x.name === "span" && x.attribs.class === "mangacompleted"; })
                    ? declarations_1.FilterStatus.Complete.toString()
                    : declarations_1.FilterStatus.Ongoing.toString(),
            };
        });
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        $("tr.c2").each(function (i, el) {
            var divChildren = helper_1.sanitize(el.children);
            var aManga = divChildren[1].children.find(function (x) { return x.name === "a"; });
            // console.log(aManga)
            // let mangaUrl = aManga.attribs.href;
            var mangaName = aManga.children.find(function (x) { return x.name === "strong"; }).lastChild.nodeValue;
            var date = divChildren[2].lastChild.nodeValue;
            var dts = helper_1.sanitize(divChildren[1].children.slice(1).filter(function (x) { return x.name === "a" && x.attribs.class == "chaptersrec"; }));
            for (var _i = 0, dts_1 = dts; _i < dts_1.length; _i++) {
                var a = dts_1[_i];
                // let a = dt.children.find(x => x.name === "a");
                var src = url_1.resolve($.location, a.attribs.href);
                var title = a.lastChild.nodeValue;
                var chapNumber = title.lastDigit();
                chapters.push({
                    name: Parser.resolveName(src) || title,
                    src: src,
                    chap_number: chapNumber,
                    dateAdded: date
                });
            }
        });
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var selector = "#mangaproperties > table > tbody > tr > td";
        var $tds = $(selector);
        var image = $("#mangaimg > img").attr("src");
        var title = Parser.resolveName($.location) || $("h2.aname").text();
        var synonyms = $tds.eq(3).text().split(", ");
        var released = $tds.eq(5).text();
        var status = $tds.eq(7).text();
        var authors = [$tds.eq(9).text()];
        var artists = [$tds.eq(11).text()];
        var direction = $tds.eq(13).text();
        var genres = $("span.genretags").map(function (x, el) { return el.lastChild.nodeValue; }).get();
        var synopsis = $("#readmangasum > p").text();
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            released: released,
            status: status,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            direction: direction
        };
    };
    Parser.prototype.chapters = function ($) {
        var chapters = [];
        $("#listing > tbody > tr ").slice(1).each(function (i, el) {
            var tr = el;
            var children = helper_1.sanitize(tr.children);
            var a = children[0].children.find(function (x) { return x.name === "a"; });
            var date = children.reverse()[0].lastChild.nodeValue;
            var text = a.next.nodeValue.slice(3);
            chapters.push(Parser.parseChapter(a, text, date));
        });
        return chapters;
    };
    Parser.parseChapter = function (a, text, date) {
        var aText = a.lastChild.nodeValue.trim();
        var name = text || aText;
        var href = a.attribs.href;
        return {
            chap_number: aText.lastDigit(),
            name: name,
            src: url_1.resolve(config_1.default.site, href),
            dateAdded: date
        };
    };
    Parser.prototype.imagesPaths = function ($) {
        var paths = [];
        $("#pageMenu > option").each(function (i, el) {
            paths[i] = url_1.resolve($.location, "" + el.attribs.value);
        });
        return paths;
    };
    Parser.prototype.image = function (html) {
        var __img__ = /src="[^"]*" alt/gmi;
        return html.match(__img__)[0].slice(5, -5).replace(/.v=\d+/, "");
    };
    Parser.prototype.filter = function ($) {
        var mangas = [];
        // mangas
        $(".manga_name > div > h3 > a").each(function (i, el) {
            mangas[i] = {
                name: el.lastChild.nodeValue,
                src: url_1.resolve(config_1.default.site, el.attribs.href)
            };
        });
        // author
        $(".authorinfo > div > a").each(function (i, el) {
            mangas.push({
                name: el.lastChild.nodeValue,
                src: url_1.resolve(config_1.default.site, el.attribs.href)
            });
        });
        mangas = lodash_1.uniqBy(mangas, "src");
        var page = 1;
        var query = url.parse($.location).query;
        if (query) {
            var m = query.toString().getMatches(/p=(\d+)/g, 1);
            if (m) {
                page = +m[0] / 30;
            }
        }
        var lastPage = 0;
        var selectedPageElement = $("#sp > strong").slice(-1);
        var lastPageElement = $("#sp > a").slice(-1);
        if (lastPageElement) {
            var href = lastPageElement.attr("href");
            if (href) {
                var m = href.match(/p=(\d+)/);
                if (m) {
                    lastPage = (+m[1]) / 30;
                }
            }
        }
        if (selectedPageElement) {
            var selPage = (+selectedPageElement.text()) - 1;
            if (selPage > lastPage) {
                lastPage = selPage;
            }
        }
        return {
            results: mangas,
            page: page,
            total: lastPage
        };
    };
    return Parser;
}());
Parser.fixNames = {
    "/kapon-_": "Kapon (>_<)!",
    "http://www.mangapanda.com/kapon-_": "Kapon (>_<)!",
};
Parser.resolveName = function (src) { return Parser.fixNames[src]; };
exports.Parser = Parser;
exports.parser = new Parser();
exports.default = exports.parser;
//# sourceMappingURL=parser.js.map
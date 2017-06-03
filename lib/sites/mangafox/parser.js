"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rodriguesc on 24/03/2017.
 */
var declarations_1 = require("../../declarations");
var url_1 = require("url");
var url = require("url");
var config_1 = require("./config");
var helper_1 = require("../../common/helper");
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var mangas = [];
        $(".series_preview").each(function (i, el) {
            mangas[i] = {
                name: el.children[0].data,
                src: el.attribs["href"],
                status: el.attribs.class.indexOf("manga_open") >= 0
                    ? declarations_1.FilterStatus.Ongoing.toString()
                    : declarations_1.FilterStatus.Complete.toString()
            };
        });
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        $("#updates > li > div").each(function (i, el) {
            var divChildren = helper_1.sanitize(el.children);
            var aManga = helper_1.sanitize(divChildren[0].children)[0];
            // let mangaUrl = aManga.attribs.href;
            var mangaName = aManga.lastChild.nodeValue;
            var dts = helper_1.sanitize(divChildren[1].children);
            for (var _i = 0, dts_1 = dts; _i < dts_1.length; _i++) {
                var dt = dts_1[_i];
                var children = helper_1.sanitize(dt.children);
                var date = children[0].lastChild.nodeValue;
                var a = children[1].children.find(function (x) { return x.name === "a"; });
                var src = a.attribs.href;
                var title = a.lastChild.nodeValue;
                var volume = a.next.type === "text" && a.next.nodeValue.trim().slice(1);
                var chapNumber = title.lastDigit();
                chapters.push({
                    name: mangaName,
                    src: src,
                    volume: volume,
                    chap_number: chapNumber,
                    dateAdded: date
                });
            }
        });
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var imgElem = $("div .cover img");
        var titleElem = $("#title");
        var seriesInfo = $("#series_info");
        var image = imgElem.attr("src");
        var title = imgElem.attr("alt");
        var synonyms = titleElem.find("h3").text().split("; ");
        var released = titleElem.find("table tr td a").first().text();
        var authors = [titleElem.find("table tr td a").eq(1).text()];
        var artists = [titleElem.find("table tr td a").eq(2).text()];
        var genres = titleElem.find("table tr td a").slice(3).map(function (i, el) { return el.children[0].nodeValue; }).get();
        var sSstatus = seriesInfo.find("div .data span").eq(0).html().trim();
        var status = sSstatus.slice(0, sSstatus.indexOf(","));
        var ranked = seriesInfo.find("div .data span").eq(2).text();
        var rating = seriesInfo.find("div .data span").eq(3).text();
        var scanlators = seriesInfo.find("div.data span a").slice(1).map(function (i, el) { return el.children[0].nodeValue; }).get();
        var synopsis = titleElem.find("p").text();
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            released: released,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
            ranked: ranked,
            rating: rating,
            scanlators: scanlators
        };
    };
    Parser.prototype.chapters = function ($) {
        var chapters = [];
        $(".chlist > li > div").each(function (i, el) {
            // console.log(el.children)
            var children = helper_1.sanitize(el.children);
            var date = children[0].lastChild.nodeValue;
            var h3Children = helper_1.sanitize(children[children.length - 1].children);
            var a = h3Children[0];
            var span = h3Children.length > 1 && h3Children[1];
            // let title = $(el).parent().parent().parent().prev('div').text();
            // let title = sanitize(el.parent.parent.prev.children).name;
            var volume;
            var slide = el.parent.parent.prev;
            if (slide) {
                volume = helper_1.sanitize(slide.children)[1].children[0].nodeValue;
            }
            chapters.push(Parser.parseChapter(a, span, volume, date));
        });
        return chapters;
    };
    Parser.parseChapter = function (a, span, volume, date) {
        var aText = a.lastChild.nodeValue;
        var name = (span || a).lastChild.nodeValue;
        var href = a.attribs.href;
        return {
            chap_number: aText.lastDigit(),
            name: name,
            src: url_1.resolve(config_1.config.site, href),
            volume: volume,
            dateAdded: date
        };
    };
    Parser.prototype.imagesPaths = function ($) {
        var paths = [];
        $("#top_bar > div > div > select > option").slice(0, -1).each(function (i, el) {
            paths[i] = url_1.resolve($.location, el.attribs.value + ".html");
        });
        return paths;
    };
    Parser.prototype.image = function (html) {
        var __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
        var __img__ = /src=".*\?token[^"]*/gmi;
        var m = html.match(__imgID__);
        if (!m || m.length === 0) {
            throw new Error("Image not found");
        }
        m = m[0].match(__img__);
        if (!m || m.length === 0) {
            throw new Error("Image not found");
        }
        return m[0].slice(5);
    };
    Parser.prototype.filter = function ($) {
        var lastPageElement = $("#nav > ul > li > a").slice(-2, -1);
        var mangas = [];
        $(".manga_text").each(function (i, el) {
            var children = helper_1.sanitize(el.children);
            var a = children.find(function (x) { return x.name === "a"; });
            var info = children.find(function (x) { return x.name === "p" && x.attribs && !!x.attribs.title; });
            var parentA = helper_1.sanitize(el.parent.children)[0];
            var completed = helper_1.sanitize(parentA.children).find(function (x) { return x.name === "em" && x.attribs && x.attribs.class === "tag_completed"; });
            mangas[i] = {
                name: a.lastChild.nodeValue,
                src: a.attribs.href,
                mature: info.attribs.title.indexOf("Mature") >= 0,
                status: completed ? declarations_1.FilterStatus.Complete.toString() : declarations_1.FilterStatus.Ongoing.toString(),
            };
        });
        var page = 1;
        var query = url.parse($.location).query;
        if (query) {
            var m = query.toString().match(/page=(\d+)/g);
            if (m) {
                page = +m[1];
            }
        }
        var lastPage = 1;
        if (lastPageElement) {
            lastPage = +lastPageElement.text();
        }
        return {
            results: mangas,
            page: page,
            total: lastPage
        };
    };
    return Parser;
}());
exports.Parser = Parser;
exports.parser = new Parser();
exports.default = exports.parser;
//# sourceMappingURL=parser.js.map
"use strict";
/**
 * Created by rodriguesc on 03/03/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var declarations_1 = require("../../declarations");
require("../../declarations");
var url_1 = require("url");
var url = require("url");
var config_1 = require("./config");
var helper_1 = require("../../common/helper");
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var mangas = [];
        $(".manga_info").each(function (i, el) {
            mangas[i] = {
                name: el.lastChild.nodeValue,
                src: el.attribs["href"],
            };
        });
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        $(".manga_updates > dl").each(function (i, el) {
            var divChildren = helper_1.sanitize(el.children);
            var aManga = divChildren[0].children.find(function (x) { return x.name === "a"; });
            // console.log(aManga)
            // let mangaUrl = aManga.attribs.href;
            var mangaName = aManga.lastChild.nodeValue;
            var date = divChildren[0].children.find(function (x) { return x.name === "span"; }).lastChild.nodeValue;
            var dts = helper_1.sanitize(divChildren.slice(1));
            for (var _i = 0, dts_1 = dts; _i < dts_1.length; _i++) {
                var dt = dts_1[_i];
                var a = dt.children.find(function (x) { return x.name === "a"; });
                var src = a.attribs.href;
                var title = a.lastChild.nodeValue;
                var chapNumber = title.lastDigit();
                chapters.push({
                    name: mangaName,
                    src: src,
                    chap_number: chapNumber,
                    dateAdded: date
                });
            }
        });
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var image = $("img.img").attr("src");
        var title = $("div.title > h3").text().slice(5, -7);
        var li = [];
        $(".detail_topText > li").each(function (i, el) {
            li[i] = el;
        });
        var synonyms = li[2].lastChild.nodeValue.split("; ");
        var genres = li[3].lastChild.nodeValue.split(", ");
        var authors = li[4].children.filter(function (x) { return x.name === "a"; }).map(function (x) { return x.lastChild.nodeValue; });
        var artists = li[5].children.filter(function (x) { return x.name === "a"; }).map(function (x) { return x.lastChild.nodeValue; });
        var status = li[6].children[0].next.nodeValue.trim() === "Ongoing"
            ? declarations_1.FilterStatus.Ongoing.toString()
            : declarations_1.FilterStatus.Complete.toString();
        var synopsis = li.reverse()[0].children.reverse().find(function (x) { return x.name == "p"; }).children[0].nodeValue;
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
        };
    };
    Parser.prototype.chapters = function ($) {
        var chapters = [];
        $("span.left > a").each(function (i, el) {
            var span = el.parent;
            var li = span.parent;
            var date = helper_1.sanitize(li.children).reverse()[0].lastChild.nodeValue;
            var a = el;
            chapters.push(Parser.parseChapter(a, span, date));
        });
        return chapters;
    };
    Parser.parseChapter = function (a, span, date) {
        var aText = a.lastChild.nodeValue.trim();
        var name = (span && span.lastChild.nodeValue) || aText;
        var href = a.attribs.href;
        return {
            chap_number: aText.lastDigit(),
            name: name,
            src: url_1.resolve(config_1.config.site, href),
            dateAdded: date
        };
    };
    Parser.prototype.imagesPaths = function ($) {
        var paths = [];
        $("body > section.readpage_top > div.go_page.clearfix > span > select > option").each(function (i, el) {
            paths[i] = url_1.resolve($.location, "" + el.attribs.value);
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
        var mangas = [];
        $("a.manga_info").each(function (i, el) {
            mangas[i] = {
                name: el.lastChild.nodeValue,
                src: el.attribs.href
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
        var lastPageElement = $("div.next-page > a").slice(-2, -1);
        var lastPage = 1;
        if (lastPageElement && lastPageElement[0]) {
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
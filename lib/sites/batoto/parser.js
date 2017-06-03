"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rodriguesc on 19/04/2017.
 */
require("../../declarations");
var url_1 = require("url");
var config_1 = require("./config");
var lodash_1 = require("lodash");
var helper_1 = require("../../common/helper");
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var rows = $("tr[id^='comic_rowo']");
        var location = $.location;
        var mangas = [];
        rows.each(function (i, e) {
            // note this performance can be improved, is taking around 72ms to resolve 30 items, libxml could handle that
            // in 10ms, if we don't use the $() it can reach around those speeds, 72ms is not that much
            var td = $(e).prev();
            mangas[i] = {
                name: td.find("td > strong > a").text().slice(1),
                src: td.find("td > strong > a").attr("href"),
                status: td.find("td > strong > a > img").attr("src").indexOf("book_open") > 0 ? "Open" : "Closed",
                mature: td.find("td > img").eq(1).attr("alt") === "Mature",
            };
        });
        // console.log(mangas);
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        var $trs = [];
        $("#content > div > div.category_block.block_wrap > table > tbody > tr").slice(1).each(function (i, el) {
            $trs[i] = el;
        });
        for (var i = 0; i < $trs.length; ++i) {
            var header = $trs[i];
            var ha = lodash_1.last(helper_1.sanitize(header.children)).children
                .find(function (x) { return x && x.attribs && x.attribs.href && x.attribs.href.startsWith("http"); });
            // let mangaUrl = ha.attribs.href;
            var mangaName = ha.lastChild.nodeValue;
            var row = header.attribs.class.slice(0, 4);
            var tr = void 0;
            while ((tr = $trs[++i]) && (tr.attribs && tr.attribs.class.startsWith(row))) {
                var tds = helper_1.sanitize(tr.children).reverse(); // reversed
                var date = tds[0].lastChild.nodeValue.trim(); // date
                var sTd = tds[1].children.find(function (x) { return x.name === "a"; }); // scanlator
                var lTd = tds[2].children.find(function (x) { return x.name === "div"; }); // lang
                var cTd = tds[3].children.find(function (x) { return x.name === "a"; }); // chapter
                //
                // if(i>9){
                //   console.log($trs[i]);
                //   console.log(mangaName);
                //   console.log(mangaUrl);
                // }
                var cname = cTd.lastChild.nodeValue;
                var src = cTd.attribs.href;
                var lang = lTd.attribs.title;
                var scanlator = sTd.lastChild.nodeValue;
                chapters[i] = {
                    name: mangaName,
                    chap_number: Parser.extractChapterNumber(cname),
                    volume: Parser.extractVolumeNumber(cname),
                    src: Parser.convertChapterReaderUrl(src),
                    language: lang,
                    scanlator: scanlator,
                    dateAdded: date
                };
            }
            --i;
        }
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var $content = $("#content");
        var $ipsBox = $content.find("div.ipsBox");
        var $ipbTable = $ipsBox.find(".ipb_table");
        var $tr = $ipbTable.find("tr > td");
        var title = $("h1.ipsType_pagetitle").text().trim();
        var image = $ipsBox.find("img").attr("src");
        var synonyms = $tr.eq(1).children("span").map(function (i, e) { return e.lastChild.nodeValue.slice(1); }).get();
        var authors = $tr.eq(3).children("a").map(function (i, e) { return e.lastChild.nodeValue; }).get();
        var artists = $tr.eq(5).children("a").map(function (i, e) { return e.lastChild.nodeValue; }).get();
        var genres = $tr.eq(7).children("a").map(function (i, e) { return e.lastChild.lastChild; }).filter(function (x, e) { return !!e; }).map(function (i, e) { return e.nodeValue.slice(1); }).get();
        var synopsis = $tr.eq(13).text();
        var type = $tr.eq(9).text().trim(); // TODO curate this result, Manga (Japanese)
        var status = $tr.eq(11).text().trim();
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
            type: type,
        };
    };
    Parser.prototype.chapters = function ($) {
        var chapters = [];
        $(".chapter_row")
            .each(function (i, e) {
            var children = e.children.filter(function (x) { return x.type === "tag"; });
            var eTitle = children[0];
            var eLanguage = children[1];
            var eGroup = children[2];
            var eDate = children[4];
            // const fullTitle = eTitle.next.childNodes[1].lastChild.nodeValue.slice(1);
            var a = eTitle.childNodes.find(function (x) { return x.name === "a"; });
            var fullTitle = a.lastChild.nodeValue.slice(1);
            var src = Parser.convertChapterReaderUrl(a.attribs.href);
            var name = Parser.extractChapterName(fullTitle);
            var chap_number = Parser.extractChapterNumber(fullTitle);
            var volume = Parser.extractVolumeNumber(fullTitle);
            var language = eLanguage.lastChild.attribs.title;
            var scanlator = eGroup.childNodes.find(function (x) { return x.name === "a"; }).lastChild.nodeValue;
            var dateAdded = eDate.lastChild.nodeValue;
            chapters[i] = {
                chap_number: chap_number,
                volume: volume,
                src: src,
                name: name,
                language: language,
                scanlator: scanlator,
                dateAdded: dateAdded,
            };
        });
        return chapters;
    };
    Parser.prototype.imagesPaths = function ($) {
        var paths = [];
        $("#page_select").eq(1).children().each(function (i, e) { return paths[i] = Parser.convertChapterReaderUrl(e.attribs["value"]); });
        return paths;
    };
    Parser.convertChapterReaderUrl = function (src) {
        if (src.startsWith(url_1.resolve(config_1.config.site, "/areader"))) {
            return src;
        }
        var idNumber = src.split("#")[1];
        var pg = 1;
        var pgMatch = /_\d+$/.exec(idNumber);
        if (pgMatch) {
            pg = +pgMatch[0].slice(1);
            idNumber = idNumber.replace(pgMatch[0], "");
        }
        return url_1.resolve(config_1.config.site, "/areader?id=" + idNumber + "&p=" + pg);
    };
    Parser.prototype.image = function (html) {
        var regex = /(?:id="comic_page".*)((http|https):\/\/img\.bato\.to\/comics\/[^"]*)/gm;
        var m = regex.exec(html); // get the first match
        if (!m) {
            throw new Error("Image not found");
        }
        return m[1];
    };
    Parser.prototype.filter = function ($) {
        var results = this.mangas($);
        var next = $(".input_submit");
        var location = $.location;
        var matches = location.match(/\d+$/); // get page | &p=11
        var match = matches && +matches[0];
        return {
            results: results,
            page: match || 1,
            total: (next.length && 99999) || +match || 1
        };
    };
    Parser.extractChapterNumber = function (text) {
        var match = text.match(/Ch\.\d+(\.\d{1,3})?/);
        return match && match[0] && +match[0].slice(3);
    };
    Parser.extractVolumeNumber = function (text) {
        var match = text.match(/Vol\.\d+/);
        return match && match[0] && match[0].slice(4);
    };
    Parser.extractChapterName = function (text) {
        var index = text.indexOf(":");
        return (index > 0 && text.slice(index + 2)) || text;
    };
    return Parser;
}());
exports.Parser = Parser;
exports.parser = new Parser();
exports.default = exports.parser;
//# sourceMappingURL=parser.js.map
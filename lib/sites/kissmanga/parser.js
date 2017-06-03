"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rodriguesc on 24/03/2017.
 */
require("../../declarations");
var url_1 = require("url");
var config_1 = require("./config");
var vm_1 = require("vm");
var helper_1 = require("../../common/helper");
var _ = require("lodash");
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function ($) {
        var mangas = [];
        $("table.listing > tr").slice(2).each(function (i, el) {
            var tds = helper_1.sanitize(el.children);
            var ma = tds[0].children.find(function (x) { return x.name === "a"; });
            var mangaUrl = ma.attribs.href;
            var mangaName = ma.children.map(function (x) { return x.nodeValue; }).join("").leftTrim();
            var completed = tds[1].lastChild.nodeValue === "Completed";
            var src = url_1.resolve($.location || config_1.config.latest_url, mangaUrl);
            mangas[i] = {
                name: Parser.resolveName(src) || mangaName,
                src: src,
                status: completed ? "Closed" : "Open",
            };
        });
        return mangas;
    };
    Parser.prototype.latest = function ($) {
        var chapters = [];
        $("table.listing > tr").slice(2).each(function (i, el) {
            var tds = helper_1.sanitize(el.children);
            var ma = tds[0].children.find(function (x) { return x.name === "a"; });
            // let mangaUrl = ma.attribs.href;
            var mangaName = ma.children.map(function (x) { return x.nodeValue; }).join("").leftTrim();
            var ca = tds[1].children.find(function (x) { return x.name === "a"; });
            var src = ca.attribs.href;
            // let aname = ca.lastChild.nodeValue;
            var vol = _.last(src.match(/(?:vol-)(\d+)/i));
            var chapRegexes = [
                /(?:(?:ch|chapter|ep)-)(\d+(-\d{1,3})?)/i,
                /(\d+(-\d{1,3})?)(?:\?)/,
                /(?:\/)(\d+(-\d{1,3})?)/
            ];
            var chapter = _.reduce(chapRegexes, function (result, value) {
                return result || _.head(_.slice(src.match(value), 1, 2));
            }, null);
            // TODO resolve chapter number or type
            if (!chapter) {
                chapter = -7;
                console.warn("couldn't resolve the chapter for '%s', please refer to %s", src, "https://github.com/pikax/gin-downloader/issues/7");
            }
            // chapter = chapter.replace("-", ".");
            // console.log(chapter)
            chapters[i] = {
                name: mangaName,
                chap_number: chapter,
                src: url_1.resolve(config_1.config.latest_url, src),
                volume: vol
            };
        });
        return chapters;
    };
    Parser.prototype.info = function ($) {
        var $main = $("#leftside > div > div.barContent > div").eq(1);
        var img = $("#rightside > div > div.barContent > div > img").eq(0);
        var a = $main.children("a");
        var rows = $main.children("p");
        var image = img.attr("src");
        var title = a.text();
        var synonyms = rows.eq(0).children("a").map(function (x, el) { return el.lastChild.nodeValue; }).get();
        var genres = rows.eq(1).children("a").map(function (x, el) { return el.lastChild.nodeValue; }).get();
        var authors = rows.eq(2).children("a").map(function (x, el) { return el.lastChild.nodeValue; }).get();
        var artists = authors;
        if (authors.length > 1) {
            authors = authors.slice(0, -1);
            artists = artists.slice(-1);
        }
        var status = rows.eq(3).children("span").eq(0).map(function (i, el) { return el.next; }).text().trim();
        var views = rows.eq(3).children("span").eq(1).map(function (i, el) { return el.next; }).text().trim();
        var synopsis = rows.eq(5).text();
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
            views: views,
        };
    };
    Parser.prototype.chapters = function ($) {
        var mangas = [];
        var rows = new Map();
        $("table.listing > tr > td").each(function (i, el) {
            var array = rows.get(el.parentNode) || [];
            array.push(el);
            rows.set(el.parentNode, array);
        });
        rows.forEach(function (children) {
            var titleTd = children[0];
            var dateAdded = children[1].lastChild.nodeValue.trim();
            var a = titleTd.children[1];
            var title = a.lastChild.nodeValue.leftTrim();
            var src = url_1.resolve(config_1.config.mangas_url, a.attribs.href);
            //
            // console.log(title);
            // console.log(src);
            // console.log(dateAdded);
            mangas.push({
                name: Parser.ResolveChapterName(title),
                chap_number: Parser.ResolveChapterNumber(title),
                volume: Parser.ResolveChapterVolume(title),
                src: src,
                dateAdded: dateAdded,
            });
        });
        return mangas;
    };
    Parser.prototype.imagesList = function (html, secret, vm) {
        var lstImages = html.getMatches(/wrapKA\("([^"]*)"/gm, 1);
        var sandbox = {
            lstImages: lstImages,
            imgs: Array(),
            secret: secret,
            alert: console.log
        };
        var context = vm_1.createContext(sandbox);
        vm.runInContext(context);
        return sandbox.imgs.map(function (x) { return /url=([^&]*)/.exec(x)[1]; }).map(decodeURIComponent);
    };
    Parser.prototype.getSecret = function (html) {
        var m = /\["([^"]*)"]; chko[^\[]*\[(\d+)]/gm.exec(html);
        if (m) {
            return m[1].decodeEscapeSequence();
        }
        return null;
    };
    Parser.prototype.imagesPaths = function (doc) {
        throw new Error("no needed");
    };
    Parser.prototype.image = function (html) {
        throw new Error("no needed");
    };
    Object.defineProperty(Parser.prototype, "VM", {
        get: function () {
            return this._vm;
        },
        enumerable: true,
        configurable: true
    });
    Parser.prototype.buildVM = function (cajs, lojs) {
        var scripts = [cajs,
            lojs,
            "chko = secret || chko; key = CryptoJS.SHA256(chko);",
            "for (var img in lstImages) imgs.push(wrapKA(lstImages[img]).toString());"
        ];
        return this._vm = new vm_1.Script(scripts.join("\n"));
    };
    Parser.prototype.filter = function (doc) {
        return {
            results: this.mangas(doc),
            page: 1,
            total: 1
        };
    };
    Parser.ResolveChapterVolume = function (title) {
        if (title.indexOf("_vol") < 0)
            return;
        var frags = title.split(": ", 1);
        var chapfrags = frags[0].split("ch.");
        return chapfrags[0].trim().lastDigit().toString();
    };
    Parser.ResolveChapterNumber = function (title) {
        var frags = title.split(": ", 1);
        return frags[0].lastDigit();
    };
    Parser.ResolveChapterName = function (title) {
        var frags = title.split(": ");
        return frags[frags.length - 1];
    };
    return Parser;
}());
Parser.fixNames = {
    "http://kissmanga.com/Manga/Desire-KOTANI-Kenichi": "Desire KOTANI Kenichi",
    "http://kissmanga.com/Manga/Tokyo-Toy-Box-o": "Tokyo Toy Box o",
    "http://kissmanga.com/Manga/Valkyrie%20Profile": "Valkyrie%20Profile",
};
Parser.resolveName = function (src) { return Parser.fixNames[src]; };
exports.Parser = Parser;
exports.parser = new Parser();
exports.default = exports.parser;
//# sourceMappingURL=parser.js.map
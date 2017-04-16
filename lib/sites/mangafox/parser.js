"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var url = require("url");
var config_1 = require("./config");
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function (doc) {
        var xpath = "//div[@class='manga_list']/ul/li/a";
        return doc.find(xpath).map(function (x) {
            return {
                name: x.text(),
                src: url_1.resolve(config_1.config.site, x.attr("href").value())
            };
        });
    };
    Parser.prototype.latest = function (doc) {
        var xpath = "//dt/span/a[@class='chapter']";
        return doc.find(xpath).map(function (x) { return Parser.parseChapter(x, "following-sibling::text()"); });
    };
    Parser.prototype.info = function (doc) {
        var image = doc.get("//div[@class='cover']/img").attr("src").value();
        var title = doc.get("//div[@class='cover']/img").attr("alt").value();
        var synonyms = doc.get("//div[@id='title']/h3").text().split("; ");
        var released = doc.get("//div[@id='title']/table/tr[2]/td[1]/a").text();
        var authors = [doc.get("//div[@id='title']/table/tr[2]/td[2]/a").text()];
        var artists = [doc.get("//div[@id='title']/table/tr[2]/td[3]/a").text()];
        var genres = doc.find("//div[@id='title']/table/tr[2]/td[4]/a").map(function (x) { return x.text(); });
        var synopsis = doc.get("//div[@id='title']/p").text();
        var status = doc.get("//div[@id='series_info']/div[@class='data'][1]/span/text()[1]").text().trim().slice(0, -1);
        var ranked = doc.get("//div[@id='series_info']/div[@class='data'][2]/span").text();
        var rating = doc.get("//div[@id='series_info']/div[@class='data'][3]/span").text();
        var scanlators = doc.find("//div[@id='series_info']/div[@class='data'][4]/span/a").map(function (x) { return x.text(); });
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
    Parser.prototype.chapters = function (doc) {
        var xpath = "//div[@id='chapters']/ul/li/div//a[@class='tips']";
        return doc.find(xpath).map(function (x) { return Parser.parseChapter(x, "preceding::div[@class='slide']/h3/text()"); });
    };
    Parser.parseChapter = function (x, xVolume) {
        return {
            chap_number: x.text().lastDigit(),
            name: (x.get("following-sibling::span/text()") || x).text(),
            src: url_1.resolve(config_1.config.site, x.attr("href").value()),
            volume: x.get(xVolume).text().trim()
        };
    };
    Parser.prototype.imagesPaths = function (doc) {
        var xpath = "//form[@id='top_bar']/div/div[@class='l']/select/option[position()< last()]/text()";
        return doc.find(xpath)
            .map(function (x) { return url_1.resolve(doc.location, x.text() + ".html"); });
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
    Parser.prototype.filter = function (doc) {
        var xpath = "//a[@class='title series_preview top']";
        var mangas = doc.find(xpath).map(function (x) {
            return {
                name: x.text(),
                src: x.attr("href").value()
            };
        });
        var page = 1;
        var query = url.parse(doc.location).query;
        if (query) {
            var m = query.toString().match(/page=(\d+)/g);
            if (m) {
                page = +m[1];
            }
        }
        var lastPageElement = doc.get("//div[@id='nav']/ul/li[last()-1]/a");
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
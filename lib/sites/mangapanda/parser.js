/**
 * Created by rodriguesc on 05/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var config_1 = require("./config");
var url = require("url");
var lodash_1 = require("lodash");
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function (doc) {
        var xpath = "//ul[@class='series_alpha']/li/a";
        return doc.find(xpath)
            .map(function (x) {
            return {
                name: x.text().leftTrim(),
                src: url_1.resolve(config_1.default.site, x.attr("href").value())
            };
        });
    };
    Parser.prototype.latest = function (doc) {
        var xpath = "//a[@class='chaptersrec']";
        return doc.find(xpath).map(function (x) {
            return {
                name: x.text(),
                src: url_1.resolve(config_1.default.site, x.attr("href").value())
            };
        });
    };
    Parser.prototype.info = function (doc) {
        var image = doc.get("//div[@id='mangaimg']/img").attr("src").value();
        var title = doc.get("//h2[@class='aname']").text();
        var synonyms = doc.get("//div[@id='mangaproperties']/table/tr[2]/td[2]").text().split(", ");
        var released = doc.get("//div[@id='mangaproperties']/table/tr[3]/td[2]").text();
        var status = doc.get("//div[@id='mangaproperties']/table/tr[4]/td[2]").text();
        var authors = [doc.get("//div[@id='mangaproperties']/table/tr[5]/td[2]").text()];
        var artists = [doc.get("//div[@id='mangaproperties']/table/tr[6]/td[2]").text()];
        var genres = doc.find("//span[@class='genretags']").map(function (x) { return x.text(); });
        var synopsis = doc.get("//div[@id='readmangasum']/p").text();
        var direction = doc.get("//div[@id='mangaproperties']/table/tr[7]/td[2]").text();
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
    Parser.prototype.chapters = function (doc) {
        var xpath = "//table[@id='listing']/tr[position()> 1]";
        return doc.find(xpath)
            .map(function (x) {
            return {
                chap_number: x.get("td/a").text().trim().lastDigit(),
                name: x.text() || x.get("td/a/following-sibling::text()").text().slice(3),
                src: url_1.resolve(doc.baseUrl, x.get("td/a").attr("href").value()),
            };
        });
    };
    Parser.prototype.imagesPaths = function (doc) {
        var xpath = "//select[@id='pageMenu']/option/@value";
        return doc.find(xpath)
            .map(function (x) { return url_1.resolve(config_1.default.site, x.value()); });
    };
    Parser.prototype.image = function (html) {
        var __img__ = /src="[^"]*" alt/gmi;
        return html.match(__img__)[0].slice(5, -5).replace(/.v=\d+/, "");
    };
    Parser.prototype.filter = function (doc) {
        var xpath = "//div[@class='manga_name']/div/h3/a";
        var authorXpath = "//div[@class='authorinfo']/div[1]/a";
        var mangas = doc.find(xpath).map(function (x) {
            return {
                name: x.text(),
                src: url_1.resolve(config_1.default.site, x.attr("href").value())
            };
        });
        mangas = mangas.concat(doc.find(authorXpath).map(function (x) {
            return {
                name: x.text(),
                src: url_1.resolve(config_1.default.site, x.attr("href").value())
            };
        }));
        mangas = lodash_1.uniqBy(mangas, "src");
        var page = 1;
        var query = url.parse(doc.location).query;
        if (query) {
            var m = query.toString().getMatches(/p=(\d+)/g, 1);
            if (m) {
                page = +m[0];
            }
        }
        var lastPageElement = doc.get("//div[@id='sp']/a[last()]");
        var lastPage = 0;
        if (lastPageElement) {
            var m = lastPageElement.attr("href").value().getMatches(/p=(\d+)/g, 1);
            if (m) {
                lastPage = +m[0];
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
exports.Parser = Parser;
exports.parser = new Parser();
exports.default = exports.parser;
//# sourceMappingURL=parser.js.map
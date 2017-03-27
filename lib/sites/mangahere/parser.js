/**
 * Created by rodriguesc on 03/03/2017.
 */
"use strict";
var url_1 = require("url");
var config_1 = require("./config");
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function (doc) {
        var xpath = "//a[@class='manga_info']";
        return doc.find(xpath)
            .map(function (x) {
            return {
                name: x.text(),
                src: x.attr("href").value()
            };
        });
    };
    Parser.prototype.latest = function (doc) {
        var xpath = "//div[@class='manga_updates']/dl/dd/a";
        return doc.find(xpath).map(function (x) {
            return {
                name: x.text(),
                src: x.attr("href").value(),
            };
        });
    };
    Parser.prototype.info = function (doc) {
        var image = doc.get("//img[@class='img']").attr("src").value();
        var title = doc.get("//div[@class='title']/h3").text().slice(5, -7);
        var synonyms = doc.get("//ul[@class='detail_topText']/li[3]/text()").text().split("; ");
        var authors = [doc.get("//ul[@class='detail_topText']/li[5]/a[@class='color_0077']").text()];
        var artists = [doc.get("//ul[@class='detail_topText']/li[6]/a[@class='color_0077']").text()];
        var genres = doc.get("//ul[@class='detail_topText']/li[4]/text()").text().split(", ");
        var synopsis = doc.get("//ul[@class='detail_topText']/li/p[last()]/text()").text();
        var status = doc.get("//ul[@class='detail_topText']/li[7]/text()[1]").text().trim();
        var ranked = doc.get("//ul[@class='detail_topText']/li[8]/text()[1]").text();
        var rating = doc.get("//ul[@class='detail_topText']/li[@id='rate']/span[@id='current_rating']").text();
        var similarmanga = doc.find("//div[@class='box_radius mb10'][2]/ul[@class='right_aside']/li/a").map(function (x) { return x.attr("title").value(); });
        return {
            image: image,
            title: title,
            synonyms: synonyms,
            authors: authors,
            artists: artists,
            genres: genres,
            synopsis: synopsis,
            status: status,
            ranked: ranked,
            rating: rating,
            similarmanga: similarmanga
        };
    };
    Parser.prototype.chapters = function (doc) {
        var xpath = "//span[@class='left']/a";
        return doc.find(xpath)
            .map(function (x) {
            return {
                number: x.text().trim().lastDigit(),
                name: (x.get("following-sibling::span/following-sibling::text()") || x).text(),
                src: x.attr("href").value(),
            };
        });
    };
    Parser.prototype.imagesPaths = function (doc) {
        var xpath = "//section[@class='readpage_top']/div[@class='go_page clearfix']/span[@class='right']/select[@class='wid60']/option/@value";
        return doc.find(xpath)
            .map(function (x) { return url_1.resolve(config_1.default.site, x.value()); });
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
    return Parser;
}());
exports.Parser = Parser;
exports.parser = new Parser();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.parser;
//# sourceMappingURL=parser.js.map
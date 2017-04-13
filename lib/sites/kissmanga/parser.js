"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rodriguesc on 24/03/2017.
 */
require("../../declarations");
var url_1 = require("url");
var config_1 = require("./config");
var vm_1 = require("vm");
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.mangas = function (doc) {
        var xpath = "//table/tr/td[1]/a";
        return doc.find(xpath).map(function (x) {
            return {
                name: x.text().leftTrim(),
                src: url_1.resolve(config_1.config.site, x.attr("href").value())
            };
        });
    };
    ;
    Parser.prototype.latest = function (doc) {
        var xpath = "//dt/span/a[@class='chapter']";
        throw new Error("not implemented");
        // return doc.find(xpath).map(x => Parser.parseChapter(x, "following-sibling::text()"));
    };
    Parser.prototype.info = function (doc) {
        var image = doc.get("///div[@class='rightBox'][1]/div[@class='barContent']/div[2]/img").attr("src").value();
        var title = doc.get("//div[2]/a[@class='bigChar']").text();
        var synonyms = doc.find("//div[@class='barContent']/div[2]/p[1]/a/text()").map(function (x) { return x.text(); });
        var authors = [doc.get("//div[2]/p[3]/a[1]").text()];
        var artists = [doc.get("//div[2]/p[3]/a[last()]").text()];
        var genres = doc.find("//div[2]/p[2]/a").map(function (x) { return x.text(); });
        var synopsis = doc.get("//div[@class='barContent']/div[2]/p[6]").text();
        var status = doc.get("//p[4]/span[@class='info'][1]/following-sibling::text()[1]").text().trim();
        var views = doc.get("//p[4]/span[@class='info'][1]/following-sibling::text()[2]").text().trim();
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
    Parser.prototype.chapters = function (doc) {
        var xpath = "//table/tr/td[1]/a";
        return doc.find(xpath).map(function (x) {
            return {
                number: x.text().trim().lastDigit(),
                name: x.text().trim(),
                src: url_1.resolve(config_1.config.site, x.attr("href").value()),
            };
        });
    };
    Parser.imagesList = function (html, secret, vm) {
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
    Parser.getSecret = function (html) {
        var m = /\["([^\"]*)"]; chko[^\[]*\[(\d+)\]/gm.exec(html);
        return m[1].decodeEscapeSequence();
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
            "chko = secret; key = CryptoJS.SHA256(chko);",
            "for (var img in lstImages) imgs.push(wrapKA(lstImages[img]).toString());"
        ];
        return this._vm = new vm_1.Script(scripts.join("\n"));
    };
    return Parser;
}());
exports.Parser = Parser;
exports.parser = new Parser();
exports.default = exports.parser;
//# sourceMappingURL=parser.js.map
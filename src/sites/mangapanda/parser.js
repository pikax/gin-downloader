/**
 * Created by rodriguesc on 05/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const config_1 = require("./config");
class Parser {
    mangas(doc) {
        const xpath = '//ul[@class=\'series_alpha\']/li/a';
        return doc.find(xpath)
            .map(x => {
            return {
                name: x.text(),
                src: url_1.resolve(config_1.default.site, x.attr('href').value())
            };
        });
    }
    latest(doc) {
        const xpath = '//a[@class=\'chaptersrec\']';
        return doc.find(xpath).map(x => {
            return {
                name: x.text(),
                src: url_1.resolve(config_1.default.site, x.attr('href').value())
            };
        });
    }
    info(doc) {
        let image = doc.get('//div[@id=\'mangaimg\']/img').attr('src').value();
        let title = doc.get('//h2[@class=\'aname\']').text();
        let synonyms = doc.get('//div[@id=\'mangaproperties\']/table/tr[2]/td[2]').text().split(', ');
        let released = doc.get('//div[@id=\'mangaproperties\']/table/tr[3]/td[2]').text();
        let status = doc.get('//div[@id=\'mangaproperties\']/table/tr[4]/td[2]').text();
        let authors = [doc.get('//div[@id=\'mangaproperties\']/table/tr[5]/td[2]').text()];
        let artists = [doc.get('//div[@id=\'mangaproperties\']/table/tr[6]/td[2]').text()];
        let genres = doc.find('//span[@class=\'genretags\']').map(x => x.text());
        let synopsis = doc.get('//div[@id=\'readmangasum\']/p').text();
        let direction = doc.get('//div[@id=\'mangaproperties\']/table/tr[7]/td[2]').text();
        return {
            image,
            title,
            synonyms,
            released,
            status,
            authors,
            artists,
            genres,
            synopsis,
            direction
        };
    }
    chapters(doc) {
        const xpath = '//table[@id=\'listing\']/tr[position()> 1]';
        return doc.find(xpath)
            .map(x => {
            return {
                number: x.get('td/a').text().trim().lastDigit(),
                name: x.get('td/a/following-sibling::text()').text().slice(3) || x.text(),
                src: url_1.resolve(doc.baseUrl, x.get('td/a').attr('href').value()),
            };
        });
    }
    imagesPaths(doc) {
        const xpath = '//select[@id=\'pageMenu\']/option/@value';
        return doc.find(xpath)
            .map(x => url_1.resolve(config_1.default.site, x.value()));
    }
    image(html) {
        const __img__ = /src="[^"]*" alt/gmi;
        return html.match(__img__)[0].slice(5, -5).replace(/.v=\d+/, '');
    }
}
exports.parser = new Parser();
exports.default = exports.parser;
//# sourceMappingURL=parser.js.map
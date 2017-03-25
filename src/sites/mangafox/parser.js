"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const config_1 = require("./config");
class Parser {
    mangas(doc) {
        const xpath = '//div[@class=\'manga_list\']/ul/li/a';
        let m = doc.find(xpath).map(x => {
            return {
                name: x.text(),
                src: url.resolve(config_1.default.site, x.attr('href').value())
            };
        });
        return m;
        // return Promise.resolve(m);
    }
    ;
    latest(doc) {
        const xpath = '//dt/span/a[@class=\'chapter\']';
        let l = doc.find(xpath).map(x => Parser.parseChapter(x, "following-sibling::text()"));
        return Promise.resolve(l);
    }
    info(doc) {
        let image = doc.get('//div[@class=\'cover\']/img').attr('src').value();
        let title = doc.get('//div[@class=\'cover\']/img').attr('alt').value();
        let synonyms = doc.get('//div[@id=\'title\']/h3').text().split('; ');
        let released = doc.get('//div[@id=\'title\']/table/tr[2]/td[1]/a').text();
        let authors = [doc.get('//div[@id=\'title\']/table/tr[2]/td[2]/a').text()];
        let artists = [doc.get('//div[@id=\'title\']/table/tr[2]/td[3]/a').text()];
        let genres = doc.find('//div[@id=\'title\']/table/tr[2]/td[4]/a').map(x => x.text());
        let synopsis = doc.get('//div[@id=\'title\']/p').text();
        let status = doc.get('//div[@id=\'series_info\']/div[@class=\'data\'][1]/span/text()[1]').text().trim().slice(0, -1);
        let ranked = doc.get('//div[@id=\'series_info\']/div[@class=\'data\'][2]/span').text();
        let rating = doc.get('//div[@id=\'series_info\']/div[@class=\'data\'][3]/span').text();
        let scanlators = doc.find('//div[@id=\'series_info\']/div[@class=\'data\'][4]/span/a').map(x => x.text());
        let result = {
            image,
            title,
            synonyms,
            released,
            authors,
            artists,
            genres,
            synopsis,
            status,
            ranked,
            rating,
            scanlators
        };
        return Promise.resolve(result);
    }
    chapters(doc) {
        const xpath = '//div[@id=\'chapters\']/ul/li/div//a[@class=\'tips\']';
        let m = doc.find(xpath).map(x => Parser.parseChapter(x, 'preceding::div[@class=\'slide\']/h3/text()'));
        return Promise.resolve(m);
    }
    static parseChapter(x, xVolume) {
        return {
            number: x.text().lastDigit(),
            name: (x.get('following-sibling::span/text()') || x).text(),
            src: url.resolve(config_1.default.site, x.attr('href').value()),
            volume: x.get(xVolume).text().trim()
        };
    }
    images(doc) {
        throw new Error('Method not implemented.');
    }
    imagesPaths(doc) {
        const xpath = '//form[@id=\'top_bar\']/div/div[@class=\'l\']/select/option[position()< last()]/text()';
        return doc.find(xpath)
            .map(x => url.resolve(doc.baseUrl, x.text() + '.html'));
    }
    image(html) {
        const __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
        const __img__ = /src=".*\?token[^"]*/gmi;
        let m = html.match(__imgID__);
        if (!m || m.length === 0)
            throw new Error('Image not found');
        m = m[0].match(__img__);
        if (!m || m.length === 0)
            throw new Error('Image not found');
        return m[0].slice(5);
    }
}
exports.parser = new Parser();
exports.default = exports.parser;
//# sourceMappingURL=parser.js.map
/**
 * Created by rodriguesc on 03/03/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const config_1 = require("./config");
class Parser {
    mangas(doc) {
        const xpath = '//a[@class=\'manga_info\']';
        return doc.find(xpath)
            .map(x => {
            return {
                name: x.text(),
                src: x.attr('href').value()
            };
        });
    }
    latest(doc) {
        const xpath = '//div[@class=\'manga_updates\']/dl/dd/a';
        return doc.find(xpath).map(x => {
            return {
                name: x.text(),
                src: x.attr('href').value(),
            };
        });
    }
    info(doc) {
        let image = doc.get('//img[@class=\'img\']').attr('src').value();
        let title = doc.get('//div[@class=\'title\']/h3').text().slice(5, -7);
        let synonyms = doc.get('//ul[@class=\'detail_topText\']/li[3]/text()').text().split('; ');
        let authors = [doc.get('//ul[@class=\'detail_topText\']/li[5]/a[@class=\'color_0077\']').text()];
        let artists = [doc.get('//ul[@class=\'detail_topText\']/li[6]/a[@class=\'color_0077\']').text()];
        let genres = doc.get('//ul[@class=\'detail_topText\']/li[4]/text()').text().split(', ');
        let synopsis = doc.get('//ul[@class=\'detail_topText\']/li/p[last()]/text()').text();
        let status = doc.get('//ul[@class=\'detail_topText\']/li[7]/text()[1]').text().trim();
        let ranked = doc.get('//ul[@class=\'detail_topText\']/li[8]/text()[1]').text();
        let rating = doc.get('//ul[@class=\'detail_topText\']/li[@id=\'rate\']/span[@id=\'current_rating\']').text();
        let similarmanga = doc.find('//div[@class=\'box_radius mb10\'][2]/ul[@class=\'right_aside\']/li/a').map(x => x.attr('title').value());
        return {
            image,
            title,
            synonyms,
            authors,
            artists,
            genres,
            synopsis,
            status,
            ranked,
            rating,
            similarmanga
        };
    }
    chapters(doc) {
        const xpath = `//span[@class='left']/a`;
        return doc.find(xpath)
            .map(x => {
            return {
                number: x.text().trim().lastDigit(),
                name: (x.get('following-sibling::span/following-sibling::text()') || x).text(),
                src: x.attr('href').value(),
            };
        });
    }
    imagesPaths(doc) {
        const xpath = '//section[@class=\'readpage_top\']/div[@class=\'go_page clearfix\']/span[@class=\'right\']/select[@class=\'wid60\']/option/@value';
        return doc.find(xpath)
            .map(x => url_1.resolve(config_1.default.site, x.value()));
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
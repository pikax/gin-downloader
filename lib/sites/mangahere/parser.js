'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rodriguesc on 03/03/2017.
 */

var mangas = function mangas(doc) {
  var xpath = '//a[@class=\'manga_info\']';
  return doc.find(xpath).map(function (x) {
    return {
      name: x.text(),
      src: x.attr('href').value()
    };
  });
};
//const latest = osm => resolveArray(resolveLatest(osm));
//latest from http://mangafox.me/releases
var latest = function latest(doc) {
  var xpath = '//div[@class=\'manga_updates\']/dl/dd/a';
  return doc.find(xpath).map(function (x) {
    return {
      name: x.text(),
      src: x.attr('href').value()
    };
  });
};

//const mangaInfo = osm => resolveObject(resolveMangaInfo(osm));
//info from http://mangafox.me/manga/**
var mangaInfo = function mangaInfo(doc) {
  var image = doc.get('//img[@class=\'img\']').attr('src').value();
  var title = doc.get('//div[@class=\'title\']/h3').text().slice(5, -7);
  var synonyms = doc.get('//ul[@class=\'detail_topText\']/li[3]/text()').text().split('; ');
  var authors = [doc.get('//ul[@class=\'detail_topText\']/li[5]/a[@class=\'color_0077\']').text()];
  var artists = [doc.get('//ul[@class=\'detail_topText\']/li[6]/a[@class=\'color_0077\']').text()];
  var genres = doc.get('//ul[@class=\'detail_topText\']/li[4]/text()').text().split(', ');
  var synopsis = doc.get('//ul[@class=\'detail_topText\']/li/p[last()]/text()').text();
  var status = doc.get('//ul[@class=\'detail_topText\']/li[7]/text()[1]').text().trim();
  var ranked = doc.get('//ul[@class=\'detail_topText\']/li[8]/text()[1]').text();
  var rating = doc.get('//ul[@class=\'detail_topText\']/li[@id=\'rate\']/span[@id=\'current_rating\']').text();
  var similarmanga = doc.find('//div[@class=\'box_radius mb10\'][2]/ul[@class=\'right_aside\']/li/a').map(function (x) {
    return x.attr('title').value();
  });

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

//const image = osm => resolveObject(resolveImage(osm));
//images from chapter
var image = function image(html) {
  var __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
  var __img__ = /src=".*\?token[^"]*/gmi;

  return html.match(__imgID__)[0].match(__img__)[0].slice(5);
};

//const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
var imagesPaths = function imagesPaths(doc) {
  var xpath = '//section[@class=\'readpage_top\']/div[@class=\'go_page clearfix\']/span[@class=\'right\']/select[@class=\'wid60\']/option/@value';
  return doc.find(xpath).map(function (x) {
    return _url2.default.resolve(_config2.default.site, x.value());
  });
};

//const chapters = osm => resolveArray(resolveChapters(osm));
var chapters = function chapters(doc) {
  var xpath = '//span[@class=\'left\']/a';

  return doc.find(xpath).map(function (x) {
    return {
      number: x.text().trim(),
      name: x.get('following-sibling::span/following-sibling::text()') || x.text(),
      src: x.attr('href').value()
    };
  });
};

//const images = osm => osm;


var exp = {
  config: _config2.default,

  image: image,
  imagesPaths: imagesPaths,
  latest: latest,
  mangas: mangas,
  chapters: chapters,
  mangaInfo: mangaInfo
};

exports.default = exp;
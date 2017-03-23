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
 * Created by rodriguesc on 05/03/2017.
 */

var mangas = function mangas(doc) {
  var xpath = '//ul[@class=\'series_alpha\']/li/a';
  return doc.find(xpath).map(function (x) {
    return {
      name: x.text(),
      src: _url2.default.resolve(_config2.default.site, x.attr('href').value())
    };
  });
};

//const latest = osm => resolveArray(resolveLatest(osm));
//latest from http://mangafox.me/releases
var latest = function latest(doc) {
  var xpath = '//a[@class=\'chaptersrec\']';
  return doc.find(xpath).map(function (x) {
    return {
      name: x.text(),
      src: _url2.default.resolve(_config2.default.site, x.attr('href').value())
    };
  });
};

//const mangaInfo = osm => resolveObject(resolveMangaInfo(osm));
//info from http://mangafox.me/manga/**
var mangaInfo = function mangaInfo(doc) {
  var image = doc.get('//div[@id=\'mangaimg\']/img').attr('src').value();
  var title = doc.get('//h2[@class=\'aname\']').text();
  var synonyms = doc.get('//div[@id=\'mangaproperties\']/table/tr[2]/td[2]').text().split(', ');
  var released = doc.get('//div[@id=\'mangaproperties\']/table/tr[3]/td[2]').text();
  var status = doc.get('//div[@id=\'mangaproperties\']/table/tr[4]/td[2]').text();
  var authors = [doc.get('//div[@id=\'mangaproperties\']/table/tr[5]/td[2]').text()];
  var artists = [doc.get('//div[@id=\'mangaproperties\']/table/tr[6]/td[2]').text()];
  var genres = doc.find('//span[@class=\'genretags\']').map(function (x) {
    return x.text();
  });
  var synopsis = doc.get('//div[@id=\'readmangasum\']/p').text();

  var direction = doc.get('//div[@id=\'mangaproperties\']/table/tr[7]/td[2]').text();

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

//const image = osm => resolveObject(resolveImage(osm));
//images from chapter
var image = function image(html) {
  var __img__ = /src="[^"]*" alt/gmi;

  return html.match(__img__)[0].slice(5, -5).replace(/.v=\d+/, '');
};

//const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
var imagesPaths = function imagesPaths(doc) {
  var xpath = '//select[@id=\'pageMenu\']/option/@value';
  return doc.find(xpath).map(function (x) {
    return _url2.default.resolve(_config2.default.site, x.value());
  });
};

//const chapters = osm => resolveArray(resolveChapters(osm));
var chapters = function chapters(doc) {
  var xpath = '//table[@id=\'listing\']/tr[position()> 1]';
  return doc.find(xpath).map(function (x) {
    return {
      number: x.get('td/a').text().trim(),
      name: x.get('td/a/following-sibling::text()').text().slice(3) || x.text(),
      src: x.get('td/a').attr('href').value()
    };
  });
};

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
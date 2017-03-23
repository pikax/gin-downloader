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

var verbose = require('debug')('gin-downloader:mangafox:verbose');

//mangas from http://mangafox.me/manga
var mangas = function mangas(doc) {
  var xpath = '//div[@class=\'manga_list\']/ul/li/a';
  return doc.find(xpath).map(function (x) {
    return {
      name: x.text(),
      src: x.attr('href').value() };
  });
};

//const latest = osm => resolveArray(resolveLatest(osm));
//latest from http://mangafox.me/releases
var latest = function latest(doc) {
  var xpath = '//dt/span/a[@class=\'chapter\']';
  return doc.find(xpath).map(function (x) {
    return {
      name: x.text(),
      src: x.attr('href').value(),
      volume: x.get('following-sibling::text()')
    };
  });
};

//const mangaInfo = osm => resolveObject(resolveMangaInfo(osm));
//info from http://mangafox.me/manga/**
var mangaInfo = function mangaInfo(doc) {
  var image = doc.get('//div[@class=\'cover\']/img').attr('src').value();
  var title = doc.get('//div[@class=\'cover\']/img').attr('alt').value();
  var synonyms = doc.get('//div[@id=\'title\']/h3').text().split('; ');
  var released = doc.get('//div[@id=\'title\']/table/tr[2]/td[1]/a').text();
  var authors = [doc.get('//div[@id=\'title\']/table/tr[2]/td[2]/a').text()];
  var artists = [doc.get('//div[@id=\'title\']/table/tr[2]/td[3]/a').text()];
  var genres = doc.find('//div[@id=\'title\']/table/tr[2]/td[4]/a').map(function (x) {
    return x.text();
  });
  var synopsis = doc.get('//div[@id=\'title\']/p').text();
  var status = doc.get('//div[@id=\'series_info\']/div[@class=\'data\'][1]/span/text()[1]').text().trim().slice(0, -1);
  var ranked = doc.get('//div[@id=\'series_info\']/div[@class=\'data\'][2]/span').text();
  var rating = doc.get('//div[@id=\'series_info\']/div[@class=\'data\'][3]/span').text();
  var scanlators = doc.find('//div[@id=\'series_info\']/div[@class=\'data\'][4]/span/a').map(function (x) {
    return x.text();
  });

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

//const image = osm => resolveObject(resolveImage(osm));
//images from chapter
var image = function image(html) {
  var __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
  var __img__ = /src=".*\?token[^"]*/gmi;

  verbose('getting image from \n%s', html);

  var m = html.match(__imgID__);
  if (!m || m.length === 0) throw new Error('Image not found');
  m = m[0].match(__img__);
  if (!m || m.length === 0) throw new Error('Image not found');

  return m[0].slice(5);
};

//const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
var imagesPaths = function imagesPaths(doc) {
  var xpath = '//form[@id=\'top_bar\']/div/div[@class=\'l\']/select/option[position()< last()]';
  return doc.find(xpath).map(function (x) {
    return _url2.default.resolve(_config2.default.site, x + '.html');
  });
};

//const chapters = osm => resolveArray(resolveChapters(osm));
var chapters = function chapters(doc) {
  var xpath = '//div[@id=\'chapters\']/ul/li/div//a[@class=\'tips\']';

  return doc.find(xpath).map(function (x) {
    return {
      number: x.text(),
      src: x.attr('href').value(),
      volume: x.get('following-sibling::text()').text()
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
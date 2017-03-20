'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finder = exports.parser = exports.resolver = undefined;

var _helper = require('../common/helper');

//mangas from http://www.mangahere.co/mangalist/
var findMangas = function findMangas(osm) {
  return osm.find('//a[@class=\'manga_info\']');
};

//chapters from http://www.mangahere.co/manga/**
/**
 * Created by rodriguesc on 03/03/2017.
 */

var findChapters = function findChapters(osm) {
  return osm.find('div.detail_list > ul[1] > li > span.left');
};
var parseChapters = function parseChapters(osm) {
  return osm.set({
    'date': 'following-sibling::span/text()',
    'url': 'a@href',
    'name': 'span/following-sibling::text()',
    'number': 'a'
  });
};
var resolveChapters = function resolveChapters(osm) {
  return parseChapters(findChapters(osm));
};

//info from http://www.mangahere.co/manga/**
var findSeriesInfo = function findSeriesInfo(osm) {
  return osm.select('.mr316');
};
var parseSeriesInfo = function parseSeriesInfo(osm) {
  return osm.set({
    image: 'img.img@src'
  });
};
var resolveSeriesInfo = function resolveSeriesInfo(osm) {
  return parseSeriesInfo(findSeriesInfo(osm));
};

//const findTitle = osm => osm.find('#title > h3');
//const parseTitle = osm => osm.set('csv_title');
//const resolveTitle = osm => parseTitle(findTitle(osm));


var findInfo = function findInfo(osm) {
  return osm.find('ul.detail_topText');
};
var parseInfo = function parseInfo(osm) {
  return osm.set({
    csv_title: 'li[3]/label/following-sibling::text()',
    genres: 'li[4]/label/following-sibling::text()',
    authors: ['li[5] > a'],
    artists: ['li[6] > a'],

    status: 'li[7]/a/preceding-sibling::text()',

    summary: 'li[11]/p[2]/text()'

  });
};
var resolveInfo = function resolveInfo(osm) {
  return parseInfo(findInfo(osm));
};

var resolveMangaInfo = function resolveMangaInfo(osm) {
  return resolveInfo(resolveSeriesInfo(osm));
};

//latest from http://www.mangahere.co/latest/
var findLatest = function findLatest(osm) {
  return osm.find('div.manga_updates > dl > dd > a');
};
var parseLatest = function parseLatest(osm) {
  return osm.set({
    chapter: 'text()',
    uri: '@href'
  });
};
var resolveLatest = function resolveLatest(osm) {
  return parseLatest(findLatest(osm));
};

//images paths from chapter
var findImagesPath = function findImagesPath(osm) {
  return osm.find('//section[@class=\'readpage_top\']/div[@class=\'go_page clearfix\']/span[@class=\'right\']/select[@class=\'wid60\']/option/@value');
};
var parseImagesPath = function parseImagesPath(osm) {
  return osm.set('path');
};
var resolveImagesPaths = function resolveImagesPaths(osm) {
  return parseImagesPath(findImagesPath(osm));
};

//images from chapter
var findImage = function findImage(osm) {
  return osm.find('img#image@src');
};
var parseImage = function parseImage(osm) {
  return osm.set('src');
};
var resolveImage = function resolveImage(osm) {
  return parseImage(findImage(osm));
};

var mangas = function mangas(osm) {
  var result = findMangas(osm).map(function (x) {
    return {
      name: x.text(),
      src: x.attr('href').value()
    };
  });
  return Promise.resolve(result);
};
var image = function image(osm) {
  return (0, _helper.resolveObject)(resolveImage(osm));
};
var imagesPaths = function imagesPaths(osm) {
  return (0, _helper.resolveArray)(resolveImagesPaths(osm));
};
var latest = function latest(osm) {
  return (0, _helper.resolveArray)(resolveLatest(osm));
};
var chapters = function chapters(osm) {
  return (0, _helper.resolveArray)(resolveChapters(osm));
};
var mangaInfo = function mangaInfo(osm) {
  return (0, _helper.resolveObject)(resolveMangaInfo(osm));
};

//const images = osm => osm;


var exp = {
  image: image,
  imagesPaths: imagesPaths,
  latest: latest,
  mangas: mangas,
  chapters: chapters,
  mangaInfo: mangaInfo
};

exports.default = exp;
var resolver = exports.resolver = {
  resolveImage: resolveImage,
  resolveImagesPaths: resolveImagesPaths,
  resolveLatest: resolveLatest,
  resolveChapters: resolveChapters,
  resolveMangaInfo: resolveMangaInfo
};

var parser = exports.parser = {
  parseChapters: parseChapters,
  parseSeriesInfo: parseSeriesInfo,
  parseLatest: parseLatest,
  parseImagesPath: parseImagesPath,
  parseImage: parseImage
};

var finder = exports.finder = {
  findMangas: findMangas,
  findChapters: findChapters,
  findSeriesInfo: findSeriesInfo,
  findImage: findImage,
  findImagesPath: findImagesPath,
  findLatest: findLatest
};
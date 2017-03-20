'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finder = exports.parser = exports.resolver = undefined;

var _helper = require('../common/helper');

//mangas from http://mangafox.me/manga
var findMangas = function findMangas(osm) {
  return osm.find('a.series_preview');
}; /**
    * Created by rodriguesc on 03/03/2017.
    */

var parseMangas = function parseMangas(osm) {
  return osm.set('name').set('src', '@href');
};
var resolveMangas = function resolveMangas(osm) {
  return parseMangas(findMangas(osm));
};

//chapters from http://mangafox.me/manga/**
var findChapters = function findChapters(osm) {
  return osm.select('div#chapters').find('ul.chlist > li div');
};
var parseChapters = function parseChapters(osm) {
  return osm.set({
    'date': '.date',
    'src': 'a.tips@href',
    'name': 'span.title',
    'number': 'a.tips',
    'volume': 'ancestor::ul/preceding-sibling::div.slide[1] > h3.volume'
  });
};
var resolveChapters = function resolveChapters(osm) {
  return parseChapters(findChapters(osm));
};

//info from http://mangafox.me/manga/**

var findSeriesInfo = function findSeriesInfo(osm) {
  return osm.select('#series_info');
};
var parseSeriesInfo = function parseSeriesInfo(osm) {
  return osm.set({
    image: '.cover img@src',
    title: '.cover img@alt'
  });
};
var resolveSeriesInfo = function resolveSeriesInfo(osm) {
  return parseSeriesInfo(findSeriesInfo(osm));
};

var findTitle = function findTitle(osm) {
  return osm.find('#title > h3');
};
var parseTitle = function parseTitle(osm) {
  return osm.set('csv_title');
};
var resolveTitle = function resolveTitle(osm) {
  return parseTitle(findTitle(osm));
};

var findInfo = function findInfo(osm) {
  return osm.find('table > tr[2]');
};
var parseInfo = function parseInfo(osm) {
  return osm.set({
    released: 'td > a',
    authors: ['td[2] > a'],
    artists: ['td[3] > a'],
    genres: ['td[4] > a']
  });
};
var resolveInfo = function resolveInfo(osm) {
  return parseInfo(findInfo(osm));
};

var resolveMangaInfo = function resolveMangaInfo(osm) {
  return resolveInfo(resolveTitle(resolveSeriesInfo(osm)));
};

//latest from http://mangafox.me/releases
var findLatest = function findLatest(osm) {
  return osm.find('a.chapter');
};
var parseLatest = function parseLatest(osm) {
  return osm.set({
    chapter: 'text()',
    src: '@href',

    volume: 'following-sibling::text()'
  });
};
var resolveLatest = function resolveLatest(osm) {
  return parseLatest(findLatest(osm));
};

//images paths from chapter
var findImagesPath = function findImagesPath(osm) {
  return osm.find('//form[@id=\'top_bar\']/div/div[@class=\'l\']/select/option[position()< last()]/@value');
};
var parseImagesPath = function parseImagesPath(osm) {
  return osm.set('src');
};
var resolveImagesPaths = function resolveImagesPaths(osm) {
  return parseImagesPath(findImagesPath(osm));
};

//images from chapter
var findImage = function findImage(osm) {
  return osm.find('div.read_img > a > img@src');
};
var parseImage = function parseImage(osm) {
  return osm.set('src');
};
var resolveImage = function resolveImage(osm) {
  return parseImage(findImage(osm));
};

var mangas = function mangas(osm) {
  return (0, _helper.resolveArray)(resolveMangas(osm));
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
  resolveMangas: resolveMangas,
  resolveImage: resolveImage,
  resolveImagesPaths: resolveImagesPaths,
  resolveLatest: resolveLatest,
  resolveChapters: resolveChapters,
  resolveMangaInfo: resolveMangaInfo
};

var parser = exports.parser = {
  parseMangas: parseMangas,
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
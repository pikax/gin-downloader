'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parser = exports.resolver = undefined;

var _helper = require('../common/helper');

//mangas from http://mangafox.me/alphabetical
var findMangas = function findMangas(osm) {
  return osm.find('ul.series_alpha > li > a');
}; /**
    * Created by rodriguesc on 05/03/2017.
    */

var parseMangas = function parseMangas(osm) {
  return osm.set('name').set('src', '@href');
};
var resolveMangas = function resolveMangas(osm) {
  return parseMangas(findMangas(osm));
};

//chapters from http://mangafox.me/manga/**
var findChapters = function findChapters(osm) {
  return osm.find('table#listing tr[position()> 1]');
};
var parseChapters = function parseChapters(osm) {
  return osm.set({
    chapter: 'a',
    uri: 'a@href',
    name: 'td/a/following-sibling::text()',
    date: 'td[2]'
  });
};
var resolveChapters = function resolveChapters(osm) {
  return parseChapters(findChapters(osm));
};

//info from http://mangafox.me/manga/**
var findMangaImage = function findMangaImage(osm) {
  return osm.find('#bodyust');
};
var parseMangaImage = function parseMangaImage(osm) {
  return osm.set({
    image: 'div#mangaimg img@src'
  });
};
var resolveMangaImage = function resolveMangaImage(osm) {
  return parseMangaImage(findMangaImage(osm));
};

var findInfo = function findInfo(osm) {
  return osm.find('div#mangaproperties > table');
};
var parseInfo = function parseInfo(osm) {
  return osm.set({
    title: 'tr > td[2] > h2.aname',

    csv_title: 'tr[2] td[2]',

    released: 'tr[3] td[2]',
    status: 'tr[4] td[2]',

    author: 'tr[5] td[2]',
    artist: 'tr[6] td[2]',

    genres: ['span.genretags']
  });
};
var resolveInfo = function resolveInfo(osm) {
  return parseInfo(findInfo(osm));
};

var resolveMangaInfo = function resolveMangaInfo(osm) {
  return resolveInfo(resolveMangaImage(osm));
};

//latest from http://mangapanda.com/latest
var findLatest = function findLatest(osm) {
  return osm.find('a.chapter');
};
var parseLatest = function parseLatest(osm) {
  return osm.set({
    chapter: 'text()',
    uri: '@href',

    volume: 'following-sibling::text()'
  });
};
var resolveLatest = function resolveLatest(osm) {
  return parseLatest(findLatest(osm));
};

//images from chapter
var findImage = function findImage(osm) {
  return osm.find('div#imgholder > a > img@src');
};
var parseImage = function parseImage(osm) {
  return osm.set('src');
};
var resolveImage = function resolveImage(osm) {
  return parseImage(findImage(osm));
};

//images paths from chapter
var findImagesPaths = function findImagesPaths(osm) {
  return osm.find('#pageMenu > option');
};
var parseImagesPaths = function parseImagesPaths(osm) {
  return osm.set('path');
};
var resolveImagesPaths = function resolveImagesPaths(osm) {
  return parseImagesPaths(findImagesPaths(osm));
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
  resolveImagesPaths: resolveImagesPaths,
  resolveLatest: resolveLatest,
  resolveImage: resolveImage,
  resolveChapters: resolveChapters,
  resolveMangaInfo: resolveMangaInfo
};

var parser = exports.parser = {
  parseMangas: parseMangas,
  parseImagesPaths: parseImagesPaths,
  parseLatest: parseLatest,
  parseImage: parseImage,
  parseChapters: parseChapters
};
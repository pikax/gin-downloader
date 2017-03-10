/**
 * Created by rodriguesc on 03/03/2017.
 */

import {resolveArray, resolveObject} from '../common/helper';


//mangas from http://mangafox.me/manga
const findMangas = (osm) => osm.find('a.series_preview');
const parseMangas = (osm) => osm.set('title');
const resolveMangas = (osm) => parseMangas(findMangas(osm));

//chapters from http://mangafox.me/manga/**
const findChapters = osm => osm.select('div#chapters')
  .find('ul.chlist > li div');
const parseChapters = osm => osm
  .set({
    volume: 'ancestor::ul/preceding-sibling::div.slide[1] > h3.volume',
    chapter: {
      'date': '.date',
      'url': 'a.tips@href',
      'name': 'span.title',
      'number': 'a.tips',
    }
  });
const resolveChapters = osm => parseChapters(findChapters(osm));


//info from http://mangafox.me/manga/**

const findSeriesInfo = osm => osm.select('#series_info');
const parseSeriesInfo = osm => osm.set({
  image: '.cover img@src',
  title: '.cover img@alt',
});
const resolveSeriesInfo = osm => parseSeriesInfo(findSeriesInfo(osm));


const findTitle = osm => osm.find('#title > h3');
const parseTitle = osm => osm.set('csv_title');
const resolveTitle = osm => parseTitle(findTitle(osm));


const findInfo = osm => osm.find('table > tr[2]');
const parseInfo = osm => osm.set({
  released: 'td > a',
  authors: ['td[2] > a'],
  artists: ['td[3] > a'],
  genres: ['td[4] > a'],
});
const resolveInfo = osm => parseInfo(findInfo(osm));

const resolveMangaInfo = osm => resolveInfo(resolveTitle(resolveSeriesInfo(osm)));


//latest from http://mangafox.me/releases
const findLatest = osm => osm.find('a.chapter');
const parseLatest = osm => osm
  .set({
    chapter: 'text()',
    uri: '@href',

    volume: 'following-sibling::text()',
  });
const resolveLatest = osm => parseLatest(findLatest(osm));



//images paths from chapter
const findImagesPath = osm => osm.find('#top_bar > div.r.m > div.l > select.m > option:not(:last-child)@value');
const parseImagesPath = osm => osm.set('path');
const resolveImagesPaths = osm => parseImagesPath(findImagesPath(osm));


//images from chapter
const findImage = osm => osm.find('div.read_img > a > img@src');
const parseImage = osm => osm.set('src');
const resolveImage = osm => parseImage(findImage(osm));



const mangas = osm => resolveArray(resolveMangas(osm));
const image = osm => resolveObject(resolveImage(osm));
const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
const latest = osm => resolveArray(resolveLatest(osm));
const title = osm => resolveObject(resolveTitle(osm));
const chapters = osm => resolveArray(resolveChapters(osm));
const mangaInfo = osm => resolveObject(resolveMangaInfo(osm));
const info = osm => resolveObject(resolveInfo(osm));


//const images = osm => osm;


const exp = {
  image,
  imagesPaths,
  latest,
  title,
  mangas,
  chapters,
  mangaInfo,

  info,
};

export default exp;


export const resolver = {
  resolveMangas,
  resolveImage,
  resolveImagesPaths,
  resolveLatest,
  resolveTitle,
  resolveChapters,
  resolveMangaInfo,
  resolveInfo,
};

export const parser = {
  parseMangas,
  parseChapters,
  parseSeriesInfo,
  parseTitle,
  parseInfo,
  parseLatest,
  parseImagesPath,
  parseImage,
};


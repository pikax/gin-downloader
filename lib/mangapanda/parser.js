/**
 * Created by rodriguesc on 05/03/2017.
 */

import {resolveArray, resolveObject} from '../common/helper';


//mangas from http://mangafox.me/alphabetical
const findMangas = (osm) => osm.find('ul.series_alpha > li > a');
const parseMangas = (osm) => osm.set('title');
const resolveMangas = osm => parseMangas(findMangas(osm));


//chapters from http://mangafox.me/manga/**
const findChapters = osm => osm
    .find('table#listing tr[position()> 1]');
const parseChapters = osm => osm
		.set({
  chapter : 'a',
  uri  : 'a@href',
  name : 'td/a/following-sibling::text()',
  date : 'td[2]'
});
const resolveChapters = osm => parseChapters(findChapters(osm));


//info from http://mangafox.me/manga/**
const findMangaImage = osm => osm.find('#bodyust');
const parseMangaImage = osm => osm.set({
  image: 'div#mangaimg img@src',
});
const resolveMangaImage = osm => parseMangaImage(findMangaImage(osm));


const findInfo = osm => osm.find('div#mangaproperties > table');
const parseInfo = osm => osm.set({
  title  : 'tr > td[2] > h2.aname',

  csv_title : 'tr[2] td[2]',

  released : 'tr[3] td[2]',
  status  :'tr[4] td[2]',

  author : 'tr[5] td[2]',
  artist : 'tr[6] td[2]',

  genres : ['span.genretags'],
});
const resolveInfo = osm => parseInfo(findInfo(osm));

const resolveMangaInfo = osm => resolveInfo(resolveMangaImage(osm));


//latest from http://mangapanda.com/latest
const findLatest = osm => osm.find('a.chapter');
const parseLatest = osm => osm
	.set({
  chapter : 'text()',
  uri : '@href',

  volume : 'following-sibling::text()',
});
const resolveLatest = osm => parseLatest(findLatest(osm));


//images from chapter
const findImage = osm => osm.find('div#imgholder > a > img@src');
const parseImage = osm => osm.set('src');
const resolveImage = osm => parseImage(findImage(osm));


//images paths from chapter
const findImagesPaths = osm => osm.find('#pageMenu > option');
const parseImagesPaths = osm=>osm.set('path');
const resolveImagesPaths = osm => parseImagesPaths(findImagesPaths(osm));






const mangas = osm => resolveArray(resolveMangas(osm));
const image = osm => resolveObject(resolveImage(osm));
const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
const latest = osm => resolveArray(resolveLatest(osm));
const mangaImage = osm => resolveObject(resolveMangaImage(osm));
const chapters = osm => resolveArray(resolveChapters(osm));
const mangaInfo = osm => resolveObject(resolveMangaInfo(osm));
const info = osm => resolveObject(resolveInfo(osm));



const exp = {
  image,
  imagesPaths,
  latest,
  mangaImage,
  mangas,
  chapters,
  mangaInfo,

  info,
};

export default exp;


export const resolver = {
  resolveMangas,
  resolveMangaImage,
  resolveImagesPaths,
  resolveLatest,
  resolveImage,
  resolveChapters,
  resolveMangaInfo,
  resolveInfo,
};

export const parser = {
  parseMangas,
  parseMangaImage,
  parseImagesPaths,
  parseLatest,
  parseImage,
  parseChapters,

  parseInfo,
};

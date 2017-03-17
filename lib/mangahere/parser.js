/**
 * Created by rodriguesc on 03/03/2017.
 */

import {resolveArray, resolveObject} from '../common/helper';


//mangas from http://www.mangahere.co/mangalist/
const findMangas = (osm) => osm.find('//a[@class=\'manga_info\']');

//chapters from http://www.mangahere.co/manga/**
const findChapters = osm => osm
  .find('div.detail_list > ul[1] > li > span.left');
const parseChapters = osm => osm
  .set({
    'date': 'following-sibling::span/text()',
    'url': 'a@href',
    'name': 'span/following-sibling::text()',
    'number': 'a',
  });
const resolveChapters = osm => parseChapters(findChapters(osm));


//info from http://www.mangahere.co/manga/**
const findSeriesInfo = osm => osm.select('.mr316');
const parseSeriesInfo = osm => osm.set({
  image: 'img.img@src',
});
const resolveSeriesInfo = osm => parseSeriesInfo(findSeriesInfo(osm));


//const findTitle = osm => osm.find('#title > h3');
//const parseTitle = osm => osm.set('csv_title');
//const resolveTitle = osm => parseTitle(findTitle(osm));


const findInfo = osm => osm.find('ul.detail_topText');
const parseInfo = osm => osm.set({
  csv_title : 'li[3]/label/following-sibling::text()',
  genres: 'li[4]/label/following-sibling::text()',
  authors: ['li[5] > a'],
  artists: ['li[6] > a'],

  status: 'li[7]/a/preceding-sibling::text()',

  summary: 'li[11]/p[2]/text()',

});
const resolveInfo = osm => parseInfo(findInfo(osm));

const resolveMangaInfo = osm => resolveInfo(resolveSeriesInfo(osm));


//latest from http://www.mangahere.co/latest/
const findLatest = osm => osm.find('div.manga_updates > dl > dd > a');
const parseLatest = osm => osm
  .set({
    chapter: 'text()',
    uri: '@href',
  });
const resolveLatest = osm => parseLatest(findLatest(osm));



//images paths from chapter
const findImagesPath = osm => osm.find('//section[@class=\'readpage_top\']/div[@class=\'go_page clearfix\']/span[@class=\'right\']/select[@class=\'wid60\']/option/@value');
const parseImagesPath = osm => osm.set('path');
const resolveImagesPaths = osm => parseImagesPath(findImagesPath(osm));


//images from chapter
const findImage = osm => osm.find('img#image@src');
const parseImage = osm => osm.set('src');
const resolveImage = osm => parseImage(findImage(osm));



const mangas = osm => {
  let result = findMangas(osm)
    .map(x=>{
      return {
        name : x.text(),
        src : x.attr('href').value()
      };
    });
  return Promise.resolve(result);
};
const image = osm => resolveObject(resolveImage(osm));
const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
const latest = osm => resolveArray(resolveLatest(osm));
const chapters = osm => resolveArray(resolveChapters(osm));
const mangaInfo = osm => resolveObject(resolveMangaInfo(osm));


//const images = osm => osm;


const exp = {
  image,
  imagesPaths,
  latest,
  mangas,
  chapters,
  mangaInfo,
};

export default exp;


export const resolver = {
  resolveImage,
  resolveImagesPaths,
  resolveLatest,
  resolveChapters,
  resolveMangaInfo,
};

export const parser = {
  parseChapters,
  parseSeriesInfo,
  parseLatest,
  parseImagesPath,
  parseImage,
};


export const finder ={
  findMangas,
  findChapters,
  findSeriesInfo,
  findImage,
  findImagesPath,
  findLatest,
};

/**
 * Created by rodriguesc on 03/03/2017.
 */

import {resolveArray, resolveObject} from '../common/helper';
import config from './config';


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
    src: '@href',
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
//const latest = osm => resolveArray(resolveLatest(osm));
//latest from http://mangafox.me/releases
const latest = doc => {
  const xpath = '//div[@class=\'manga_update\']/dl/dd/a';
  return doc.find(xpath).map(x=>{
    return {
      name: x.text(),
      src:x.attr('href').value(),
    };
  });
};

//const mangaInfo = osm => resolveObject(resolveMangaInfo(osm));
//info from http://mangafox.me/manga/**
const mangaInfo = doc=>{
  let image = doc.get('//img[@class=\'img\']').attr('src').value();
  let title = doc.get('//div[@class=\'title\']/h3').text().slice(5, -7);
  let synonyms = doc.get('//ul[@class=\'detail_topText\']/li[3]/text()').text().split('; ');
  let released = doc.get('//div[@id=\'title\']/table/tr[2]/td[1]/a').text();
  let authors = [doc.get('//ul[@class=\'detail_topText\']/li[5]/a[@class=\'color_0077\']').text()];
  let artists = [doc.get('//ul[@class=\'detail_topText\']/li[6]/a[@class=\'color_0077\']').text()];
  let genres = doc.get('//ul[@class=\'detail_topText\']/li[4]/text()').text().split(', ');
  let synopsis = doc.get('//ul[@class=\'detail_topText\']/li/p[last()]/text()').text();
  let status = doc.get('//ul[@class=\'detail_topText\']/li[7]/text()[1]').text().trim();
  let ranked = doc.get('//ul[@class=\'detail_topText\']/li[8]/text()[1]').text();
  let rating = doc.get('//ul[@class=\'detail_topText\']/li[@id=\'rate\']/span[@id=\'current_rating\']').text();
  let similarmanga = doc.find('//div[@class=\'box_radius mb10\'][2]/ul[@class=\'right_aside\']/li/a').map(x=>x.attr('title').value());


  return {
    image,
    title,
    synonyms,
    released,
    authors,
    artists,
    genres,
    synopsis,
    status,
    ranked,
    rating,
    similarmanga
  };
};


//const image = osm => resolveObject(resolveImage(osm));
//images from chapter
const image = html =>{
  const __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
  const __img__ = /src=".*\?token[^"]*/gmi;

  return html.match(__imgID__)[0].match(__img__).slice(0,5);
};


//const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
const imagesPaths = doc =>{
  const xpath = '//section[@class=\'readpage_top\']/div[@class=\'go_page clearfix\']/span[@class=\'right\']/select[@class=\'wid60\']/option/@value';
  return doc.find(xpath)
    .map(x=>url.resolve(config.site,x));
};

//const chapters = osm => resolveArray(resolveChapters(osm));
const chapters = doc=>{
  const xpath = `//span[@class='left']/a`;

  return doc.find(xpath)
    .map(x=>{
      return {
        number : x.text(),
        name : x.get('following-sibling::span/following-sibling::text()') || x.text(),
        src :x.attr('href').value(),
      };
    });
};


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

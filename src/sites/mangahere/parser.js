/**
 * Created by rodriguesc on 03/03/2017.
 */

import url from 'url';

import config from './config'


const mangas = doc => {
  const xpath= '//a[@class=\'manga_info\']';
  return doc.find(xpath)
    .map(x=>{
      return {
        name : x.text(),
        src : x.attr('href').value()
      };
    });
};
//const latest = osm => resolveArray(resolveLatest(osm));
//latest from http://mangafox.me/releases
const latest = doc => {
  const xpath = '//div[@class=\'manga_updates\']/dl/dd/a';
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

  return html.match(__imgID__)[0].match(__img__)[0].slice(5);
};


//const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
const imagesPaths = doc =>{
  const xpath = '//section[@class=\'readpage_top\']/div[@class=\'go_page clearfix\']/span[@class=\'right\']/select[@class=\'wid60\']/option/@value';
  return doc.find(xpath)
    .map(x=>url.resolve(config.site,x.value()));
};

//const chapters = osm => resolveArray(resolveChapters(osm));
const chapters = doc=>{
  const xpath = `//span[@class='left']/a`;

  return doc.find(xpath)
    .map(x=>{
      return {
        number : x.text().trim(),
        name : x.get('following-sibling::span/following-sibling::text()') || x.text(),
        src :x.attr('href').value(),
      };
    });
};


//const images = osm => osm;


const exp = {
  config,

  image,
  imagesPaths,
  latest,
  mangas,
  chapters,
  mangaInfo,
};

export default exp;

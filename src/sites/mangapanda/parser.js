/**
 * Created by rodriguesc on 05/03/2017.
 */

import url from 'url';

import config from './config';



const mangas = doc => {
  const xpath = '//ul[@class=\'series_alpha\']/li/a';
  return doc.find(xpath)
    .map(x=>{
      return {
        name : x.text(),
        src :  url.resolve(config.site,  x.attr('href').value())
      };
    });
};

//const latest = osm => resolveArray(resolveLatest(osm));
//latest from http://mangafox.me/releases
const latest = doc => {
  const xpath = '//a[@class=\'chaptersrec\']';
  return doc.find(xpath).map(x=>{
    return {
      name: x.text(),
      src: url.resolve(config.site, x.attr('href').value())
    };
  });
};

//const mangaInfo = osm => resolveObject(resolveMangaInfo(osm));
//info from http://mangafox.me/manga/**
const mangaInfo = doc=>{
  let image = doc.get('//div[@id=\'mangaimg\']/img').attr('src').value();
  let title = doc.get('//h2[@class=\'aname\']').text();
  let synonyms = doc.get('//div[@id=\'mangaproperties\']/table/tr[2]/td[2]').text().split(', ');
  let released = doc.get('//div[@id=\'mangaproperties\']/table/tr[3]/td[2]').text();
  let status = doc.get('//div[@id=\'mangaproperties\']/table/tr[4]/td[2]').text();
  let authors = [doc.get('//div[@id=\'mangaproperties\']/table/tr[5]/td[2]').text()];
  let artists = [doc.get('//div[@id=\'mangaproperties\']/table/tr[6]/td[2]').text()];
  let genres = doc.find('//span[@class=\'genretags\']').map(x=>x.text());
  let synopsis = doc.get('//div[@id=\'readmangasum\']/p').text();

  let direction = doc.get('//div[@id=\'mangaproperties\']/table/tr[7]/td[2]').text();

  return {
    image,
    title,
    synonyms,
    released,
    status,
    authors,
    artists,
    genres,
    synopsis,
    direction
  };
};


//const image = osm => resolveObject(resolveImage(osm));
//images from chapter
const image = html =>{
  const __img__ = /src="[^"]*" alt/gmi;

  return html.match(__img__)[0].slice(5, -5).replace(/.v=\d+/,'');
};


//const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
const imagesPaths = doc =>{
  const xpath = '//select[@id=\'pageMenu\']/option/@value';
  return doc.find(xpath)
    .map(x=>url.resolve(config.site,x.value()));
};



//const chapters = osm => resolveArray(resolveChapters(osm));
const chapters = doc=>{
  const xpath = '//table[@id=\'listing\']/tr[position()> 1]';
  return doc.find(xpath)
    .map(x=>{
      return {
        number : x.get('td/a').text().trim(),
        name : x.get('td/a/following-sibling::text()').text().slice(3) || x.text(),
        src :x.get('td/a').attr('href').value(),
      };
    });
};


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


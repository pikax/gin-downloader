/**
 * Created by rodriguesc on 03/03/2017.
 */

import url from 'url';

import config from './config';



//mangas from http://mangafox.me/manga
const mangas = doc =>{
  const xpath = '//div[@class=\'manga_list\']/ul/li/a';
  return doc.find(xpath).map(x=>{
    return {
      name: x.text(),
      src:x.attr('href').value()};
  });
};

//const latest = osm => resolveArray(resolveLatest(osm));
//latest from http://mangafox.me/releases
const latest = doc => {
  const xpath = '//dt/span/a[@class=\'chapter\']';
  return doc.find(xpath).map(x=>{
    return {
      name: x.text(),
      src:x.attr('href').value(),
      volume: x.get('following-sibling::text()')
    };
  });
};

//const mangaInfo = osm => resolveObject(resolveMangaInfo(osm));
//info from http://mangafox.me/manga/**
const mangaInfo = doc=>{
  let image = doc.get('//div[@class=\'cover\']/img').attr('src').value();
  let title = doc.get('//div[@class=\'cover\']/img').attr('alt').value();
  let synonyms = doc.get('//div[@id=\'title\']/h3').text().split('; ');
  let released = doc.get('//div[@id=\'title\']/table/tr[2]/td[1]/a').text();
  let authors = [doc.get('//div[@id=\'title\']/table/tr[2]/td[2]/a').text()];
  let artists = [doc.get('//div[@id=\'title\']/table/tr[2]/td[3]/a').text()];
  let genres = doc.find('//div[@id=\'title\']/table/tr[2]/td[4]/a').map(x=>x.text());
  let synopsis = doc.get('//div[@id=\'title\']/p').text();
  let status = doc.get('//div[@id=\'series_info\']/div[@class=\'data\'][1]/span/text()[1]').text().trim().slice(0,-1);
  let ranked = doc.get('//div[@id=\'series_info\']/div[@class=\'data\'][2]/span').text();
  let rating = doc.get('//div[@id=\'series_info\']/div[@class=\'data\'][3]/span').text();
  let scanlators = doc.find('//div[@id=\'series_info\']/div[@class=\'data\'][4]/span/a').map(x=>x.text());

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
    scanlators
  }
};


//const image = osm => resolveObject(resolveImage(osm));
//images from chapter
const image = html =>{
  const __imgID__ = /src=".*\?token[^"]*".*id=/gmi;
  const __img__ = /src=".*\?token[^"]*/gmi;

  return html.match(__imgID__)[0].match(__img__).slice(5);
};


//const imagesPaths = osm => resolveArray(resolveImagesPaths(osm));
const imagesPaths = doc =>{
  const xpath = '//form[@id=\'top_bar\']/div/div[@class=\'l\']/select/option[position()< last()]';
  return doc.find(xpath)
    .map(x=>url.resolve(config.site,x + '.html'));
}

//const chapters = osm => resolveArray(resolveChapters(osm));
const chapters = doc=>{
  const xpath = '//div[@id=\'chapters\']/ul/li/div//a[@class=\'tips\']';

  return doc.find(xpath)
    .map(x=>{
      return {
        number : x.text(),
        src :x.attr('href').value(),
        volume: x.get('following-sibling::text()').text()
      };
    });
};


const exp = {
  image,
  imagesPaths,
  latest,
  mangas,
  chapters,
  mangaInfo,
};

export default exp;

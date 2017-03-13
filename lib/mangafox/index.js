/**
 * Created by rodriguesc on 03/03/2017.
 */

import osmosis from 'osmosis';

import uri from 'url';

import _ from 'lodash';



import manga from './parser';
import config from './config';
import {resolver} from './parser';
import {resolveArray} from '../common/helper';
import {getHtml} from '../common/request';


export const NAME = config.name;


const mangas = () => {
  let osm = osmosis.get(config.mangas_url);
  return manga.mangas(osm);
};

const chapters = (url) =>{
  let osm = osmosis.get(url);
  return manga.chapters(osm);
};

const imagesPaths = (url)=>{
  let osm = osmosis.get(url);
  return manga.imagesPaths(osm);
};


const image = (url)=>{
  const __imgID__ = /src=".*\?token[^"]*".*id=/gmi
  const __img__ = /src=".*\?token[^"]*/gmi;

  return getHtml(url,null)
    .then(html=>html.match(__imgID__))
    .then(x=>x[0])
    .then(x=>x.match(__img__))
    .then(x=>x[0].slice(5));
};


const images = (url) => {
  let osm = osmosis.get(url);
  osm = resolver.resolveImagesPaths(osm);

  return resolveArray(osm)
      .then(images=>images.map(x=>uri.resolve(url, x.path+'.html')))
      .then(x=>x.map(t=>image(t)));
};

const resolve = (name, chapter)=>{
  return mangas()
    .then(items=>{
      return _.find(items, {name});
    })
    .then(x=>{
      if(!x || !x.src)
        throw new Error(`${name} not found`);
      return chapters(uri.resolve(config.site, x.src));
    })
    .then(chaps=>{
      return _.find(chaps,{chapter: {number:`${name} ${chapter}`}});
    })
    .then(x=>{
      if(!x)
        throw new Error(`chapter ${chapter} not found`);
      return images(uri.resolve(config.site, x.chapter.url));
    });
};


export default {
  mangas,
  chapters,
  images,
  imagesPaths,
  resolve
};

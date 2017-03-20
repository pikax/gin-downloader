/**
 * Created by rodriguesc on 05/03/2017.
 */
const debug = require('debug')('gin-downloader:mangapanda');
const verbose = require('debug')('gin-downloader:mangapanda:verbose');

import config from './config';
import osmosis from 'osmosis';
import manga from './parser';
import {resolver} from './parser';
import {resolveArray} from '../common/helper';
import _ from 'lodash';
import {getHtml} from '../common/request';

let uri = require('url');



export const NAME = config.name;


const mangas = () => {
  let osm = osmosis.get(config.mangas_url,{tries:20});
  return manga.mangas(osm);
};

const latest= ()=>{
  debug('getting latest');
  let osm = osmosis.get(config.latest_url);
  return manga.latest(osm)
    .tap(x=>debug(`found: ${x.length}`));
};

const chapters = (url) =>{
  let osm = osmosis.get(url);
  return manga.chapters(osm);
};

const info= (url) =>{
  let osm = osmosis.get(url);
  return manga.mangaInfo(osm);
};

const images = (url) => {
  let osm = osmosis.get(url);
  osm = resolver.resolveImagesPaths(osm);

  return resolveArray(osm)
    .then(images=>images.map(x=>uri.resolve(url + '/',x.path)))
    .then(x=>x.map(t=>image(t)));
};

const imagesPaths = (url)=>{
  let osm = osmosis.get(url);
  return manga.imagesPaths(osm);
};

const image = (url)=>{
  const __img__ = /src=".*[^"]*" alt/gmi;
  return getHtml(url)
    .then(html=>html.match(__img__))
    .then(x=>x[0].slice(5,-5));
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
      return _.find(chaps,{chapter: `${name} ${chapter}`});
    })
    .then(x=>{
      if(!x)
        throw new Error( `chapter ${chapter} not found`);
      return images(uri.resolve(config.site, x.uri));
    });
};

export default {
  mangas,
  info,
  chapters,
  images,
  imagesPaths,
  resolve,
  latest
};

/**
 * Created by rodriguesc on 05/03/2017.
 */

import config from './config';
import osmosis from 'osmosis';
import manga from './parser';
import {resolver} from './parser';
import {resolveArray} from '../common/helper';
import _ from 'lodash';

let uri = require('url');
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

const images = (url) => {
  return new Promise((resolve, reject) => {
    let osm = osmosis.get(url);

    osm = resolver.resolveImagesPaths(osm)
      .get((data,ctx)=>{
        return uri.resolve(url + '/',ctx.path);
      });

    osm = resolver.resolveImage(osm);

    return resolveArray(osm)
      .then(resolve)
      .catch(reject);
  });
};

const resolve = (name, chapter)=>{
  return mangas()
    .then(items=>{
      return _.find(items, {name});
    })
    .then(x=>{
      if(!x || !x.src)
        throw `${name} not found`;
      return chapters(uri.resolve(config.site, x.src));
    })
    .then(chaps=>{
      if(!chaps)
        throw 'empty chapters list';
      return _.find(chaps,{chapter: `${name} ${chapter}`});
    })
    .then(x=>{
      if(!x)
        throw `chapter ${chapter} not found`;
      if(!x.uri)
        throw 'unable to parse uri';
      return images(uri.resolve(config.site, x.uri));
    });
};

export default {
  mangas,
  chapters,
  images,
  imagesPaths,
  resolve
};

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
import libxmljs from 'libxmljs';

let uri = require('url');

import {resolveUrl} from './names';


const mangas = () => {
  debug('getting mangas');
  return getHtml(config.mangas_url)
    .tap(x=>verbose(x))
    .tap(()=>debug('got html'))
    .then(x=>libxmljs.parseHtmlString(x))
    .then(manga.mangas)
    .tap(x=>debug(`mangas: ${x.length}`));
};

const latest= ()=>{
  debug('getting latest');
  let osm = osmosis.get(config.latest_url);
  return manga.latest(osm)
    .tap(x=>debug(`found: ${x.length}`));
};

const info= (name) =>{
  debug(`getting info for ${name}`);

  let src = resolveUrl(name);

  debug(`getting info ${src}`);
  let osm = osmosis.get(src);

  return manga.mangaInfo(osm)
    .tap(x=>debug('info: %s',x));
};

const chapters = (name) =>{
  debug(`getting chapters ${name}`);
  let src = resolveUrl(name);

  let osm = osmosis.get(src);
  return manga.chapters(osm)
    .catch(x=>{throw new Error('Chapters not found',x);})
    .tap(x=>debug(`chapters: ${x.length}`));
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
  return chapters(name)
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
  name : config.name,

  mangas,
  info,
  chapters,
  images,
  imagesPaths,
  resolve,
  latest
};

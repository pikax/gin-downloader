/**
 * Created by rodriguesc on 05/03/2017.
 */

const debug = require('debug')('gin-downloader:mangapanda');
const verbose = require('debug')('gin-downloader:mangapanda:verbose');

import url from 'url';

import config from './config';
import manga from './parser';
import {getHtml} from '../common/request';

import {resolveUrl} from './names';
import {getDoc} from '../common/helper';

const mangas = () => {
  debug('getting mangas');
  return getDoc(config.mangas_url)
    .then(manga.mangas)
    .tap(x=>debug(`mangas: ${x.length}`));
};

const latest= ()=>{
  debug('getting latest');
  return getDoc(config.latest_url)
    .then(manga.latest)
    .tap(x=>debug(`found: ${x.length}`));
};

const info= (name) =>{
  debug(`getting info for ${name}`);

  let src = resolveUrl(name);

  debug(`getting info ${src}`);
  return getDoc(src)
    .then(manga.mangaInfo)
    .tap(x=>debug('info: %s',x));
};

const chapters = (name) =>{
  debug(`getting chapters ${name}`);
  let src = resolveUrl(name);

  return getDoc(src)
    .then(manga.chapters)
    .tap(x=>{
      if(!x || x.length === 0)
        throw 'not found';
    })
    .catch(x=>{throw new Error('Chapters not found',x);})
    .tap(x=>debug(`chapters: ${x.length}`));
};

const images = (name, chapter) => {
  debug(`getting images ${name}:${chapter}`);

  let mangaUri = resolveUrl(name);
  //NOTE mangapanda dont add volume to url is a simple {site}/{name}/{chapter}
  let uri = url.resolve(mangaUri + '/', chapter.toString());
  return imagesByUrl(uri);
};

const imagesByUrl = (uri)=>{
  debug(`getting images for ${uri}`);

  return imagesPaths(uri)
    .tap(x=>debug(`images: ${x.length}`))
    .then(x=>x.map(image))
    .tap(x=>debug(`images resolved : ${x}`));
};

const imagesPaths = (uri)=>{
  debug(`getting image paths ${uri}`);
  return getDoc(uri)
    .then(manga.imagesPaths)
    .tap(x=>{
      if(!x || x.length === 0 )
        throw new Error('chapter not found');
    })
    .tap(x=>debug(`found ${x.length} images:\n${x}`));
};

const image = (uri)=>{

  debug(`getting image from ${uri}`);

  return getHtml(uri)
    .tap(x=>verbose('html: %s', x))
    .then(manga.image);

};

const resolve = (name, chapter)=>{
  debug(`resolve ${name}:${chapter}`);

  return images(name,chapter)
    .tap(x=>debug('found %o',x));
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

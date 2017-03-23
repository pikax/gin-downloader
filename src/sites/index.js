/**
 * Created by rodriguesc on 23/03/2017.
 */

import {getDoc} from '../common/helper';
import {getHtml} from '../common/request';


export default class builder {
  constructor(site, config, parser){
    this.debug = require('debug')(`gin-downloader:${config.name}`);
    this.verbose= require('debug')(`gin-downloader:${config.name}:verbose`);

    this.config = config;
    this.site = site;
    this.parser = parser;
  }

  mangas(){
    this.debug('getting mangas');

    return getDoc(this.config.mangas_url)
      .then(this.parser.mangas)
      .tap(x=>this.debug(`mangas: ${x.length}`));
  }

  latest(){
    this.debug('getting latest');
    return getDoc(this.config.latest_url)
      .then(this.manga.latest)
      .tap(x=>this.debug(`found: ${x.length}`));
  }

  info(name) {
    this.debug(`getting info for ${name}`);
    let src = this.resolveUrl(name);

    this. debug(`getting info ${src}`);
    return getDoc(src)
      .then(this.manga.mangaInfo)
      .tap(x=>this.debug('info: %s',x));
  }

  chapters(name){
    this.debug(`getting chapters ${name}`);
    let src = this.resolveUrl(name);

    return getDoc(src)
      .then(this.manga.chapters)
      .tap(x=>{
        if(!x || x.length === 0)
          throw 'not found';
      })
      .catch(x=>{throw new Error('Chapters not found',x);})
      .tap(x=>this.debug(`chapters: ${x.length}`));
  }

  images(name, chapter) {
    this.debug(`getting images ${name}:${chapter}`);

    return this.chapters(name)
      .then(chaps=>{
        return _.find(chaps,{number:`${name} ${chapter}`});
      })
      .then(x=>{
        if(!x)
          throw new Error($`Manga: ${name} chapter ${chapter} doesn't exists.`);
        return x.src;
      })
      .then(imagesByUrl);
  }


}

//helpers
function imagesByUrl(uri){
  this.debug(`getting images for ${uri}`);

  return imagesPaths(uri)
    .tap(x=>this.debug(`images: ${x.length}`))
    .then(x=>x.map(image))
    .tap(x=>this.debug(`images resolved : ${x}`));
}


function imagesPaths(uri){
  this.debug(`getting image paths ${uri}`);
  return getDoc(uri)
    .then(this.manga.imagesPaths)
    .tap(x=>this.debug(`found ${x.length} images:\n${x}`));
}

function image(uri){
  this.debug(`getting image from ${uri}`);
  return getHtml(uri)
    .tap(x=>this.verbose('html: %s', x))
    .then(this.manga.image);

}
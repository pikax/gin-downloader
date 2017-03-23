/**
 * Created by rodriguesc on 23/03/2017.
 */

import {getDoc} from '../common/helper';
import {getHtml} from '../common/request';
import  find from 'lodash/find';

function   mangas(){
    this.debug('getting mangas');

    return getDoc(this.config.mangas_url)
      .then(this.parser.mangas)
      .tap(x=>this.debug(`mangas: ${x.length}`));
  }

function   latest(){
    this.debug('getting latest');
    return getDoc(this.config.latest_url)
      .then(this.parser.latest)
      .tap(x=>this.debug(`found: ${x.length}`));
  }

function  info(name) {
    this.debug(`getting info for ${name}`);
    let src = this.resolveUrl(name);

    this. debug(`getting info ${src}`);
    return getDoc(src)
      .then(this.parser.mangaInfo)
      .tap(x=>this.debug('info: %s',x));
  }

function  chapters(name){
    this.debug(`getting chapters ${name}`);
    let src = this.resolveUrl(name);

    return getDoc(src)
      .then(this.parser.chapters)
      .tap(x=>{
        if(!x || x.length === 0)
          throw 'not found';
      })
      .catch(x=>{throw new Error('Chapters not found',x);})
      .tap(x=>this.debug(`chapters: ${x.length}`));
  }

function  images(name, chapter) {
    this.debug(`getting images ${name}:${chapter}`);

    return this.chapters(name)
      .then(chaps=>{
        return find(chaps,{number:`${name} ${chapter}`});
      })
      .then(x=>{
        if(!x)
          throw new Error($`Manga: ${name} chapter ${chapter} doesn't exists.`);
        return x.src;
      })
      .then(this.imagesByUrl);
  }

	//helpers
function   imagesByUrl(uri){
    this.debug(`getting images for ${uri}`);

    return this.imagesPaths(uri)
			.tap(x=>this.debug(`images: ${x.length}`))
			.then(x=>x.map(this.image))
			.tap(x=>this.debug(`images resolved : ${x}`));
  }


function  imagesPaths(uri){
   this.debug(`getting image paths ${uri}`);
   return getDoc(uri)
			.then(this.parser.imagesPaths)
			.tap(x=>this.debug(`found ${x.length} images:\n${x}`));
 }

function 	 image(uri){
   this.debug(`getting image from ${uri}`);

   return getHtml(uri)
			.tap(x=>this.verbose('html: %s', x))
			.then(this.parser.image);

 }


export const extend = (site, config, parser, resolveUrl)=>{
  let ext = Object.assign({},site);
  ext.debug = require('debug')(`gin-downloader:${config.name}`);
  ext.verbose= require('debug')(`gin-downloader:${config.name}:verbose`);

  ext.config = config;
  ext.site = site;
  ext.parser = parser;
  ext.resolveUrl = resolveUrl;


  ext.mangas = (site && site.mangas && site.mangas.bind(ext)) || mangas.bind(ext);
  ext.latest = (site && site.latest && site.latest.bind(ext)) || latest.bind(ext);
  ext.info = (site && site.info && site.info.bind(ext)) || info.bind(ext);
  ext.chapters = (site && site.chapters && site.chapters.bind(ext)) || chapters.bind(ext);
  ext.images = (site && site.images && site.images.bind(ext)) || images.bind(ext);
  ext.imagesByUrl = (site && site.imagesByUrl && site.imagesByUrl.bind(ext)) || imagesByUrl.bind(ext);
  ext.imagesPaths = (site && site.imagesPaths && site.imagesPaths.bind(ext)) || imagesPaths.bind(ext);
  ext.image = (site && site.image && site.image.bind(ext)) || image.bind(ext);


  return ext;
};





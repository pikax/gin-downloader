/**
 * Created by rodriguesc on 24/03/2017.
 */

import {IChapter, IConfig, IImage, IMangaInfo, IMangas, IName, IParser, ISite} from "./declarations";
import * as debug from "debug";
import {IDebugger} from "debug";
import {getDoc} from "./helper";

import {find} from 'lodash';
import {isNumber} from "util";
import {getHtml} from "./request";
import {parse} from "url";

export class Site implements ISite{

  protected parser: IParser;
  protected verbose: IDebugger;
  protected debug : IDebugger;
  protected config: IConfig;
  protected nameHelper: IName;


  protected constructor(config : IConfig, parser : IParser, nameHelper : IName){
    this.debug  = debug(`gin-downloader:${config.name}`);
    this.verbose = debug(`gin-downloader:${config.name}:verbose`);

    this.config = config;
    this.parser = parser;
    this.nameHelper = nameHelper;
  }

  mangas(): Promise<IMangas[]> {
    this.debug('getting mangas');

    return getDoc(this.config.mangas_url)
      .then(this.parser.mangas)
      .tap(x=>this.debug(`mangas: ${x.length}`));
  }

  async latest(): Promise<IChapter[]> {
    this.debug('getting latest');

    let mangas = await getDoc(this.config.latest_url).then(this.parser.latest);
    this.verbose(`got ${mangas.length} chapters`);

    return mangas;
  }

  async info(name: string): Promise<IMangaInfo> {
    if(!name)
      throw new Error('Please provide a name');
    this.debug(`getting info for ${name}`);

    try {
      let src = this.nameHelper.resolveUrl(name);
      let info = await getDoc(src).then(this.parser.info);
      this.verbose('info:%o', info);
      this.debug(`got info for ${name}`);

      return info;
    }
    catch(e) {
      this.debug(e);
      throw new Error(`${name} not found!`);
    }
  }

  async chapters(name: string): Promise<IChapter[]> {
    if(!name)
      throw new Error('Please provide a name');

    this.debug(`getting chapters for ${name}`);

    try {
      let src = this.nameHelper.resolveUrl(name);
      let chapters = await getDoc(src).then(this.parser.chapters);
      this.verbose('chapters:%o', chapters);
      this.debug(`got chapters for ${name}`);

      return chapters;
    }
    catch(e) {
      console.error(e);

      this.debug(e);
      throw new Error(`${name} not found!`);
    }
  }

  async infoChapters(name: string) : Promise<{info : IMangaInfo,chapters:IChapter[]}>{
    if(!name)
      throw new Error('Please provide a name');

    this.debug(`getting info & chapters for ${name}`);

    try {
      let src = this.nameHelper.resolveUrl(name);
      let doc = await getDoc(src);

      let info = await this.parser.info(doc);
      let chapters = await this.parser.chapters(doc);

      this.verbose('info:%o\nchapters:%o', chapters);
      this.debug(`got info & chapters for ${name}`);

      return {info,chapters};
    }
    catch(e) {
      this.debug(e);
      throw new Error(`${name} not found!`);
    }
  }

  async images(name: string, chapter: number): Promise<Promise<IImage>[]> {
    if(!name)
      throw new Error('Please provide a name');
    if(!chapter)
      throw new Error('Please provide a chapter');
    if(!isNumber(chapter))
      throw new Error('Please provide a valid chapter');

    this.debug('getting images for %s : %s', name,chapter);

    let chapters = await this.chapters(name);
    this.debug('chapters found %s',chapters.length);
    this.verbose('%o',chapters);

    let chap = find(chapters, {number:chapter});
    this.verbose('filtered chapters %o',chap);

    if(!chap)
      throw new Error('Chapter not found');

    let paths = await getDoc(chap.src).then(this.parser.imagesPaths);

    return paths.map(x=>Site.processImagePath(x,this.parser));
  }

  private static async processImagePath(src:string,parser : IParser) : Promise<IImage>{
    let image = await getHtml(src).then(parser.image);

    return {
      name : parse(image).pathname.split('/').reverse()[0],
      src : image
    }
  }
}

export default Site;
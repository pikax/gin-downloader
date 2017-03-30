/**
 * Created by rodriguesc on 24/03/2017.
 */

import {Chapter, SiteConfig, ImageSource, MangaInfo, MangaSource, NameHelper, SiteParser, Site, Request} from "../declarations";
import * as debug from "debug";
import {IDebugger} from "debug";

import {find} from "lodash";
import {isNumber} from "util";
import {parse} from "url";

export class MangaSite<C extends SiteConfig, P extends SiteParser, N extends NameHelper> implements Site {
  private _parser: P;
  protected verbose: IDebugger;
  protected debug: IDebugger;
  private _config: C;
  private  _nameHelper: N;
  private  _request: Request;

  get parser(): P {
    return this._parser;
  };
  get config(): C {
    return this._config;
  };
  get nameHelper(): N {
    return this._nameHelper;
  };
  get request(): Request {
    return this._request;
  };

  protected constructor(config: C, parser: P, nameHelper: N, request: Request) {
    this.debug  = debug(`gin-downloader:${config.name}`);
    this.verbose = debug(`gin-downloader:${config.name}:verbose`);

    this._config = config;
    this._nameHelper = nameHelper;
    this._parser = parser;
    this._request = request;
  }

  mangas(): Promise<MangaSource[]> {
    this.debug("getting mangas");

    return this.request.getDoc(this.config.mangas_url)
      .then(this.parser.mangas)
      .tap(x => this.debug(`mangas: ${x.length}`));
  }

  async latest(): Promise<Chapter[]> {
    this.debug("getting latest");

    let mangas = await this.request.getDoc(this.config.latest_url).then(this.parser.latest);
    this.verbose(`got ${mangas.length} chapters`);

    return mangas;
  }

  async info(name: string): Promise<MangaInfo> {
    if (!name) {
      throw new Error("Please provide a name");
    }
    this.debug(`getting info for ${name}`);

    try {
      let src = this.nameHelper.resolveUrl(name);
      let info = await this.request.getDoc(src).then(this.parser.info);
      this.verbose("info:%o", info);
      this.debug(`got info for ${name}`);

      return info;
    }
    catch (e) {
      this.debug(e);
      throw new Error(`${name} not found!`);
    }
  }

  async chapters(name: string): Promise<Chapter[]> {
    if (!name) {
      throw new Error("Please provide a name");
    }

    this.debug(`getting chapters for ${name}`);

    try {
      let src = this.nameHelper.resolveUrl(name);
      let chapters = await this.request.getDoc(src).then(this.parser.chapters);
      this.verbose("chapters:%o", chapters);
      this.debug(`got chapters for ${name}`);

      return chapters;
    }
    catch (e) {
      this.debug(e);
      throw new Error(`${name} not found!`);
    }
  }

  async infoChapters(name: string): Promise<{info: MangaInfo, chapters: Chapter[]}> {
    if (!name) {
      throw new Error("Please provide a name");
    }

    this.debug(`getting info & chapters for ${name}`);

    try {
      let src = this.nameHelper.resolveUrl(name);
      let doc = await this.request.getDoc(src);

      let info = await this.parser.info(doc);
      let chapters = await this.parser.chapters(doc);

      this.verbose("info:%o\nchapters:%o", chapters);
      this.debug(`got info & chapters for ${name}`);

      return {info, chapters};
    }
    catch (e) {
      this.debug(e);
      throw new Error(`${name} not found!`);
    }
  }

  async images(name: string, chapter: number): Promise<Promise<ImageSource>[]> {
    if (!name) {
      throw new Error("Please provide a name");
    }
    if (!chapter) {
      throw new Error("Please provide a chapter");
    }
    if (!isNumber(chapter)) {
      throw new Error("Please provide a valid chapter");
    }

    this.debug("getting images for %s : %s", name, chapter);

    let chap = await this.resolveChapterSource(name, chapter);

    let paths = await this.request.getDoc(chap).then(this.parser.imagesPaths);

    return paths.map(x => MangaSite.processImagePath(x, this.parser, this.request));
  }

  protected async resolveChapterSource(name: string, chapter: number): Promise<string> {
    let chapters = await this.chapters(name);
    let chap = find(chapters, {number: chapter});
    this.verbose(`filtered chapters %o`, chap);

    if (!chap) {
      throw new Error("Chapter not found");
    }
    return chap.src;
  }

  private static async processImagePath(src: string, parser: SiteParser, request: Request): Promise<ImageSource> {
    let image = await request.getHtml(src).then(parser.image);

    return {
      name : parse(image).pathname.split("/").reverse()[0],
      src : image
    };
  }
}

export default Site;

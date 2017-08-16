import {IDebugger} from "debug";

import {find} from "lodash";
import {ginConfig} from "src/config";
import {FilteredResults, MangaFilter} from "src/filter";

import {Chapter, gin, GinImage, GinImagePromise, ImageCollection, Info, Site, InfoChapter} from "src/interface";
import {RequestStrategy, OptionsWithUrl} from "src/request/index";
import {request} from "src/request/pool";
import {Lazy, parseDoc} from "src/util";
import {parse} from "url";

const debug = require("debug");
import MangaSource = gin.MangaSource;
import MangaXDoc = gin.MangaXDoc;
import NameHelper = gin.NameHelper;

import SiteConfig = gin.SiteConfig;
import SiteParser = gin.SiteParser;
import ChapterSource = gin.ChapterSource;

export abstract class MangaSite<C extends SiteConfig, P extends SiteParser, N extends NameHelper> implements Site {
  abstract sitename: string;

  private _parser: P;
  protected verbose: IDebugger;
  protected debug: IDebugger;
  protected error: IDebugger;
  private _config: C;
  private _nameHelper: N;

  get parser(): P {
    return this._parser;
  }

  get config(): C {
    return this._config;
  }

  get nameHelper(): N {
    return this._nameHelper;
  }

  protected constructor(config: C, parser: P, nameHelper: N) {
    this.debug = debug(`gin-downloader:${config.name}`);
    this.verbose = debug(`gin-downloader:${config.name}:verbose`);
    this.error = debug(`gin-downloader:${config.name}:error`);

    this._config = config;
    this._nameHelper = nameHelper;
    this._parser = parser;
  }

  async mangas(): Promise<MangaSource[]> {
    this.debug("getting mangas");

    let opts = this.buildMangasRequest(this.config.mangas_url);
    let mangas = await this.getDoc(opts)
      .then(this.parser.mangas);

    this.debug(`mangas: ${mangas.length}`);

    return mangas;
  }

  filter(filter?: MangaFilter): Promise<FilteredResults> {
    throw new Error("Method not implemented.");
  }

  async latest(): Promise<Chapter[]> {
    this.debug("getting latest");

    let opts = this.buildLatestRequest(this.config.latest_url);
    let mangas = await this.getDoc(opts).then(this.parser.latest);
    this.verbose(`got ${mangas.length} chapters`);

    return mangas;
  }

  async info(name: string): Promise<Info> {
    if (!name) {
      throw new Error("Please provide a name");
    }
    this.debug(`getting info for ${name}`);

    try {
      let src = await this.resolveMangaUrl(name);
      let opts = this.buildInfoRequest(src);
      let info = await this.getDoc(opts).then(this.parser.info);
      this.verbose("info:%o", info);
      this.debug(`got info for ${name}`);

      return info;
    }
    catch (e) {
      this.error("%o", e);
      throw new Error(`${name} not found!`);
    }
  }

  async chapters(name: string): Promise<Chapter[]> {
    if (!name) {
      throw new Error("Please provide a name");
    }

    this.debug(`getting chapters for ${name}`);

    try {
      let src = await this.resolveMangaUrl(name);
      let opts = this.buildInfoRequest(src);
      let chapters = await this.getDoc(opts).then(this.parser.chapters);
      this.verbose("chapters:%o", chapters);
      this.debug(`got chapters for ${name}`);

      return chapters;
    }
    catch (e) {
      this.error("%o", e);
      throw new Error(`${name} not found!`);
    }
  }

  async infoChapters(name: string): Promise<InfoChapter> {
    if (!name) {
      throw new Error("Please provide a name");
    }

    this.debug(`getting info & chapters for ${name}`);

    try {
      let src = await this.resolveMangaUrl(name);
      let opts = this.buildInfoRequest(src);
      let doc = await this.getDoc(opts);

      let info = await this.parser.info(doc);
      let chapters = await this.parser.chapters(doc);

      this.verbose("info:%o\nchapters:%o", chapters);
      this.debug(`got info & chapters for ${name}`);

      return {...info, chapters};
    }
    catch (e) {
      this.error("%o", e);
      throw new Error(`${name} not found!`);
    }
  }

  async infoChaptersByUrl(src: string): Promise<InfoChapter> {
    this.debug(`getting info & chapters for ${src}`);

    try {
      let opts = this.buildInfoRequest(src);
      let doc = await this.getDoc(opts);

      let info = await this.parser.info(doc);
      let chapters = await this.parser.chapters(doc);

      this.verbose("info:%o\nchapters:%o", chapters);
      this.debug(`got info & chapters for ${src}`);

      return {...info, chapters};
    }
    catch (e) {
      this.error("%o", e);
      throw new Error(`${src} not found!`);
    }
  }

  async images(name: string, chapter: any): Promise<ImageCollection> {
    if (!name) {
      throw new Error("Please provide a name");
    }
    if (!chapter) {
      throw new Error("Please provide a chapter");
    }

    this.debug("getting images for %s : %s", name, chapter);

    let chap = await this.resolveChapterSource(name, chapter);
    let opts = this.buildChapterRequest(chap);
    let paths = await this.getDoc(opts).then(this.parser.imagesPaths);

    return paths.map(x => this.processImagePath(this.buildImagePathsRequest(x)));
  }


  async imagesByUrl(url: string): Promise<ImageCollection> {
    let opts = this.buildChapterRequest(url);
    let paths = await this.getDoc(opts).then(this.parser.imagesPaths);

    return paths.map(x => this.processImagePath(this.buildImagePathsRequest(x)));
  }


  resolveMangaUrl(name: string): Promise<string> | string {
    return this.nameHelper.resolveUrl(name);
  }

  protected buildRequest(url: string): OptionsWithUrl {
    // todo add authentication headers
    return {url};
  }


  protected buildMangasRequest(url: string) {
    return this.buildRequest(url);
  }

  protected buildLatestRequest(url: string) {
    return this.buildRequest(url);
  }

  protected buildInfoRequest(url: string) {
    return this.buildRequest(url);
  }

  protected buildChapterRequest(url: string) {
    return this.buildRequest(url);
  }

  protected buildImagePathsRequest(url: string) {
    return this.buildChapterRequest(url);
  }

  protected getStrategy(): RequestStrategy {
    const strategy: RequestStrategy = ginConfig.config.sites[this.sitename];
    if (!strategy) {
      throw new Error(`strategy not found for ${this.sitename}`);
    }
    return strategy;
  }

  protected getHtml(url: string | OptionsWithUrl): Promise<string> {
    const strategy = this.getStrategy();
    return request(url, strategy)
      .then(x => x.toString());
  }

  protected getDoc(url: string | OptionsWithUrl): Promise<MangaXDoc> {
    return this.getHtml(url).then(x => parseDoc(x, {location: (<any>url).url || url}));
  }

  protected postHtml(url: string | OptionsWithUrl, params?: any): Promise<string> {
    let o = <OptionsWithUrl>url;
    if (typeof url === "string") {
      o = {url: url};
    }

    const strategy = this.getStrategy();
    return request({...o, method: "POST", body: params}, strategy)
      .then(x => x.toString());
  }

  protected postDoc(url: string | OptionsWithUrl, params?: any): Promise<MangaXDoc> {
    return this.postHtml(url, params)
      .then(x => parseDoc(x, {location: (<any>url).url || url}));
  }


  protected async resolveChapterSource(name: string, chapter: number | string): Promise<string> {
    let chapters = await this.chapters(name);
    const c = chapter.toString();

    for (const chap of chapters) {
      if (chap.chap_number === c) {
        this.verbose(`filtered chapters %o`, chap);
        return (chap as ChapterSource).src;
      }
    }
    throw new Error("Chapter not found");
  }

  private processImagePath(opts: any): GinImagePromise {
    return new Lazy(async () => {
      let image = await this.getHtml(opts).then(this.parser.image);

      return <GinImage>{
        name: parse(image).pathname.split("/").reverse()[0],
        src: image
      };
    });
  }
}

export default Site;


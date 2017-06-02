/**
 * Created by rodriguesc on 24/03/2017.
 */

import {
  Chapter, SiteConfig, ImageSource, MangaInfo, MangaSource, NameHelper, SiteParser, Site, Request,
  FilterSupport, FilteredResults, MangaXDoc
} from "../declarations";
import * as debug from "debug";
import {IDebugger} from "debug";

import {find} from "lodash";
import {parse} from "url";
import {RequestStrategy} from "../request/headers";
import {GinRequest} from "../request";
import {OptionsWithUrl} from "request";

export class MangaSite<C extends SiteConfig, P extends SiteParser, N extends NameHelper> implements Site {


  private _parser: P;
  protected verbose: IDebugger;
  protected debug: IDebugger;
  private _config: C;
  private  _nameHelper: N;
  private  _request: GinRequest;

  get parser(): P {
    return this._parser;
  }
  get config(): C {
    return this._config;
  }
  get nameHelper(): N {
    return this._nameHelper;
  }
  get request(): GinRequest {
    return this._request;
  }

  protected constructor(config: C, parser: P, nameHelper: N, strategy: RequestStrategy) {
    this.debug  = debug(`gin-downloader:${config.name}`);
    this.verbose = debug(`gin-downloader:${config.name}:verbose`);

    this._config = config;
    this._nameHelper = nameHelper;
    this._parser = parser;
    this._request = new GinRequest(strategy);
  }

  async mangas(): Promise<MangaSource[]> {
    this.debug("getting mangas");

    let opts = this.buildMangasRequest(this.config.mangas_url);
    let mangas = await this.request.getDoc(opts)
      .then(this.parser.mangas);

    this.debug(`mangas: ${mangas.length}`);

    return mangas;
  }

  filter(filter?: FilterSupport): Promise<FilteredResults> {
    throw new Error("Method not implemented.");
  }

  async latest(): Promise<Chapter[]> {
    this.debug("getting latest");

    let opts = this.buildLatestRequest(this.config.latest_url);
    let mangas = await this.request.getDoc(opts).then(this.parser.latest);
    this.verbose(`got ${mangas.length} chapters`);

    return mangas;
  }

  async info(name: string): Promise<MangaInfo> {
    if (!name) {
      throw new Error("Please provide a name");
    }
    this.debug(`getting info for ${name}`);

    try {
      let src = await this.resolveMangaUrl(name);
      let opts = this.buildInfoRequest(src);
      let info = await this.request.getDoc(opts).then(this.parser.info);
      this.verbose("info:%o", info);
      this.debug(`got info for ${name}`);

      return info;
    }
    catch (e) {
      this.debug(e);
      console.log(e);
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
      let chapters = await this.request.getDoc(opts).then(this.parser.chapters);
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
      let src = await this.resolveMangaUrl(name);
      let opts = this.buildInfoRequest(src);
      let doc = await this.request.getDoc(opts);

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

  async images(name: string, chapter: any): Promise<Promise<ImageSource>[]> {
    if (!name) {
      throw new Error("Please provide a name");
    }
    if (!chapter) {
      throw new Error("Please provide a chapter");
    }

    this.debug("getting images for %s : %s", name, chapter);

    let chap = await this.resolveChapterSource(name, chapter);
    let opts = this.buildChapterRequest(chap);
    let paths = await this.request.getDoc(opts).then(this.parser.imagesPaths);

    return paths.map(x => this.processImagePath(this.buildImagePathsRequest(x)));
  }

  resolveMangaUrl(name: string): Promise<string>|string  {
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

  protected getHtml(url: string | OptionsWithUrl): Promise<string> {
    return this.request.getHtml(url);
  }

  protected getDoc(url: string | OptionsWithUrl): Promise<MangaXDoc> {
    return this.request.getDoc(url);
  }

  protected postDoc(url: string | OptionsWithUrl, params?: any): Promise<MangaXDoc> {
    return this.request.postDoc(url, params);
  }


  protected async resolveChapterSource(name: string, chapter: number): Promise<string> {
    let chapters = await this.chapters(name);
    // TODO find a better way to filter chapters, because this doesnt work if we pass a string instead of number
    let chap = find(chapters, {chap_number: chapter});
    this.verbose(`filtered chapters %o`, chap);

    if (!chap) {
      throw new Error("Chapter not found");
    }
    return chap.src;
  }

  private async processImagePath(opts: any): Promise<ImageSource> {
    let image = await this.getHtml(opts).then(this.parser.image);

    return {
      name : parse(image).pathname.split("/").reverse()[0],
      src : image
    };
  }
}

export default Site;

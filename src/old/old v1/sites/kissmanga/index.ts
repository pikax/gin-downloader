/**
 * Created by david on 24/03/2017.
 */

import {MangaSite} from "../../common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {FilteredResults, MangaFilter, ImageSource, MangaSource, Site, SiteConfig} from "../../declarations";
import {find} from "lodash";
import {parse, resolve} from "url";
import {Script} from "vm";
import {processFilter} from "./filter";
import {strategy} from "../../request/requestCloudFareStrategy";



export class KissManga extends MangaSite<SiteConfig, Parser, Helper> implements Site {
  public constructor() {
    super(config, new Parser(), new Helper(), strategy);
  }

  private async getVM(secret: string): Promise<Script> {
    let vm = this.parser.VM;
    if (vm && this.parser.secretAlgorithm === secret) {
      return vm;
    }

    let tkCa = this.request.getHtml(resolve(this.config.site, "/Scripts/ca.js"));
    let tkLo = this.request.getHtml(resolve(this.config.site, "/Scripts/lo.js"));
    let tkLst = [tkCa
      , tkLo];

    let lst = await Promise.all(tkLst);

    return this.parser.buildVM(lst[0], lst[1], secret);
  }

  mangas(filter?: MangaFilter): Promise<MangaSource[]> {
    return this.filter().then(x => x.results);
  }

  async filter(filter?: MangaFilter): Promise<FilteredResults> {
    this.debug("filter mangas with: %o", filter);

    let search = processFilter(filter);
    let opts = this.buildMangasRequest(search.src);
    let headers = opts.headers || {};
    headers["Content-Type"] = headers["Content-Type"] || "application/x-www-form-urlencoded; charset=UTF-8";
    headers["Content-Length"] = headers["Content-Length"] || search.params.length;
    opts.body = search.params.toString();

    let doc = await this.postDoc(opts);
    let mangas = await this.parser.filter(doc);

    this.debug(`mangas: ${mangas.results.length}`);

    return mangas;
  }


  async images(name: string, chapNumber: number): Promise<Promise<ImageSource>[]> {
    let chapters = await this.chapters(name);


    let chapter = find(chapters, {chap_number: chapNumber});
    if (!chapter) {
      throw new Error("IChapter not found!");
    }

      let html = await this.getHtml(chapter.src);
      let secret = this.parser.getSecret(html);

      let vm = await this.getVM(secret);

      let imgs = this.parser.imagesList(html, secret, vm);

      let srcs = imgs.map(x => {
        return <ImageSource>{
          name: parse(x).pathname.split("/").reverse()[0],
          src: x
        };
      });
      return srcs.map(x => Promise.resolve(x));
  }

  // protected buildMangasRequest(url: string): OptionsWithUrl{
  //   let opts = this.buildRequest(url);
  //
  // }
}

export const manga: Site = new KissManga();
export default manga;

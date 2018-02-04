/**
 * Created by david on 24/03/2017.
 */
import {Script} from "vm";
import {resolve, parse} from "url";


import {FilteredResults, MangaFilter} from "./../../filter";
import {gin, Site, ImageCollection, GinImage} from "./../../interface";
import {MangaSite} from "./../../mangasite";
import {config} from "./config";

import {processFilter} from "./filter";
import {Helper} from "./names";
import {Parser} from "./parser";
import MangaSource = gin.MangaSource;
import SiteConfig = gin.SiteConfig;
import {Lazy} from "./../../util";


export class KissManga extends MangaSite<SiteConfig, Parser, Helper> implements Site {
  sitename: string = "kissmanga";

  public constructor() {
    super(config, new Parser(), new Helper());
  }


  private async getVM(secret: string): Promise<Script> {
    let vm = this.parser.VM;
    if (vm && this.parser.secretAlgorithm === secret) {
      return vm;
    }

    let tkCa = this.getHtml(resolve(this.config.site, "/Scripts/ca.js"));
    let tkLo = this.getHtml(resolve(this.config.site, "/Scripts/lo.js"));
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


  async images(name: string, chapNumber: string): Promise<ImageCollection> {
    const chapSrc = await this.resolveChapterSource(name, chapNumber);

    const html = await this.getHtml(chapSrc);
    const secret = this.parser.getSecret(html);
    const vm = await this.getVM(secret);

    const imgs = this.parser.imagesList(html, secret, vm);

    const srcs: GinImage[] = imgs.map(x => ({
      name: parse(x).pathname.split("/").reverse()[0],
      src: x
    }));

    return srcs.map(x => new Lazy(() => Promise.resolve(x)));
  }
}

export const manga: Site = new KissManga();
export default manga;

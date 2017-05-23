/**
 * Created by david on 24/03/2017.
 */

import {MangaSite} from "../../common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {
  FilterCondition, FilteredResults, FilterSupport, ImageSource, MangaSource, Site,
  SiteConfig
} from "../../declarations";
import {find} from "lodash";
import {request} from "../../common/cfRequest";
import {parse, resolve} from "url";
import {Script} from "vm";
import {processFilter} from "./filter";



export class Batoto extends MangaSite<SiteConfig, Parser, Helper> implements Site {

  private _urlCache: {[id: string]: string} = {}; // provide a cache for resolved urls

  public constructor() {
    super(config, new Parser(), new Helper(), request);
  }

  async resolveMangaUrl(name: string)  {
    if (this._urlCache[name]) {
      return this._urlCache[name];
    }

    let filter: FilterSupport = {search: {name: {name, condition: FilterCondition.EndsWith}}};
    let filterResults: FilteredResults;
    do {
      let page = 0;
      if (filterResults) {
        page = filterResults.page + 1;
      }
      filter.page = page;

      filterResults = await this.filter(filter);

      let {results} = filterResults;

      let result: string;

      for (let obj of results) {
        if (obj.name === name) {
          result = obj.src;
        }

        this._urlCache[obj.name] = obj.src; // add to cache
      }

      if (result) {
        return result;
      }
    } while (filterResults.page < filterResults.total && filterResults.results.length > 0);

    return "";
    return new Error("Not found");
  }

  mangas(filter?: FilterSupport): Promise<MangaSource[]> {
    return this.filter(filter).then(x => x.results);
  }

  async filter(filter?: FilterSupport): Promise<FilteredResults> {
    this.debug("filter mangas with: %o", filter);

    let search = processFilter(filter);

    let doc = await this.request.getDoc(search.src);
    let mangas = await this.parser.filter(doc);

    this.debug(`mangas: ${mangas.results.length}`);

    return mangas;
  }

}

export const manga: Site = new Batoto();
export default manga;

/**
 * Created by david on 24/03/2017.
 */

import {MangaSite} from "../../old v2/common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {FilteredResults, MangaFilter, MangaSource, Site, SiteConfig} from "../../declarations";
import {strategy} from "../../request/requestRetryStrategy";
import {processFilter} from "./filter";



export class MangaFox extends MangaSite<SiteConfig, Parser, Helper> implements Site {
  public constructor() {
    super(config, new Parser, new Helper(), strategy);
  }

  async filter(filter?: MangaFilter): Promise<FilteredResults> {
    this.debug("filter mangas with: %o", filter);

    let search = processFilter(filter);

    let doc = await this.request.getDoc(search.src + "?" + search.params);
    let mangas = await this.parser.filter(doc);

    this.debug(`mangas: ${mangas.results.length}`);

    return mangas;
  }
}


export const manga: Site = new MangaFox();
export default manga;

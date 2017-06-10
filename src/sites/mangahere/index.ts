/**
 * Created by rodriguesc on 03/03/2017.
 */
import {MangaSite} from "../../common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {FilteredResults, MangaFilter, SiteConfig} from "../../declarations";
import {processFilter} from "./filter";
import {strategy} from "../../request/requestRetryStrategy";


export class MangaHere extends MangaSite<SiteConfig, Parser, Helper> {
  public constructor() {
    super(config, new Parser(), new Helper(), strategy);
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


export const manga = new MangaHere();
export default manga;

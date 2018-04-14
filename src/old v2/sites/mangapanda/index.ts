/**
 * Created by rodriguesc on 05/03/2017.
 */
import {MangaSite} from "../../old v2/common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {resolve} from "url";
import {FilteredResults, MangaFilter, SiteConfig} from "../../declarations";
import {processFilter} from "./filter";
import {strategy} from "../../request/requestRetryStrategy";


export class MangaPanda extends MangaSite<SiteConfig, Parser, Helper> {
  public constructor() {
    super(config, new Parser(), new Helper(), strategy);
  }

  protected async resolveChapterSource(name: string, chapter: number): Promise<string> {
    let mangaUri = this.nameHelper.resolveUrl(name);
    // NOTE mangapanda dont add volume to url is a simple {site}/{name}/{chapter}
    return resolve(`${mangaUri}/`, chapter.toString());
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

export const manga = new MangaPanda();
export default manga;

/**
 * Created by rodriguesc on 05/03/2017.
 */
import {MangaSite} from "../../common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {resolve} from "url";
import {FilteredResults, FilterSupport, SiteConfig} from "../../declarations";
import {request} from "../../common/request";
import {processFilter} from "./filter";


export class MangaPanda extends MangaSite<SiteConfig, Parser, Helper> {
  public constructor() {
    super(config, new Parser(), new Helper(), request);
  }

  protected async resolveChapterSource(name: string, chapter: number): Promise<string> {
    let mangaUri = this.nameHelper.resolveUrl(name);
    // NOTE mangapanda dont add volume to url is a simple {site}/{name}/{chapter}
    return resolve(`${mangaUri}/`, chapter.toString());
  }


  async filter(filter?: FilterSupport): Promise<FilteredResults> {
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

/**
 * Created by david on 24/03/2017.
 */

import {MangaSite} from "../../common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {FilteredResults, FilterSupport, ImageSource, MangaSource, Site, SiteConfig} from "../../declarations";
import {find} from "lodash";
import {request} from "../../common/cfRequest";
import {parse, resolve} from "url";
import {Script} from "vm";
import {processFilter} from "./filter";



export class Batoto extends MangaSite<SiteConfig, Parser, Helper> implements Site {
  public constructor() {
    super(config, new Parser(), new Helper(), request);
  }


  mangas(filter?: FilterSupport): Promise<MangaSource[]> {
    return this.filter().then(x => x.results);
  }

  async filter(filter?: FilterSupport): Promise<FilteredResults> {
    this.debug("filter mangas with: %o", filter);

    let search = processFilter(filter);

    let doc = await this.request.postDoc(search.src, search.params);
    let mangas = await this.parser.filter(doc);

    this.debug(`mangas: ${mangas.results.length}`);

    return mangas;
  }

}

export const manga: Site = new Batoto();
export default manga;

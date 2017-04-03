/**
 * Created by david on 24/03/2017.
 */

import {MangaSite} from "../../common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {FilterSupport, MangaSource, Site, SiteConfig} from "../../declarations";
import {request} from "../../common/request";
import {processFilter} from "./filter";
import {resolve} from "url";


export class MangaFox extends MangaSite<SiteConfig, Parser, Helper> implements Site{
  public constructor() {
    super(config, new Parser, new Helper(), request);
  }
}

export const manga: Site = new MangaFox();
export default manga;

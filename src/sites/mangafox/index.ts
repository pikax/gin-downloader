/**
 * Created by david on 24/03/2017.
 */

import {MangaSite} from "../../common/mangasite";
import {parser} from "./parser";
import {config} from "./config";
import {helper} from "./names";
import {Site} from "../../declarations";


export class MangaFox extends MangaSite implements Site{
  public constructor() {
    super(config, parser, helper);
  }
}

export const manga: Site = new MangaFox();
export default manga;

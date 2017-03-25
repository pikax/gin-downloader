/**
 * Created by david on 24/03/2017.
 */

import {MangaSite} from "../../common/mangasite";
import {parser} from "./parser";
import {config} from "./config";
import {helper} from "./names";


export class MangaFox extends MangaSite {
  public constructor() {
    super(config, parser, helper);
  }
}

export const manga = new MangaFox();
export default manga;

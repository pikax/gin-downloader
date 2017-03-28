/**
 * Created by david on 24/03/2017.
 */

import {MangaSite} from "../../common/mangasite";
import {parser} from "./parser";
import {config} from "./config";
import {helper} from "./names";
import {MangaSource, Site} from "../../declarations";


export class KissManga extends MangaSite implements Site{
  public constructor() {
    super(config, parser, helper);
  }
  mangas(): Promise<MangaSource[]>{
    throw new Error("Invalid"); // TODO add more validation, or provide a way to call everything
  };
}

export const manga: Site = new KissManga();
export default manga;

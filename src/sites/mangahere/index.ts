/**
 * Created by rodriguesc on 03/03/2017.
 */
import {MangaSite} from "../../common/mangasite";
import {parser} from "./parser";
import {config} from "./config";
import {helper} from "./names";


export class MangaHere extends MangaSite {
  public constructor() {
    super(config, parser, helper);
  }
}


export const manga = new MangaHere();
export default manga;

/**
 * Created by rodriguesc on 03/03/2017.
 */
import {MangaSite} from "../../common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {SiteConfig} from "../../declarations";
import {request} from "../../common/request";


export class MangaHere extends MangaSite<SiteConfig, Parser, Helper> {
  public constructor() {
    super(config, new Parser(), new Helper(), request);
  }
}


export const manga = new MangaHere();
export default manga;

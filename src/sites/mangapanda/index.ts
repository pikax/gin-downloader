/**
 * Created by rodriguesc on 05/03/2017.
 */
import {MangaSite} from "../../common/mangasite";
import {Parser} from "./parser";
import {config} from "./config";
import {Helper} from "./names";
import {resolve} from "url";
import {SiteConfig} from "../../declarations";
import {request} from "../../common/request";


export class MangaPanda extends MangaSite<SiteConfig, Parser, Helper> {
  public constructor() {
    super(config, new Parser(), new Helper(), request);
  }

  protected async resolveChapterSource(name: string, chapter: number): Promise<string> {
    let mangaUri = this.nameHelper.resolveUrl(name);
    // NOTE mangapanda dont add volume to url is a simple {site}/{name}/{chapter}
    return resolve(`${mangaUri}/`, chapter.toString());
  }
}

export const manga = new MangaPanda();
export default manga;
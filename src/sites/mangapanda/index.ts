/**
 * Created by rodriguesc on 05/03/2017.
 */
import {MangaSite} from "../../common/mangasite";
import {parser} from "./parser";
import {config} from "./config";
import {helper} from "./names";
import {resolve} from "url";


export class MangaPanda extends MangaSite {
  public constructor() {
    super(config, parser , helper);
  }

  protected async resolveChapterSource(name: string, chapter: number): Promise<string> {
    let mangaUri = this.nameHelper.resolveUrl(name);
    // NOTE mangapanda dont add volume to url is a simple {site}/{name}/{chapter}
    return resolve(`${mangaUri}/`, chapter.toString());
  }
}

export const manga = new MangaPanda();
export default manga;

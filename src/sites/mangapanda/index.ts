/**
 * Created by rodriguesc on 05/03/2017.
 */
import {Site} from "../../common/site";
import {parser} from "./parser";
import {config} from "./config";
import {name} from "./names";
import {resolve} from "url";


class Manga extends Site {
  public constructor() {
    super(config, parser , name);
  }

  protected async resolveChapterSource(name: string, chapter: number): Promise<string> {
    let mangaUri = this.nameHelper.resolveUrl(name);
    // NOTE mangapanda dont add volume to url is a simple {site}/{name}/{chapter}
    return resolve(`${mangaUri}/`, chapter.toString());
  }
}


export const manga = new Manga();
export default manga;

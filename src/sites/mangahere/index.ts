/**
 * Created by rodriguesc on 03/03/2017.
 */
import {Site} from "../../common/site";
import {parser} from "./parser";
import {config} from "./config";
import {name} from "./names";


class Manga extends Site {
  public constructor() {
    super(config, parser, name);
  }
}


export const manga = new Manga();
export default manga;

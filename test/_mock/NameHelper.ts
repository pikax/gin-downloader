/**
 * Created by pikax on 13/04/2017.
 */
import {NameHelper} from "../../src/declarations";
import {config} from "./SiteConfig";
import {resolve} from "url";


export class Helper implements NameHelper {
  toName(name: string): string {
    return name;
  }

  resolveUrl(name: string): string {
    return resolve(`${config.site}/manga/`, this.toName(name) + "/");
  }
}


export const helper = new Helper();
export default helper;

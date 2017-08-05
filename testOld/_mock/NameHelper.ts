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
    if (name === "fail") {
      throw new Error("Failing");
    }

    return resolve(`${config.site}/manga/`, this.toName(name) + "/");
  }
}


export const helper = new Helper();
export default helper;

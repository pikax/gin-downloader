/**
 * Created by david on 19/03/2017.
 */
import {resolve} from "url";

import {config} from "./config";
import {NameHelper} from "../../declarations";

const NON_WORD_REGEXP  = require("no-case/vendor/non-word-regexp");

const names: { [id: string]: string; } = {
  // "Renai Tsuu -Akka-": "renaitsuu_akka",
  // "Tarepanda Goes on an Adventure": "tarepanda_goes_on_adventure",
};


export class Helper implements NameHelper {
  toName(name: string): string {
    if (names.hasOwnProperty(name)) {
      return names[name];
    }

    let n = name.replace(NON_WORD_REGEXP, "-");

    return n;
    // return noCase(name, null, "-");
  }

  resolveUrl(name: string): string {
    return resolve(config.site + "Manga/", this.toName(name));
  }
}


export const helper = new Helper();
export default helper;

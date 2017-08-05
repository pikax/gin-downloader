/**
 * Created by david on 19/03/2017.
 */

import {resolve} from "url";

import {config} from "./config";
import {NameHelper} from "../../declarations";

const noCase = require("no-case");

const names: { [id: string]: string; } = {
  "I'm Kagome": "i039m-kagome",
  "009 Re:Cyborg": "009-recyborg",
  "17 Years Old, That Summer Day's Miracle": "17-years-old-that-summer-days-miracle",
  "Kapon (>_": "kapon-_",
  "Kapon (>_<)!": "kapon-_",
  "Utopia's Avenger": "utopia039s-avenger",
};


export class Helper implements NameHelper {
  toName(name: string): string {
    if (names.hasOwnProperty(name)) {
      return names[name];
    }

    name = name.replace(/[\/\.+':’×;&"]/g, "");

    return noCase(name.toLowerCase(), null, "-");
  }

  resolveUrl(name: string): string {
    return resolve(config.site, this.toName(name));
  }
}


export const helper = new Helper();
export default helper;

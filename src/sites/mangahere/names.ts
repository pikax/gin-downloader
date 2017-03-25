/**
 * Created by david on 19/03/2017.
 */

import {config} from "./config";
import {IName} from "../../common/declarations";
import {resolve} from "url";

const noCase = require("no-case");


class Name implements IName {
  toName(name: string): string {
    let n = name.replace(/[^\x00-\x7F]/g, "_");

    return noCase(n.toLowerCase(), null, "_");
  }

  resolveUrl(name: string): string {
    return resolve(`${config.site}/manga/`, this.toName(name) + "/");
  }
}


export const name = new Name();
export default name;

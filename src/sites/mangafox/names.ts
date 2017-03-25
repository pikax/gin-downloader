/**
 * Created by david on 19/03/2017.
 */
import {resolve} from "url";

import {config} from "./config";
import {IName} from "../../common/declarations";

const noCase = require("no-case");

const names: { [id: string]: string; } = {
  "Renai Tsuu -Akka-": "renaitsuu_akka",
  "Tarepanda Goes on an Adventure": "tarepanda_goes_on_adventure",
};


class Name implements IName {
  toName(name: string): string {
    if (names.hasOwnProperty(name))
      return names[name];

    return noCase(name.toLowerCase(), null, "_");
  }

  resolveUrl(name: string): string {
    return resolve(config.mangas_url, this.toName(name));
  }
}


export const name = new Name();
export default name;

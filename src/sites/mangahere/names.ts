/**
 * Created by david on 19/03/2017.
 */

import {config} from "./config";
import {resolve} from "url";
import {gin} from "../../interface";
import NameHelper = gin.NameHelper;

const noCase = require("no-case");


export class Helper implements NameHelper {
  toName(name: string): string {
    let n = name.replace(/[^\x00-\x7F]/g, "_");

    return noCase(n.toLowerCase(), null, "_");
  }

  resolveUrl(name: string): string {
    return resolve(`${config.site}/manga/`, this.toName(name) + "/");
  }
}


export const helper = new Helper();
export default helper;


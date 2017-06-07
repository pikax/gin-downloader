/**
 * Created by david on 19/03/2017.
 */
import {config} from "./config";
import {NameHelper} from "../../declarations";

export class Helper implements NameHelper {
  toName(name: string): string {
    throw new Error("Not supported");
  }
  resolveUrl(name: string): string {
    return config.site + "Manga/" + this.toName(name);
  }
}


export const helper = new Helper();
export default helper;

import {gin} from "./../../interface";
import {config} from "./config";
import NameHelper = gin.NameHelper;


export class Helper implements NameHelper {
  toName(name: string): string {
    if (!name) {
      return name;
    }

    if (name.endsWith("?!")) { // to fix search 'Baito Saki wa "Aku no Soshiki"?!'
      return name.slice(0, -1);
    }
    if (name === "enígmә") {
      return "Enigma";
    }

    if (name === "Pietà") {
      return "Pieta";
    }
    return name;
  }

  resolveUrl(name: string): string {
    return config.site + "IManga/" + this.toName(name);
  }
}


export const helper = new Helper();
export default helper;

import {IMangaConfig} from "../interface";
import {resolve} from "url";


export class MangaHereConfig implements IMangaConfig {
    get name() {
        return "MangaHere";
    }

    get site() {
        return "http://www.mangahere.cc";
    }

    get mangasUrl() {
        return resolve(this.site, "/mangalist/");
    }

    get latestUrl() {
        return resolve(this.site, "/latest/");
    }
}
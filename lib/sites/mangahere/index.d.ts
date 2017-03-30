/**
 * Created by rodriguesc on 03/03/2017.
 */
import { MangaSite } from "../../common/mangasite";
import { Parser } from "./parser";
import { Helper } from "./names";
import { SiteConfig } from "../../declarations";
export declare class MangaHere extends MangaSite<SiteConfig, Parser, Helper> {
    constructor();
}
export declare const manga: MangaHere;
export default manga;

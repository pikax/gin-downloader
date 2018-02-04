import { MangaSite } from "../../mangasite";
import { Parser } from "./parser";
import { Helper } from "./names";
import { gin } from "../../interface";
import { FilteredResults, MangaFilter } from "../../filter";
import SiteConfig = gin.SiteConfig;
export declare class MangaHere extends MangaSite<SiteConfig, Parser, Helper> {
    constructor();
    filter(filter?: MangaFilter): Promise<FilteredResults>;
}
export declare const mangahere: MangaHere;
export default mangahere;

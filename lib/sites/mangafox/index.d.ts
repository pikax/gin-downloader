/**
 * Created by david on 24/03/2017.
 */
import { MangaSite } from "../../common/mangasite";
import { Parser } from "./parser";
import { Helper } from "./names";
import { FilteredResults, FilterSupport, Site, SiteConfig } from "../../declarations";
export declare class MangaFox extends MangaSite<SiteConfig, Parser, Helper> implements Site {
    constructor();
    filter(filter?: FilterSupport): Promise<FilteredResults>;
}
export declare const manga: Site;
export default manga;

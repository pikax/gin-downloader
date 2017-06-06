/**
 * Created by rodriguesc on 05/03/2017.
 */
import { MangaSite } from "../../common/mangasite";
import { Parser } from "./parser";
import { Helper } from "./names";
import { FilteredResults, FilterSupport, SiteConfig } from "../../declarations";
export declare class MangaPanda extends MangaSite<SiteConfig, Parser, Helper> {
    constructor();
    protected resolveChapterSource(name: string, chapter: number): Promise<string>;
    filter(filter?: FilterSupport): Promise<FilteredResults>;
}
export declare const manga: MangaPanda;
export default manga;

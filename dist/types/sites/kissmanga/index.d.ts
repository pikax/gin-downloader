/**
 * Created by david on 24/03/2017.
 */
import { MangaSite } from "../../common/mangasite";
import { Parser } from "./parser";
import { Helper } from "./names";
import { FilteredResults, MangaFilter, MangaSource, Site, SiteConfig, LazyImage } from "../../declarations";
export declare class KissManga extends MangaSite<SiteConfig, Parser, Helper> implements Site {
    constructor();
    private getVM(secret);
    mangas(filter?: MangaFilter): Promise<MangaSource[]>;
    filter(filter?: MangaFilter): Promise<FilteredResults>;
    images(name: string, chapNumber: number): Promise<Promise<LazyImage>[]>;
}
export declare const manga: Site;
export default manga;

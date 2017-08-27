import { FilteredResults, MangaFilter } from "src/filter";
import { gin, Site, ImageCollection } from "src/interface";
import { MangaSite } from "src/mangasite";
import { Helper } from "./names";
import { Parser } from "./parser";
import MangaSource = gin.MangaSource;
import SiteConfig = gin.SiteConfig;
export declare class KissManga extends MangaSite<SiteConfig, Parser, Helper> implements Site {
    sitename: string;
    constructor();
    private getVM(secret);
    mangas(filter?: MangaFilter): Promise<MangaSource[]>;
    filter(filter?: MangaFilter): Promise<FilteredResults>;
    images(name: string, chapNumber: string): Promise<ImageCollection>;
}
export declare const manga: Site;
export default manga;

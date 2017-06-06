/**
 * Created by david on 24/03/2017.
 */
import { MangaSite } from "../../common/mangasite";
import { Parser } from "./parser";
import { Helper } from "./names";
import { FilteredResults, FilterSupport, MangaSource, Site, SiteConfig } from "../../declarations";
import { OptionsWithUrl } from "request";
export declare class Batoto extends MangaSite<SiteConfig, Parser, Helper> implements Site {
    private _urlCache;
    constructor();
    resolveMangaUrl(name: string): Promise<string>;
    mangas(filter?: FilterSupport): Promise<MangaSource[]>;
    filter(filter?: FilterSupport): Promise<FilteredResults>;
    resolveChapterSource(name: string, chapter: number): Promise<string>;
    buildChapterRequest(url: string): OptionsWithUrl;
    isLoggedIn(): Promise<boolean>;
    logIn(user: string, pw: string, rememberMe?: boolean): Promise<boolean>;
}
export declare const manga: Batoto;
export default manga;
